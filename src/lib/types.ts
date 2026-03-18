// ============================================================
// Mainline Type Definitions
// All types for the multi-tenant chatbot platform
// ============================================================

/** Business hours for a single day */
export interface DayHours {
  open: string;   // "08:00"
  close: string;  // "17:00"
}

/** Service offered by the business */
export interface Service {
  name: string;
  description: string;
  priceRange?: string;        // "$150 to $500"
  estimatedDuration?: string; // "1 to 3 hours"
  isEmergency?: boolean;      // true for emergency services
}

/** FAQ entry */
export interface FAQ {
  question: string;
  answer: string;
}

/** Service area definition */
export interface ServiceArea {
  cities: string[];
  zipCodes?: string[];
  radius?: string;            // "30 miles from downtown"
}

/** Client business configuration (one per customer/tenant) */
export interface ClientConfig {
  id: string;
  businessName: string;
  businessType: string;       // "plumbing", "hvac", "electrical", etc.
  phoneNumber: string;
  email: string;
  website?: string;
  address?: string;

  // Service details
  services: Service[];
  serviceArea: ServiceArea;
  faqs: FAQ[];

  // Scheduling
  businessHours: {
    monday?: DayHours;
    tuesday?: DayHours;
    wednesday?: DayHours;
    thursday?: DayHours;
    friday?: DayHours;
    saturday?: DayHours;
    sunday?: DayHours;
  };
  emergencyAvailable: boolean;
  emergencyPhone?: string;

  // Branding
  brandVoice: "professional" | "friendly" | "casual";
  ownerName?: string;
  tagline?: string;

  // Integration IDs (added as you connect services)
  calcomApiKey?: string;
  calcomEventTypeId?: string;
  stripeAccountId?: string;
  twilioPhoneNumber?: string;
  pipedriveApiKey?: string;

  // Feature flags
  features: {
    chatbot: boolean;
    scheduling: boolean;
    invoicing: boolean;
    smsReminders: boolean;
    reviewRequests: boolean;
    leadCapture: boolean;
  };
}

/** A single message in a conversation */
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

/** Active conversation session */
export interface Conversation {
  id: string;
  clientId: string;           // Which business this conversation belongs to
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  leadCaptured: boolean;
  appointmentBooked: boolean;
  customerInfo?: CustomerInfo;
}

/** Customer information captured during conversation */
export interface CustomerInfo {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  serviceNeeded?: string;
  urgency?: "emergency" | "urgent" | "routine" | "inquiry";
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

/** Tool call result from Claude API */
export interface ToolResult {
  toolName: string;
  input: Record<string, unknown>;
  result: Record<string, unknown>;
}

/** API response shape */
export interface ChatResponse {
  conversationId: string;
  message: string;
  leadCaptured: boolean;
  appointmentBooked: boolean;
  customerInfo?: CustomerInfo;
  toolsUsed?: string[];
}
