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
    const { data, error } = await supabase
      .from("prospects")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Prospect not found" }, { status: 404 });
    }

    return NextResponse.json({ prospect: data });
  } catch (err) {
    console.error("Get prospect error:", err);
    return NextResponse.json(
      { error: "Failed to fetch prospect" },
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
      trade_type,
      phone,
      email,
      website,
      city,
      state,
      google_reviews,
      has_chat_widget,
      has_website,
      status,
      notes,
      last_contacted_at,
      next_follow_up_at,
    } = body;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("prospects")
      .update({
        business_name,
        owner_name: owner_name || null,
        trade_type: trade_type || null,
        phone: phone || null,
        email: email || null,
        website: website || null,
        city: city || null,
        state: state || null,
        google_reviews: google_reviews ?? null,
        has_chat_widget: has_chat_widget ?? false,
        has_website: has_website ?? true,
        status,
        notes: notes || null,
        last_contacted_at: last_contacted_at || null,
        next_follow_up_at: next_follow_up_at || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ prospect: data });
  } catch (err) {
    console.error("Update prospect error:", err);
    return NextResponse.json(
      { error: "Failed to update prospect" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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
    const { status, last_contacted_at } = body as {
      status: string;
      last_contacted_at?: string;
    };

    const updateData: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (last_contacted_at) {
      updateData.last_contacted_at = last_contacted_at;
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("prospects")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ prospect: data });
  } catch (err) {
    console.error("Patch prospect error:", err);
    return NextResponse.json(
      { error: "Failed to update prospect status" },
      { status: 500 }
    );
  }
}
