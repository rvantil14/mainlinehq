-- ============================================================
-- Mainline HQ Initial Schema
-- AI automation platform for trade businesses
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

create type business_type as enum (
  'plumbing', 'hvac', 'electrical', 'painting',
  'roofing', 'landscaping', 'general_contracting', 'other'
);

create type client_package as enum ('starter', 'growth', 'pro');

create type client_status as enum ('onboarding', 'active', 'churned');

create type lead_source as enum ('chatbot', 'phone', 'form');

create type lead_urgency as enum ('normal', 'urgent', 'emergency');

create type lead_status as enum (
  'new', 'contacted', 'quoted', 'booked', 'completed', 'lost'
);

create type appointment_status as enum (
  'scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'
);

create type invoice_status as enum ('draft', 'sent', 'paid', 'overdue');

create type review_platform as enum ('google', 'yelp');

create type sms_direction as enum ('inbound', 'outbound');

-- ============================================================
-- 1. CLIENTS
-- Trade businesses using Mainline
-- ============================================================

create table clients (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  owner_name text not null,
  business_type business_type not null default 'other',
  phone text,
  email text not null,
  website text,
  city text,
  state text,
  package client_package not null default 'starter',
  status client_status not null default 'onboarding',
  ai_config jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_clients_status on clients (status);
create index idx_clients_business_type on clients (business_type);
create unique index idx_clients_email on clients (email);

-- ============================================================
-- 2. LEADS
-- Leads captured by chatbot, phone, or contact form
-- ============================================================

create table leads (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  source lead_source not null default 'chatbot',
  job_type text,
  urgency lead_urgency not null default 'normal',
  notes text,
  status lead_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_leads_client_id on leads (client_id);
create index idx_leads_status on leads (status);
create index idx_leads_created_at on leads (created_at desc);

-- ============================================================
-- 3. CONVERSATIONS
-- Chat conversations between end customers and AI
-- ============================================================

create table conversations (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  messages jsonb not null default '[]',
  lead_captured boolean not null default false,
  appointment_booked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_conversations_client_id on conversations (client_id);
create index idx_conversations_lead_id on conversations (lead_id);
create index idx_conversations_created_at on conversations (created_at desc);

-- ============================================================
-- 4. APPOINTMENTS
-- Booked service appointments
-- ============================================================

create table appointments (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete cascade,
  technician_name text,
  scheduled_at timestamptz not null,
  duration_minutes integer not null default 60,
  job_type text,
  address text,
  notes text,
  status appointment_status not null default 'scheduled',
  created_at timestamptz not null default now()
);

create index idx_appointments_client_id on appointments (client_id);
create index idx_appointments_lead_id on appointments (lead_id);
create index idx_appointments_scheduled_at on appointments (scheduled_at);
create index idx_appointments_status on appointments (status);

-- ============================================================
-- 5. INVOICES
-- Invoices sent to customers
-- ============================================================

create table invoices (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete cascade,
  appointment_id uuid references appointments(id) on delete set null,
  amount_cents integer not null,
  description text,
  status invoice_status not null default 'draft',
  stripe_invoice_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_invoices_client_id on invoices (client_id);
create index idx_invoices_lead_id on invoices (lead_id);
create index idx_invoices_status on invoices (status);
create index idx_invoices_stripe_id on invoices (stripe_invoice_id) where stripe_invoice_id is not null;

-- ============================================================
-- 6. REVIEWS
-- Review request tracking
-- ============================================================

create table reviews (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete cascade,
  platform review_platform not null default 'google',
  request_sent_at timestamptz,
  review_received boolean not null default false,
  rating integer check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now()
);

create index idx_reviews_client_id on reviews (client_id);
create index idx_reviews_lead_id on reviews (lead_id);

-- ============================================================
-- 7. SMS_MESSAGES
-- SMS communication log
-- ============================================================

create table sms_messages (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  direction sms_direction not null,
  phone_number text not null,
  message text not null,
  twilio_sid text,
  status text,
  created_at timestamptz not null default now()
);

create index idx_sms_client_id on sms_messages (client_id);
create index idx_sms_lead_id on sms_messages (lead_id);
create index idx_sms_created_at on sms_messages (created_at desc);
create index idx_sms_twilio_sid on sms_messages (twilio_sid) where twilio_sid is not null;

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_clients_updated_at
  before update on clients
  for each row execute function update_updated_at();

create trigger trg_leads_updated_at
  before update on leads
  for each row execute function update_updated_at();

create trigger trg_conversations_updated_at
  before update on conversations
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Service role key bypasses RLS. These policies ensure that
-- if anon/authenticated keys are ever used, data is scoped
-- to the correct client.
-- ============================================================

alter table clients enable row level security;
alter table leads enable row level security;
alter table conversations enable row level security;
alter table appointments enable row level security;
alter table invoices enable row level security;
alter table reviews enable row level security;
alter table sms_messages enable row level security;

-- Service role has full access (used by the backend).
-- These policies allow the service_role to do everything.

create policy "Service role full access on clients"
  on clients for all
  using (true)
  with check (true);

create policy "Service role full access on leads"
  on leads for all
  using (true)
  with check (true);

create policy "Service role full access on conversations"
  on conversations for all
  using (true)
  with check (true);

create policy "Service role full access on appointments"
  on appointments for all
  using (true)
  with check (true);

create policy "Service role full access on invoices"
  on invoices for all
  using (true)
  with check (true);

create policy "Service role full access on reviews"
  on reviews for all
  using (true)
  with check (true);

create policy "Service role full access on sms_messages"
  on sms_messages for all
  using (true)
  with check (true);
