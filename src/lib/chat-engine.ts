// ============================================================
// Chat Engine
// The core conversational AI engine powered by Claude API.
// Handles conversations, tool calls, and lead extraction.
// ============================================================

import Anthropic from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";
import {
  ClientConfig,
  Conversation,
  ChatMessage,
  ChatResponse,
  CustomerInfo,
} from "@/lib/types";
import { buildSystemPrompt, buildLeadExtractionPrompt } from "@/lib/prompt-builder";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { LeadInsert, AppointmentInsert } from "@/lib/database.types";

// Simple logger (console-based)
const logger = {
  info: (...args: unknown[]) => console.log("[ChatEngine]", ...args),
  warn: (...args: unknown[]) => console.warn("[ChatEngine]", ...args),
  error: (...args: unknown[]) => console.error("[ChatEngine]", ...args),
};

// Tool definitions that Claude can call during conversations
const TOOLS: Anthropic.Tool[] = [
  {
    name: "capture_lead",
    description:
      "Call this when you have collected customer contact information (at minimum a name and phone number or email). This saves their details so the business can follow up.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Customer full name" },
        phone: { type: "string", description: "Customer phone number" },
        email: { type: "string", description: "Customer email address" },
        address: {
          type: "string",
          description: "Customer address or job site location",
        },
        serviceNeeded: {
          type: "string",
          description: "Brief description of the service they need",
        },
        urgency: {
          type: "string",
          enum: ["emergency", "urgent", "routine", "inquiry"],
          description: "How urgent is their request",
        },
        preferredDate: {
          type: "string",
          description: "Preferred date for service (if mentioned)",
        },
        preferredTime: {
          type: "string",
          description: "Preferred time for service (if mentioned)",
        },
        notes: {
          type: "string",
          description: "Any additional notes about the customer or job",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "book_appointment",
    description:
      "Call this when the customer wants to schedule an appointment. Requires at minimum: customer name, phone, service type, and preferred date/time.",
    input_schema: {
      type: "object" as const,
      properties: {
        customerName: { type: "string", description: "Customer full name" },
        customerPhone: { type: "string", description: "Customer phone number" },
        customerEmail: { type: "string", description: "Customer email" },
        serviceType: {
          type: "string",
          description: "Type of service requested",
        },
        preferredDate: {
          type: "string",
          description: "Requested date (YYYY-MM-DD)",
        },
        preferredTime: {
          type: "string",
          description: "Requested time (HH:MM)",
        },
        jobDescription: {
          type: "string",
          description: "Description of the work needed",
        },
        address: {
          type: "string",
          description: "Job site address",
        },
      },
      required: [
        "customerName",
        "customerPhone",
        "serviceType",
        "preferredDate",
        "preferredTime",
      ],
    },
  },
  {
    name: "check_availability",
    description:
      "Check available appointment slots for a given date. Call this when a customer asks about availability.",
    input_schema: {
      type: "object" as const,
      properties: {
        date: {
          type: "string",
          description: "Date to check (YYYY-MM-DD)",
        },
        serviceType: {
          type: "string",
          description: "Type of service (affects duration needed)",
        },
      },
      required: ["date"],
    },
  },
  {
    name: "escalate_to_human",
    description:
      "Transfer the conversation to a human team member. Use this when: the customer is angry/frustrated, the question is too complex, they explicitly ask to talk to a person, or it is an emergency that needs immediate human attention.",
    input_schema: {
      type: "object" as const,
      properties: {
        reason: {
          type: "string",
          description: "Why this needs human attention",
        },
        priority: {
          type: "string",
          enum: ["low", "medium", "high", "emergency"],
          description: "Priority level for the handoff",
        },
        customerInfo: {
          type: "string",
          description: "Summary of customer details collected so far",
        },
      },
      required: ["reason", "priority"],
    },
  },
];

export class ChatEngine {
  private anthropic: Anthropic;
  private conversations: Map<string, Conversation> = new Map();
  private clientConfigs: Map<string, ClientConfig> = new Map();
  private demoMode: boolean;

  constructor(apiKey: string, demoMode = false) {
    this.demoMode = demoMode;
    this.anthropic = new Anthropic({ apiKey: demoMode ? "sk-ant-demo" : apiKey });
  }

  /**
   * Register a client business configuration.
   * In production, these would come from a database.
   */
  registerClient(config: ClientConfig): void {
    this.clientConfigs.set(config.id, config);
    logger.info(`Registered client: ${config.businessName} (${config.id})`);
  }

  /**
   * Start a new conversation for a client's customer.
   */
  startConversation(clientId: string): string {
    const client = this.clientConfigs.get(clientId);
    if (!client) {
      throw new Error(`Client not found: ${clientId}`);
    }

    const conversationId = uuidv4();
    const conversation: Conversation = {
      id: conversationId,
      clientId,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      leadCaptured: false,
      appointmentBooked: false,
    };

    this.conversations.set(conversationId, conversation);
    logger.info(
      `Started conversation ${conversationId} for client ${client.businessName}`
    );
    return conversationId;
  }

  /**
   * Send a message and get a response.
   * This is the main conversation loop.
   */
  async sendMessage(
    conversationId: string,
    userMessage: string
  ): Promise<ChatResponse> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error(`Conversation not found: ${conversationId}`);
    }

    const client = this.clientConfigs.get(conversation.clientId);
    if (!client) {
      throw new Error(`Client not found: ${conversation.clientId}`);
    }

    // Add user message to history
    conversation.messages.push({
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
    });

    // Demo mode: return mock responses without hitting the API
    if (this.demoMode) {
      const demoResponse = this.getDemoResponse(userMessage, client);
      conversation.messages.push({
        role: "assistant",
        content: demoResponse,
        timestamp: Date.now(),
      });
      conversation.updatedAt = Date.now();
      return {
        conversationId,
        message: demoResponse,
        leadCaptured: conversation.leadCaptured,
        appointmentBooked: conversation.appointmentBooked,
        customerInfo: conversation.customerInfo,
      };
    }

    // Build the system prompt for this specific business
    const systemPrompt = buildSystemPrompt(client);

    // Convert our message history to Anthropic format
    const messages: Anthropic.MessageParam[] = conversation.messages.map(
      (m) => ({
        role: m.role,
        content: m.content,
      })
    );

    // Determine which tools to offer based on client features
    const availableTools = TOOLS.filter((tool) => {
      if (tool.name === "book_appointment" || tool.name === "check_availability") {
        return client.features.scheduling;
      }
      if (tool.name === "capture_lead") {
        return client.features.leadCapture;
      }
      return true; // escalate_to_human always available
    });

    const toolsUsed: string[] = [];

    try {
      // Call Claude API
      // Using claude-haiku-4-5 for fast responses at low cost.
      let response = await this.anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
        tools: availableTools.length > 0 ? availableTools : undefined,
      });

      // Handle tool use loop (Claude may call tools then continue responding)
      while (response.stop_reason === "tool_use") {
        const toolUseBlocks = response.content.filter(
          (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
        );

        const toolResults: Anthropic.ToolResultBlockParam[] = [];

        for (const toolUse of toolUseBlocks) {
          logger.info(
            `Tool called: ${toolUse.name}`,
            JSON.stringify(toolUse.input)
          );
          toolsUsed.push(toolUse.name);

          // Process each tool call
          const result = await this.handleToolCall(
            toolUse.name,
            toolUse.input as Record<string, unknown>,
            conversation,
            client
          );

          toolResults.push({
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          });
        }

        // Continue the conversation with tool results
        messages.push({
          role: "assistant",
          content: response.content,
        });
        messages.push({
          role: "user",
          content: toolResults,
        });

        response = await this.anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: systemPrompt,
          messages,
          tools: availableTools.length > 0 ? availableTools : undefined,
        });
      }

      // Extract the text response
      const textBlock = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === "text"
      );
      const assistantMessage = textBlock?.text || "I apologize, I had trouble processing that. Could you please try again?";

      // Add assistant response to history
      conversation.messages.push({
        role: "assistant",
        content: assistantMessage,
        timestamp: Date.now(),
      });
      conversation.updatedAt = Date.now();

      return {
        conversationId,
        message: assistantMessage,
        leadCaptured: conversation.leadCaptured,
        appointmentBooked: conversation.appointmentBooked,
        customerInfo: conversation.customerInfo,
        toolsUsed: toolsUsed.length > 0 ? toolsUsed : undefined,
      };
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      logger.error(`Chat engine error: ${errMsg}`);
      throw error;
    }
  }

  /**
   * Handle tool calls from Claude.
   * In production, these would connect to real APIs (Cal.com, Stripe, Twilio, etc.)
   * For now, they simulate the behavior and log the data.
   */
  private async handleToolCall(
    toolName: string,
    input: Record<string, unknown>,
    conversation: Conversation,
    _client: ClientConfig
  ): Promise<Record<string, unknown>> {
    switch (toolName) {
      case "capture_lead": {
        const customerInfo: CustomerInfo = {
          name: input.name as string | undefined,
          phone: input.phone as string | undefined,
          email: input.email as string | undefined,
          address: input.address as string | undefined,
          serviceNeeded: input.serviceNeeded as string | undefined,
          urgency: input.urgency as CustomerInfo["urgency"],
          preferredDate: input.preferredDate as string | undefined,
          preferredTime: input.preferredTime as string | undefined,
          notes: input.notes as string | undefined,
        };

        conversation.customerInfo = customerInfo;
        conversation.leadCaptured = true;

        logger.info(
          `LEAD CAPTURED for ${conversation.clientId}:`,
          JSON.stringify(customerInfo, null, 2)
        );

        const leadId = uuidv4();

        // Persist to Supabase when configured
        if (isSupabaseConfigured()) {
          try {
            const urgencyMap: Record<string, "normal" | "urgent" | "emergency"> = {
              emergency: "emergency",
              urgent: "urgent",
              routine: "normal",
              inquiry: "normal",
            };
            const leadInsert: LeadInsert = {
              id: leadId,
              client_id: conversation.clientId,
              name: customerInfo.name || "Unknown",
              phone: customerInfo.phone || null,
              email: customerInfo.email || null,
              source: "chatbot",
              job_type: customerInfo.serviceNeeded || null,
              urgency: urgencyMap[customerInfo.urgency || "routine"] || "normal",
              notes: customerInfo.notes || null,
              status: "new",
            };
            const { error } = await getSupabase()
              .from("leads")
              .insert(leadInsert);
            if (error) {
              logger.error("Failed to persist lead to Supabase:", error.message);
            } else {
              logger.info(`Lead ${leadId} persisted to Supabase`);
            }
          } catch (err) {
            logger.error("Supabase lead insert error:", err);
          }
        }

        return {
          success: true,
          message: "Lead information saved successfully. The team will follow up.",
          leadId,
        };
      }

      case "book_appointment": {
        conversation.appointmentBooked = true;

        logger.info(
          `APPOINTMENT BOOKED for ${conversation.clientId}:`,
          JSON.stringify(input, null, 2)
        );

        const appointmentId = uuidv4();

        // Persist to Supabase when configured
        if (isSupabaseConfigured()) {
          try {
            // Build scheduled_at from date + time
            const dateStr = input.preferredDate as string;
            const timeStr = input.preferredTime as string;
            const scheduledAt = new Date(`${dateStr}T${timeStr}:00`).toISOString();

            // Try to find or create a lead for this appointment
            let leadId: string | null = null;
            const supabase = getSupabase();

            // Look up existing lead by client + customer name/phone
            const { data: existingLead } = await supabase
              .from("leads")
              .select("id")
              .eq("client_id", conversation.clientId)
              .eq("name", (input.customerName as string) || "")
              .limit(1)
              .single();

            if (existingLead) {
              leadId = existingLead.id;
              // Update lead status to booked
              await supabase.from("leads").update({ status: "booked" as const }).eq("id", leadId!);
            } else {
              // Create a lead record for the appointment
              leadId = uuidv4();
              await supabase.from("leads").insert({
                id: leadId,
                client_id: conversation.clientId,
                name: (input.customerName as string) || "Unknown",
                phone: (input.customerPhone as string) || null,
                email: (input.customerEmail as string) || null,
                source: "chatbot",
                job_type: (input.serviceType as string) || null,
                urgency: "normal",
                notes: null,
                status: "booked",
              } satisfies LeadInsert);
            }

            const apptInsert: AppointmentInsert = {
              id: appointmentId,
              client_id: conversation.clientId,
              lead_id: leadId!, // leadId is always set by this point
              scheduled_at: scheduledAt,
              duration_minutes: 60,
              job_type: (input.serviceType as string) || null,
              address: (input.address as string) || null,
              notes: (input.jobDescription as string) || null,
              status: "scheduled",
              technician_name: null,
            };
            const { error } = await supabase.from("appointments").insert(apptInsert);
            if (error) {
              logger.error("Failed to persist appointment to Supabase:", error.message);
            } else {
              logger.info(`Appointment ${appointmentId} persisted to Supabase`);
            }
          } catch (err) {
            logger.error("Supabase appointment insert error:", err);
          }
        }

        return {
          success: true,
          appointmentId,
          confirmed: true,
          date: input.preferredDate,
          time: input.preferredTime,
          message: `Appointment confirmed for ${input.preferredDate} at ${input.preferredTime}. A confirmation text will be sent to ${input.customerPhone}.`,
        };
      }

      case "check_availability": {
        // TODO: In production, call Cal.com API for real availability
        // For now, return simulated available slots
        const date = input.date as string;

        return {
          date,
          availableSlots: [
            { time: "09:00", available: true },
            { time: "10:00", available: false },
            { time: "11:00", available: true },
            { time: "13:00", available: true },
            { time: "14:00", available: true },
            { time: "15:00", available: false },
            { time: "16:00", available: true },
          ],
          message: `Available times on ${date}: 9:00 AM, 11:00 AM, 1:00 PM, 2:00 PM, and 4:00 PM`,
        };
      }

      case "escalate_to_human": {
        logger.warn(
          `ESCALATION for ${conversation.clientId}: ${input.reason} (Priority: ${input.priority})`
        );

        // TODO: In production, this would:
        // 1. Send urgent notification to business owner
        // 2. Create high-priority task in CRM
        // 3. Trigger SMS alert

        return {
          success: true,
          message:
            "I have notified the team and someone will reach out to you shortly.",
          ticketId: uuidv4(),
        };
      }

      default:
        return { error: `Unknown tool: ${toolName}` };
    }
  }

  /**
   * Get conversation history
   */
  getConversation(conversationId: string): Conversation | undefined {
    return this.conversations.get(conversationId);
  }

  /**
   * Get all conversations for a client (for admin dashboard)
   */
  getClientConversations(clientId: string): Conversation[] {
    return Array.from(this.conversations.values()).filter(
      (c) => c.clientId === clientId
    );
  }

  /**
   * Get a registered client config
   */
  getClient(clientId: string): ClientConfig | undefined {
    return this.clientConfigs.get(clientId);
  }

  /**
   * Get all registered client IDs
   */
  getClientIds(): string[] {
    return Array.from(this.clientConfigs.keys());
  }

  /**
   * Generate demo responses when no API key is configured.
   */
  private getDemoResponse(message: string, client: ClientConfig): string {
    const msg = message.toLowerCase();
    const biz = client.businessName;

    if (msg.includes("emergency") || msg.includes("flooding") || msg.includes("leak")) {
      return `This sounds urgent! At ${biz}, we handle emergencies 24/7. Let me get a technician dispatched to you right away. Can I get your name, address, and phone number so we can send someone out?`;
    }
    if (msg.includes("estimate") || msg.includes("quote") || msg.includes("how much") || msg.includes("cost") || msg.includes("price")) {
      return `I can put together a rough estimate for you based on what you've described. ${client.ownerName} will review it and get back to you with the final number, usually within a couple hours. Can I get your name and phone number so we can send that over?\n\nJust so you know, our service calls start at $89 and most common repairs fall in the $150-$500 range, but every job is different. The estimate we send will be specific to your situation.`;
    }
    if (msg.includes("contract") || msg.includes("proposal") || msg.includes("agreement") || msg.includes("scope")) {
      return `Once we've assessed the job, we'll send you a detailed proposal with the scope of work, materials, timeline, and pricing, all laid out clearly. ${client.ownerName} reviews everything personally before it goes out. Would you like us to get that process started?`;
    }
    if (msg.includes("code") || msg.includes("permit") || msg.includes("inspection") || msg.includes("regulation")) {
      return `Great question about codes and permits. Our team stays current on local building codes and permit requirements. For your specific situation, ${client.ownerName} or one of our licensed techs can walk you through exactly what's needed. Want me to have someone give you a call about this?`;
    }
    if (msg.includes("talk to") || msg.includes("real person") || msg.includes("speak to") || msg.includes("human") || msg.includes("owner")) {
      return `Absolutely, I'll connect you with ${client.ownerName} right away. Can I get your name and phone number? They'll call you back within the hour, or if it's urgent, you can reach them directly at ${client.phoneNumber}.`;
    }
    if (msg.includes("appointment") || msg.includes("schedule") || msg.includes("book") || msg.includes("available")) {
      return `I'd love to get you scheduled! We have availability this week. Our open slots are:\n\n- Tomorrow at 9:00 AM, 11:00 AM, or 2:00 PM\n- Thursday at 10:00 AM or 3:00 PM\n\nWhich works best for you? I'll just need your name and phone number to confirm.`;
    }
    if (msg.includes("hour") || msg.includes("open") || msg.includes("when")) {
      return `${biz} is open Monday through Friday, and select weekend hours. ${client.emergencyAvailable ? "We also offer 24/7 emergency service. Just call and we'll dispatch someone right away." : ""} How can I help you today?`;
    }
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return `Hey there! Welcome to ${biz}. ${client.tagline || ""} How can I help you today? Whether you need a repair, want to schedule maintenance, or just have a question, I'm here for you.`;
    }
    return `Thanks for reaching out to ${biz}! I can help you with scheduling appointments, getting price estimates, answering questions about our services, or connecting you with our team. What do you need help with?\n\nI'm having trouble connecting right now. Call us at (805) 801-1380 or email ryan@mainlinehq.com`;
  }
}
