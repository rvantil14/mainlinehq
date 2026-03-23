import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const adminCookie = req.cookies.get("mainline_admin");
  if (!adminCookie || adminCookie.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      configured: false,
      clients: 0,
      activeLeads: 0,
      appointmentsThisWeek: 0,
      smsSent: 0,
      recentLeads: [],
    });
  }

  try {
    const supabase = getSupabase();

    // Get client count
    const { count: clientCount } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true });

    // Get active leads (status = new)
    const { count: leadCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");

    // Get appointments this week
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const { count: appointmentCount } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("scheduled_at", weekStart.toISOString())
      .lt("scheduled_at", weekEnd.toISOString());

    // Get SMS sent count
    const { count: smsCount } = await supabase
      .from("sms_messages")
      .select("*", { count: "exact", head: true });

    // Get recent leads
    const { data: recentLeads } = await supabase
      .from("leads")
      .select("id, name, email, phone, trade, status, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    return NextResponse.json({
      configured: true,
      clients: clientCount ?? 0,
      activeLeads: leadCount ?? 0,
      appointmentsThisWeek: appointmentCount ?? 0,
      smsSent: smsCount ?? 0,
      recentLeads: recentLeads ?? [],
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
