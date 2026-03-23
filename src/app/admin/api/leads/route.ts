import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ leads: [], configured: false });
  }

  try {
    const supabase = getSupabase();
    const url = new URL(req.url);
    const clientId = url.searchParams.get("client_id");
    const status = url.searchParams.get("status");
    const urgency = url.searchParams.get("urgency");
    const limit = parseInt(url.searchParams.get("limit") || "100", 10);

    let query = supabase
      .from("leads")
      .select("*, clients(business_name)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (clientId) {
      query = query.eq("client_id", clientId);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (urgency) {
      query = query.eq("urgency", urgency);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Leads fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch leads" },
        { status: 500 }
      );
    }

    // Flatten client business_name onto each lead
    const leads = (data || []).map((lead) => {
      const { clients, ...rest } = lead as Record<string, unknown>;
      return {
        ...rest,
        business_name:
          (clients as { business_name?: string } | null)?.business_name ||
          null,
      };
    });

    return NextResponse.json({ leads, configured: true });
  } catch (err) {
    console.error("Leads API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
