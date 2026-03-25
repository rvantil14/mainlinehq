import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFICATION_EMAIL = "ryan@mainlinehq.com";

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, businessName, phone, email, tradeType, message } = body;

    if (!name || !businessName || !phone || !email || !tradeType) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Send email notification
    if (resend) {
      await resend.emails.send({
        from: "Mainline <leads@mainlinehq.com>",
        to: [NOTIFICATION_EMAIL],
        subject: `New Lead: ${name} - ${businessName} (${tradeType})`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${esc(name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Business</td><td style="padding:8px;border:1px solid #ddd;">${esc(businessName)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Trade</td><td style="padding:8px;border:1px solid #ddd;">${esc(tradeType)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
            ${message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${esc(message)}</td></tr>` : ""}
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Submitted</td><td style="padding:8px;border:1px solid #ddd;">${new Date(timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</td></tr>
          </table>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY not configured - lead notification not sent");
    }

    // Persist lead to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const { error: dbError } = await getSupabase()
          .from("leads")
          .insert({
            name,
            phone,
            email,
            source: "form",
            job_type: tradeType,
            urgency: "normal",
            notes: message || null,
            status: "new",
            client_id: null,
          });
        if (dbError) {
          console.error("Failed to persist contact lead to Supabase:", dbError.message);
        }
      } catch (dbErr) {
        console.error("Supabase contact lead insert error:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "We'll be in touch shortly",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
