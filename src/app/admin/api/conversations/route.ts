import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ conversations: [], configured: false });
  }

  try {
    const supabase = getSupabase();
    const url = new URL(req.url);
    const clientId = url.searchParams.get("client_id");
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);

    let query = supabase
      .from("conversations")
      .select("*, clients(business_name)")
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (clientId) {
      query = query.eq("client_id", clientId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Conversations fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch conversations" },
        { status: 500 }
      );
    }

    const conversations = (data || []).map((conv) => {
      const { clients, ...rest } = conv as Record<string, unknown>;
      return {
        ...rest,
        business_name:
          (clients as { business_name?: string } | null)?.business_name ||
          null,
      };
    });

    return NextResponse.json({ conversations, configured: true });
  } catch (err) {
    console.error("Conversations API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
