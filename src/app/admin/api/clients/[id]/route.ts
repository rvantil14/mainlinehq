import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { id } = await params;

  try {
    const supabase = getSupabase();

    // Fetch client
    const { data: client, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Fetch counts in parallel
    const [leadsResult, appointmentsResult, conversationsResult] =
      await Promise.all([
        supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("client_id", id),
        supabase
          .from("appointments")
          .select("*", { count: "exact", head: true })
          .eq("client_id", id),
        supabase
          .from("conversations")
          .select("*", { count: "exact", head: true })
          .eq("client_id", id),
      ]);

    return NextResponse.json({
      client,
      counts: {
        leads: leadsResult.count ?? 0,
        appointments: appointmentsResult.count ?? 0,
        conversations: conversationsResult.count ?? 0,
      },
    });
  } catch (err) {
    console.error("Get client error:", err);
    return NextResponse.json(
      { error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      business_name,
      owner_name,
      business_type,
      phone,
      email,
      website,
      city,
      state,
      package: clientPackage,
      status,
      ai_config,
    } = body;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("clients")
      .update({
        business_name,
        owner_name,
        business_type,
        phone: phone || null,
        email,
        website: website || null,
        city: city || null,
        state: state || null,
        package: clientPackage,
        status,
        ai_config: ai_config || {},
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ client: data });
  } catch (err) {
    console.error("Update client error:", err);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}
