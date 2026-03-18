// ============================================================
// Chat API Route
// Handles chat messages for the Mainline demo and production.
// POST /api/chat - send a message, get an AI response.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { ChatEngine } from "@/lib/chat-engine";
import { demoPlumbingConfig } from "@/lib/clients/demo-plumbing";
import { demoHvacConfig } from "@/lib/clients/demo-hvac";
import { demoElectricalConfig } from "@/lib/clients/demo-electrical";
import { demoPaintingConfig } from "@/lib/clients/demo-painting";
import { mainlineSalesConfig } from "@/lib/clients/mainline-sales";

// Singleton engine instance (persists across requests in the same server process)
let engine: ChatEngine | null = null;

function getEngine(): ChatEngine {
  if (engine) return engine;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const demoMode = !apiKey || apiKey === "sk-ant-your-key-here";

  console.log("[ChatEngine] API key present:", !!apiKey, "Demo mode:", demoMode);

  engine = new ChatEngine(apiKey || "", demoMode);

  // Register all demo client configs
  engine.registerClient(demoPlumbingConfig);
  engine.registerClient(demoHvacConfig);
  engine.registerClient(demoElectricalConfig);
  engine.registerClient(demoPaintingConfig);
  engine.registerClient(mainlineSalesConfig);

  return engine;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, conversationId, message } = body as {
      clientId: string;
      conversationId?: string;
      message: string;
    };

    if (!clientId || !message) {
      return NextResponse.json(
        { error: "clientId and message are required" },
        { status: 400 }
      );
    }

    const chatEngine = getEngine();

    // Verify the client exists
    const client = chatEngine.getClient(clientId);
    if (!client) {
      return NextResponse.json(
        { error: `Unknown client: ${clientId}` },
        { status: 404 }
      );
    }

    // Start a new conversation or use existing one
    // On serverless, conversations may be lost between invocations,
    // so always start fresh if the conversation can't be found
    let activeConversationId = conversationId;
    if (!activeConversationId || !chatEngine.getConversation(activeConversationId)) {
      activeConversationId = chatEngine.startConversation(clientId);
    }

    // Send the message and get a response
    const response = await chatEngine.sendMessage(activeConversationId, message);

    return NextResponse.json({
      conversationId: response.conversationId,
      message: response.message,
      leadCaptured: response.leadCaptured,
      appointmentBooked: response.appointmentBooked,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Internal server error";
    console.error("[/api/chat] Error:", errMsg);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
