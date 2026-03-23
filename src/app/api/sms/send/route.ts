import { NextRequest, NextResponse } from "next/server";
import {
  sendSMS,
  sendAppointmentConfirmation,
  sendAppointmentReminder,
  sendReviewRequest,
  sendInvoiceLink,
} from "@/lib/twilio";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

type SMSType = "raw" | "appointment_confirmation" | "appointment_reminder" | "review_request" | "invoice";

interface SendRequest {
  to: string;
  type: SMSType;
  data: Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const apiKey = request.headers.get("x-api-key");
    if (!ADMIN_API_KEY || apiKey !== ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SendRequest = await request.json();
    const { to, type, data } = body;

    if (!to || !type || !data) {
      return NextResponse.json(
        { error: "Missing required fields: to, type, data" },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case "raw":
        if (!data.message) {
          return NextResponse.json({ error: "data.message is required for raw type" }, { status: 400 });
        }
        result = await sendSMS(to, data.message);
        break;

      case "appointment_confirmation":
        if (!data.businessName || !data.date || !data.time) {
          return NextResponse.json(
            { error: "data.businessName, data.date, and data.time are required" },
            { status: 400 }
          );
        }
        result = await sendAppointmentConfirmation(to, data.businessName, data.date, data.time, data.address);
        break;

      case "appointment_reminder":
        if (!data.businessName || !data.date || !data.time) {
          return NextResponse.json(
            { error: "data.businessName, data.date, and data.time are required" },
            { status: 400 }
          );
        }
        result = await sendAppointmentReminder(to, data.businessName, data.date, data.time);
        break;

      case "review_request":
        if (!data.businessName || !data.googleReviewUrl) {
          return NextResponse.json(
            { error: "data.businessName and data.googleReviewUrl are required" },
            { status: 400 }
          );
        }
        result = await sendReviewRequest(to, data.businessName, data.googleReviewUrl);
        break;

      case "invoice":
        if (!data.businessName || !data.amount || !data.paymentUrl) {
          return NextResponse.json(
            { error: "data.businessName, data.amount, and data.paymentUrl are required" },
            { status: 400 }
          );
        }
        result = await sendInvoiceLink(to, data.businessName, data.amount, data.paymentUrl);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown SMS type: ${type}. Valid types: raw, appointment_confirmation, appointment_reminder, review_request, invoice` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("SMS send error:", error);
    const message = error instanceof Error ? error.message : "Failed to send SMS";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
