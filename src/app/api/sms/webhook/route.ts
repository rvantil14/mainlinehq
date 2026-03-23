import { NextRequest, NextResponse } from "next/server";
import { twilio, getTwilioAuthToken } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    // Validate request is from Twilio
    const signature = request.headers.get("x-twilio-signature") || "";
    const url = request.url;

    let isValid = false;
    try {
      const authToken = getTwilioAuthToken();
      isValid = twilio.validateRequest(authToken, signature, url, params);
    } catch {
      // Auth token not configured, reject
      console.error("Twilio auth token not configured, cannot validate webhook");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!isValid) {
      console.warn("Invalid Twilio webhook signature");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const from = params.From || "unknown";
    const body = params.Body || "";
    const messageSid = params.MessageSid || "";

    console.log(`Inbound SMS | From: ${from} | SID: ${messageSid} | Body: ${body}`);

    // Build TwiML response
    const twiml = new twilio.twiml.MessagingResponse();

    const normalizedBody = body.trim().toUpperCase();

    if (normalizedBody === "STOP" || normalizedBody === "CANCEL" || normalizedBody === "RESCHEDULE") {
      // These are handled by keyword - log for follow-up
      console.log(`Action keyword received: ${normalizedBody} from ${from}`);
      // Don't auto-reply to STOP (Twilio handles opt-out automatically)
      if (normalizedBody !== "STOP") {
        twiml.message(
          "Got it. Someone from our team will follow up with you shortly."
        );
      }
    } else {
      twiml.message(
        "Thanks for your message. We'll get back to you soon."
      );
    }

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("SMS webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
