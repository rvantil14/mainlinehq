import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// TODO: Integrate email notifications via Resend or SendGrid

const DATA_DIR = path.join(process.cwd(), "data");
const ONBOARDING_FILE = path.join(DATA_DIR, "onboarding.json");
const LEADS_LOG = path.join(DATA_DIR, "leads.log");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ownerName, businessName, businessType, phone, email, city, selectedPackage } = body;

    // Basic validation
    if (!ownerName || !businessName || !businessType || !phone || !email || !selectedPackage) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const entry = { ownerName, businessName, businessType, phone, email, city, selectedPackage, timestamp };

    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Append to onboarding.json
    let submissions: unknown[] = [];
    try {
      const raw = await fs.readFile(ONBOARDING_FILE, "utf-8");
      submissions = JSON.parse(raw);
    } catch {
      // File doesn't exist yet - start fresh
    }
    submissions.push(entry);
    await fs.writeFile(ONBOARDING_FILE, JSON.stringify(submissions, null, 2));

    // Append to leads.log
    const logLine = `[${timestamp}] ONBOARDING | ${ownerName} | ${businessName} | ${businessType} | ${selectedPackage} | ${phone} | ${email}\n`;
    await fs.appendFile(LEADS_LOG, logLine);

    console.log(`New onboarding submission: ${ownerName} (${businessName}) - ${selectedPackage} package`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
