// ============================================================
// Availability API Route
// GET /api/availability?date=YYYY-MM-DD&eventTypeId=123
// Returns available time slots from Cal.com for a given date.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/calcom";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");
  const eventTypeIdParam = searchParams.get("eventTypeId");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Missing or invalid 'date' param. Use YYYY-MM-DD format." },
      { status: 400 }
    );
  }

  const eventTypeId = eventTypeIdParam
    ? parseInt(eventTypeIdParam, 10)
    : parseInt(process.env.CAL_EVENT_TYPE_ID || "0", 10);

  if (!eventTypeId || isNaN(eventTypeId)) {
    return NextResponse.json(
      { error: "No eventTypeId provided and CAL_EVENT_TYPE_ID not set." },
      { status: 400 }
    );
  }

  const slots = await getAvailableSlots(eventTypeId, date, date);

  return NextResponse.json({
    date,
    eventTypeId,
    slots,
  });
}
