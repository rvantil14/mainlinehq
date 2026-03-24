// ============================================================
// Mainline HQ Database Types
// Generated to match supabase/migrations/001_initial_schema.sql
// ============================================================

// -- Enum types --

export type BusinessType =
  | "plumbing"
  | "hvac"
  | "electrical"
  | "painting"
  | "roofing"
  | "landscaping"
  | "general_contracting"
  | "other";

export type ClientPackage = "starter" | "growth" | "pro";

export type ClientStatus = "onboarding" | "active" | "churned";

export type LeadSource = "chatbot" | "phone" | "form";

export type LeadUrgency = "normal" | "urgent" | "emergency";

export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "booked"
  | "completed"
  | "lost";

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type ReviewPlatform = "google" | "yelp";

export type SmsDirection = "inbound" | "outbound";

export type ProspectStatus =
  | "researched"
  | "contacted"
  | "demo_scheduled"
  | "demo_done"
  | "negotiating"
  | "won"
  | "lost";

// -- AI config stored in clients.ai_config --

export interface AiConfig {
  systemPromptOverride?: string;
  services?: Array<{
    name: string;
    description: string;
    priceRange?: string;
    estimatedDuration?: string;
    isEmergency?: boolean;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  brandVoice?: "professional" | "friendly" | "casual";
  serviceArea?: {
    cities: string[];
    zipCodes?: string[];
    radius?: string;
  };
  businessHours?: Record<string, { open: string; close: string }>;
  emergencyAvailable?: boolean;
  emergencyPhone?: string;
  tagline?: string;
  [key: string]: unknown;
}

// -- Chat message stored in conversations.messages --

export interface ChatMessageRecord {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// -- Row types --

export interface ClientRow {
  id: string;
  business_name: string;
  owner_name: string;
  business_type: BusinessType;
  phone: string | null;
  email: string;
  website: string | null;
  city: string | null;
  state: string | null;
  package: ClientPackage;
  status: ClientStatus;
  ai_config: AiConfig;
  created_at: string;
  updated_at: string;
}

export interface LeadRow {
  id: string;
  client_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  source: LeadSource;
  job_type: string | null;
  urgency: LeadUrgency;
  notes: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface ConversationRow {
  id: string;
  client_id: string;
  lead_id: string | null;
  messages: ChatMessageRecord[];
  lead_captured: boolean;
  appointment_booked: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppointmentRow {
  id: string;
  client_id: string;
  lead_id: string;
  technician_name: string | null;
  scheduled_at: string;
  duration_minutes: number;
  job_type: string | null;
  address: string | null;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
}

export interface InvoiceRow {
  id: string;
  client_id: string;
  lead_id: string;
  appointment_id: string | null;
  amount_cents: number;
  description: string | null;
  status: InvoiceStatus;
  stripe_invoice_id: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface ReviewRow {
  id: string;
  client_id: string;
  lead_id: string;
  platform: ReviewPlatform;
  request_sent_at: string | null;
  review_received: boolean;
  rating: number | null;
  created_at: string;
}

export interface ProspectRow {
  id: string;
  business_name: string;
  owner_name: string | null;
  trade_type: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  city: string | null;
  state: string | null;
  google_reviews: number | null;
  has_chat_widget: boolean;
  has_website: boolean;
  status: ProspectStatus;
  notes: string | null;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SmsMessageRow {
  id: string;
  client_id: string;
  lead_id: string | null;
  direction: SmsDirection;
  phone_number: string;
  message: string;
  twilio_sid: string | null;
  status: string | null;
  created_at: string;
}

// -- Insert types (omit auto-generated fields) --

export type ClientInsert = Omit<ClientRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type LeadInsert = Omit<LeadRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ConversationInsert = Omit<ConversationRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type AppointmentInsert = Omit<AppointmentRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type InvoiceInsert = Omit<InvoiceRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type ReviewInsert = Omit<ReviewRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type SmsMessageInsert = Omit<SmsMessageRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type ProspectInsert = Omit<ProspectRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

// -- Update types (all fields optional except id) --

export type ClientUpdate = Partial<Omit<ClientRow, "id">>;
export type LeadUpdate = Partial<Omit<LeadRow, "id">>;
export type ConversationUpdate = Partial<Omit<ConversationRow, "id">>;
export type AppointmentUpdate = Partial<Omit<AppointmentRow, "id">>;
export type InvoiceUpdate = Partial<Omit<InvoiceRow, "id">>;
export type ReviewUpdate = Partial<Omit<ReviewRow, "id">>;
export type SmsMessageUpdate = Partial<Omit<SmsMessageRow, "id">>;
export type ProspectUpdate = Partial<Omit<ProspectRow, "id">>;

// -- Supabase Database type for createClient<Database> --

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: ClientRow;
        Insert: ClientInsert;
        Update: ClientUpdate;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: LeadUpdate;
        Relationships: [];
      };
      conversations: {
        Row: ConversationRow;
        Insert: ConversationInsert;
        Update: ConversationUpdate;
        Relationships: [];
      };
      appointments: {
        Row: AppointmentRow;
        Insert: AppointmentInsert;
        Update: AppointmentUpdate;
        Relationships: [];
      };
      invoices: {
        Row: InvoiceRow;
        Insert: InvoiceInsert;
        Update: InvoiceUpdate;
        Relationships: [];
      };
      reviews: {
        Row: ReviewRow;
        Insert: ReviewInsert;
        Update: ReviewUpdate;
        Relationships: [];
      };
      sms_messages: {
        Row: SmsMessageRow;
        Insert: SmsMessageInsert;
        Update: SmsMessageUpdate;
        Relationships: [];
      };
      prospects: {
        Row: ProspectRow;
        Insert: ProspectInsert;
        Update: ProspectUpdate;
        Relationships: [];
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Views: {};
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Functions: {};
    Enums: {
      business_type: BusinessType;
      client_package: ClientPackage;
      client_status: ClientStatus;
      lead_source: LeadSource;
      lead_urgency: LeadUrgency;
      lead_status: LeadStatus;
      appointment_status: AppointmentStatus;
      invoice_status: InvoiceStatus;
      review_platform: ReviewPlatform;
      sms_direction: SmsDirection;
      prospect_status: ProspectStatus;
    };
  };
}
