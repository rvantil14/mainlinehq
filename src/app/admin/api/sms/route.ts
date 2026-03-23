import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ messages: [], count: 0 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");
  const direction = searchParams.get("direction");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);

  try {
    const supabase = getSupabase();
    let query = supabase
      .from("sms_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (clientId) query = query.eq("client_id", clientId);
    if (direction) query = query.eq("direction", direction);

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ messages: data, count: data?.length || 0 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
