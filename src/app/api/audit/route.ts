import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFICATION_EMAIL = "ryan@mainlinehq.com";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      tradeType,
      numEmployees,
      city,
      state,
      callsPerWeek,
      missedCallsPerWeek,
      avgJobValue,
      monthlyRevenueLost,
    } = body;

    if (!name || !email || !phone || !tradeType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const yearlyLost = (monthlyRevenueLost || 0) * 12;

    // Send email notification
    if (resend) {
      await resend.emails.send({
        from: "Mainline <leads@mainlinehq.com>",
        to: [NOTIFICATION_EMAIL],
        subject: `Missed Call Audit: ${name} - ${tradeType} (${formatCurrency(monthlyRevenueLost || 0)}/mo lost)`,
        html: `
          <h2>New Missed Call Audit Lead</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${esc(name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Trade</td><td style="padding:8px;border:1px solid #ddd;">${esc(tradeType)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Employees</td><td style="padding:8px;border:1px solid #ddd;">${esc(String(numEmployees || "N/A"))}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Location</td><td style="padding:8px;border:1px solid #ddd;">${esc(city || "")}, ${esc(state || "")}</td></tr>
          </table>
          <h3 style="margin-top:20px;">Audit Numbers</h3>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Calls/Week</td><td style="padding:8px;border:1px solid #ddd;">${callsPerWeek}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Missed Calls/Week</td><td style="padding:8px;border:1px solid #ddd;">${missedCallsPerWeek}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Avg Job Value</td><td style="padding:8px;border:1px solid #ddd;">${formatCurrency(avgJobValue || 0)}</td></tr>
            <tr style="background:#fff3e0;"><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Monthly Revenue Lost</td><td style="padding:8px;border:1px solid #ddd;font-weight:bold;color:#E8630A;">${formatCurrency(monthlyRevenueLost || 0)}</td></tr>
            <tr style="background:#fff3e0;"><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Yearly Revenue Lost</td><td style="padding:8px;border:1px solid #ddd;font-weight:bold;color:#E8630A;">${formatCurrency(yearlyLost)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Submitted</td><td style="padding:8px;border:1px solid #ddd;">${new Date(timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</td></tr>
          </table>
        `,
      });
    } else {
      console.warn(
        "RESEND_API_KEY not configured - audit lead notification not sent"
      );
    }

    // Persist lead to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const auditNotes = [
          `[Missed Call Audit]`,
          `Calls/week: ${callsPerWeek}`,
          `Missed/week: ${missedCallsPerWeek}`,
          `Avg job: ${formatCurrency(avgJobValue || 0)}`,
          `Monthly lost: ${formatCurrency(monthlyRevenueLost || 0)}`,
          `Yearly lost: ${formatCurrency(yearlyLost)}`,
          `Employees: ${numEmployees || "N/A"}`,
          `Location: ${city || ""}, ${state || ""}`,
        ].join(" | ");

        const { error: dbError } = await getSupabase()
          .from("leads")
          .insert({
            name,
            phone,
            email,
            source: "form",
            job_type: tradeType,
            urgency: "normal",
            notes: auditNotes,
            status: "new",
            client_id: null,
          });
        if (dbError) {
          console.error(
            "Failed to persist audit lead to Supabase:",
            dbError.message
          );
        }
      } catch (dbErr) {
        console.error("Supabase audit lead insert error:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Audit request received",
    });
  } catch (error) {
    console.error("Audit form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
