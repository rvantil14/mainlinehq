import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// TODO: Integrate email notifications via Resend or SendGrid
// For now, submissions are stored to JSON + logged to leads.log

const DATA_DIR = path.join(process.cwd(), "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");
const LEADS_LOG = path.join(DATA_DIR, "leads.log");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, businessName, phone, email, tradeType, message } = body;

    // Basic validation
    if (!name || !businessName || !phone || !email || !tradeType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const entry = { name, businessName, phone, email, tradeType, message, timestamp };

    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Append to contacts.json
    let contacts: unknown[] = [];
    try {
      const raw = await fs.readFile(CONTACTS_FILE, "utf-8");
      contacts = JSON.parse(raw);
    } catch {
      // File doesn't exist yet - start fresh
    }
    contacts.push(entry);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

    // Append to leads.log
    const logLine = `[${timestamp}] CONTACT | ${name} | ${businessName} | ${tradeType} | ${phone} | ${email}\n`;
    await fs.appendFile(LEADS_LOG, logLine);

    console.log(`New contact submission: ${name} (${businessName}) - ${tradeType}`);

    return NextResponse.json({
      success: true,
      message: "We'll call you within 4 hours",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
