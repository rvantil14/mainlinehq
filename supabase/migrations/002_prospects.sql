-- ============================================================
-- Prospects table for sales pipeline tracking
-- ============================================================

create type prospect_status as enum ('researched', 'contacted', 'demo_scheduled', 'demo_done', 'negotiating', 'won', 'lost');

create table prospects (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  owner_name text,
  trade_type text,
  phone text,
  email text,
  website text,
  city text,
  state text default 'CA',
  google_reviews integer,
  has_chat_widget boolean default false,
  has_website boolean default true,
  status prospect_status not null default 'researched',
  notes text,
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_prospects_status on prospects (status);
create index idx_prospects_city on prospects (city);

create trigger trg_prospects_updated_at
  before update on prospects
  for each row execute function update_updated_at();

alter table prospects enable row level security;
create policy "Service role full access on prospects"
  on prospects for all using (true) with check (true);
