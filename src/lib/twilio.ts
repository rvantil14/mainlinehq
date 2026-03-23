import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

function getClient() {
  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials not configured");
  }
  return twilio(accountSid, authToken);
}

export function getTwilioAuthToken(): string {
  if (!authToken) {
    throw new Error("TWILIO_AUTH_TOKEN not configured");
  }
  return authToken;
}

export async function sendSMS(to: string, body: string) {
  if (!fromNumber) {
    throw new Error("TWILIO_PHONE_NUMBER not configured");
  }

  const client = getClient();
  const message = await client.messages.create({
    body,
    from: fromNumber,
    to,
  });

  console.log(`SMS sent to ${to} | SID: ${message.sid}`);
  return { sid: message.sid, status: message.status };
}

export async function sendAppointmentConfirmation(
  to: string,
  businessName: string,
  date: string,
  time: string,
  address?: string
) {
  const lines = [
    `Your appointment with ${businessName} is confirmed.`,
    `Date: ${date}`,
    `Time: ${time}`,
  ];
  if (address) {
    lines.push(`Location: ${address}`);
  }
  lines.push("", "Reply CANCEL to cancel or RESCHEDULE to change your time.");

  return sendSMS(to, lines.join("\n"));
}

export async function sendAppointmentReminder(
  to: string,
  businessName: string,
  date: string,
  time: string
) {
  const body = [
    `Reminder: You have an appointment with ${businessName} tomorrow.`,
    `Date: ${date}`,
    `Time: ${time}`,
    "",
    "Reply CANCEL if you need to reschedule.",
  ].join("\n");

  return sendSMS(to, body);
}

export async function sendReviewRequest(
  to: string,
  businessName: string,
  googleReviewUrl: string
) {
  const body = [
    `Thanks for choosing ${businessName}! We hope everything went well.`,
    "",
    `If you have a moment, a quick review would mean a lot to us:`,
    googleReviewUrl,
  ].join("\n");

  return sendSMS(to, body);
}

export async function sendInvoiceLink(
  to: string,
  businessName: string,
  amount: string,
  paymentUrl: string
) {
  const body = [
    `${businessName} - Invoice for $${amount}`,
    "",
    `Pay securely here: ${paymentUrl}`,
    "",
    "Reply with any questions.",
  ].join("\n");

  return sendSMS(to, body);
}

export { twilio };
