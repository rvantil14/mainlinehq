import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  sendSMS,
  sendAppointmentConfirmation,
  sendAppointmentReminder,
  sendReviewRequest,
} from "@/lib/twilio";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { to, type, data } = await request.json();

    if (!to || !type || !data) {
      return NextResponse.json(
        { error: "Missing required fields: to, type, data" },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case "review_request":
        if (!data.businessName || !data.googleReviewUrl) {
          return NextResponse.json(
            { error: "businessName and googleReviewUrl are required" },
            { status: 400 }
          );
        }
        result = await sendReviewRequest(to, data.businessName, data.googleReviewUrl);
        break;

      case "appointment_reminder":
        if (!data.businessName || !data.date || !data.time) {
          return NextResponse.json(
            { error: "businessName, date, and time are required" },
            { status: 400 }
          );
        }
        result = await sendAppointmentReminder(to, data.businessName, data.date, data.time);
        break;

      case "appointment_confirmation":
        if (!data.businessName || !data.date || !data.time) {
          return NextResponse.json(
            { error: "businessName, date, and time are required" },
            { status: 400 }
          );
        }
        result = await sendAppointmentConfirmation(to, data.businessName, data.date, data.time, data.address);
        break;

      case "after_job_followup":
        if (!data.businessName) {
          return NextResponse.json(
            { error: "businessName is required" },
            { status: 400 }
          );
        }
        {
          const followUpLines = [
            `Thanks for choosing ${data.businessName}! We hope everything went well.`,
            "",
            "If you have a moment, a quick review would mean a lot:",
            data.googleReviewUrl || "[Google Review URL]",
            "",
            "Reply STOP to opt out.",
          ];
          result = await sendSMS(to, followUpLines.join("\n"));
        }
        break;

      case "raw":
        if (!data.message) {
          return NextResponse.json(
            { error: "message is required for raw type" },
            { status: 400 }
          );
        }
        result = await sendSMS(to, data.message);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown SMS type: ${type}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Admin SMS send error:", error);
    const message = error instanceof Error ? error.message : "Failed to send SMS";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
