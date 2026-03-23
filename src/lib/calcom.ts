// ============================================================
// Cal.com v2 API Client
// Helpers for checking availability, creating bookings, and
// cancelling bookings via the Cal.com REST API.
// ============================================================

const CAL_API_BASE = "https://api.cal.com/v2";

function getApiKey(): string | null {
  const key = process.env.CAL_API_KEY;
  if (!key || key === "cal_live_your_key_here") return null;
  return key;
}

function headers(): Record<string, string> {
  const apiKey = getApiKey();
  return {
    "Content-Type": "application/json",
    "cal-api-key": apiKey || "",
  };
}

// ----- Types -----

export interface TimeSlot {
  time: string; // ISO 8601 datetime
}

export interface AvailabilityResponse {
  slots: TimeSlot[];
}

export interface Booking {
  id: number;
  uid: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
}

// ----- Functions -----

/**
 * Get available time slots for a given event type and date range.
 * Returns an empty array if CAL_API_KEY is not configured.
 */
export async function getAvailableSlots(
  eventTypeId: number,
  startDate: string,
  endDate: string
): Promise<TimeSlot[]> {
  if (!getApiKey()) {
    console.warn("[Cal.com] CAL_API_KEY not configured, returning empty slots");
    return [];
  }

  try {
    const params = new URLSearchParams({
      startTime: `${startDate}T00:00:00Z`,
      endTime: `${endDate}T23:59:59Z`,
    });

    const res = await fetch(
      `${CAL_API_BASE}/slots/available?eventTypeId=${eventTypeId}&${params.toString()}`,
      { method: "GET", headers: headers() }
    );

    if (!res.ok) {
      console.error("[Cal.com] Failed to fetch slots:", res.status, await res.text());
      return [];
    }

    const data = await res.json();

    // Cal.com v2 returns { status: "success", data: { slots: { "YYYY-MM-DD": [...] } } }
    const slotsMap = data?.data?.slots || {};
    const allSlots: TimeSlot[] = [];

    for (const dateKey of Object.keys(slotsMap)) {
      for (const slot of slotsMap[dateKey]) {
        allSlots.push({ time: slot.time });
      }
    }

    return allSlots;
  } catch (err) {
    console.error("[Cal.com] Error fetching available slots:", err);
    return [];
  }
}

/**
 * Create a booking for a specific event type.
 * Returns null if CAL_API_KEY is not configured or the request fails.
 */
export async function createBooking(
  eventTypeId: number,
  name: string,
  email: string,
  startTime: string,
  notes?: string
): Promise<Booking | null> {
  if (!getApiKey()) {
    console.warn("[Cal.com] CAL_API_KEY not configured, cannot create booking");
    return null;
  }

  try {
    const body: Record<string, unknown> = {
      eventTypeId,
      start: startTime,
      responses: {
        name,
        email,
      },
      metadata: {},
    };

    if (notes) {
      body.responses = { ...body.responses as Record<string, string>, notes };
    }

    const res = await fetch(`${CAL_API_BASE}/bookings`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("[Cal.com] Failed to create booking:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const booking = data?.data;

    return {
      id: booking.id,
      uid: booking.uid,
      title: booking.title,
      startTime: booking.startTime,
      endTime: booking.endTime,
      status: booking.status,
    };
  } catch (err) {
    console.error("[Cal.com] Error creating booking:", err);
    return null;
  }
}

/**
 * Cancel an existing booking by ID.
 * Returns null if CAL_API_KEY is not configured or the request fails.
 */
export async function cancelBooking(
  bookingId: number,
  reason?: string
): Promise<{ success: boolean } | null> {
  if (!getApiKey()) {
    console.warn("[Cal.com] CAL_API_KEY not configured, cannot cancel booking");
    return null;
  }

  try {
    const body: Record<string, unknown> = {};
    if (reason) {
      body.cancellationReason = reason;
    }

    const res = await fetch(`${CAL_API_BASE}/bookings/${bookingId}/cancel`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("[Cal.com] Failed to cancel booking:", res.status, await res.text());
      return null;
    }

    return { success: true };
  } catch (err) {
    console.error("[Cal.com] Error cancelling booking:", err);
    return null;
  }
}
