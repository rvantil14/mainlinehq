import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ prospects: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const city = searchParams.get("city");
    const trade_type = searchParams.get("trade_type");

    const supabase = getSupabase();
    let query = supabase.from("prospects").select("*");

    if (status) {
      query = query.eq("status", status);
    }
    if (city) {
      query = query.eq("city", city);
    }
    if (trade_type) {
      query = query.eq("trade_type", trade_type);
    }

    // Order: next_follow_up_at ascending (nulls last), then created_at desc
    query = query
      .order("next_follow_up_at", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ prospects: data ?? [] });
  } catch (err) {
    console.error("List prospects error:", err);
    return NextResponse.json(
      { error: "Failed to fetch prospects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

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
      notes,
      next_follow_up_at,
    } = body as {
      business_name: string;
      owner_name?: string;
      trade_type?: string;
      phone?: string;
      email?: string;
      website?: string;
      city?: string;
      state?: string;
      google_reviews?: number;
      has_chat_widget?: boolean;
      has_website?: boolean;
      notes?: string;
      next_follow_up_at?: string;
    };

    if (!business_name) {
      return NextResponse.json(
        { error: "Missing required field: business_name" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("prospects")
      .insert({
        business_name,
        owner_name: owner_name || null,
        trade_type: trade_type || null,
        phone: phone || null,
        email: email || null,
        website: website || null,
        city: city || null,
        state: state || "CA",
        google_reviews: google_reviews ?? null,
        has_chat_widget: has_chat_widget ?? false,
        has_website: has_website ?? true,
        status: "researched",
        notes: notes || null,
        next_follow_up_at: next_follow_up_at || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ prospect: data }, { status: 201 });
  } catch (err) {
    console.error("Create prospect error:", err);
    return NextResponse.json(
      { error: "Failed to create prospect" },
      { status: 500 }
    );
  }
}
