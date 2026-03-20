import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFICATION_EMAIL = "ryan@mainlinehq.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, businessName, phone, email, tradeType, message } = body;

    if (!name || !businessName || !phone || !email || !tradeType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
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
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Business</td><td style="padding:8px;border:1px solid #ddd;">${businessName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Trade</td><td style="padding:8px;border:1px solid #ddd;">${tradeType}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            ${message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${message}</td></tr>` : ""}
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Submitted</td><td style="padding:8px;border:1px solid #ddd;">${new Date(timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</td></tr>
          </table>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY not configured - lead notification not sent");
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
