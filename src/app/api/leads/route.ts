// ============================================================
// Leads API Route
// GET /api/leads - list leads from Supabase
// Protected by ADMIN_API_KEY header
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  // Require Supabase
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  // Authenticate with ADMIN_API_KEY
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return NextResponse.json(
      { error: "ADMIN_API_KEY not set on server" },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("x-api-key") || request.headers.get("authorization");
  const providedKey = authHeader?.replace(/^Bearer\s+/i, "");
  if (providedKey !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse query params
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");
  const status = searchParams.get("status");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);

  try {
    const supabase = getSupabase();
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (clientId) {
      query = query.eq("client_id", clientId);
    }
    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[/api/leads] Supabase query error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads: data, count: data?.length || 0 });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Internal server error";
    console.error("[/api/leads] Error:", errMsg);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
