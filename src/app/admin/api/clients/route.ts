import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { BusinessType, ClientPackage, AiConfig } from "@/lib/database.types";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ clients: [] });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ clients: data ?? [] });
  } catch (err) {
    console.error("List clients error:", err);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
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
      business_type,
      phone,
      email,
      website,
      city,
      state,
      package: clientPackage,
      ai_config,
    } = body as {
      business_name: string;
      owner_name: string;
      business_type: BusinessType;
      phone?: string;
      email: string;
      website?: string;
      city?: string;
      state?: string;
      package: ClientPackage;
      ai_config?: AiConfig;
    };

    if (!business_name || !owner_name || !business_type || !email) {
      return NextResponse.json(
        { error: "Missing required fields: business_name, owner_name, business_type, email" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("clients")
      .insert({
        business_name,
        owner_name,
        business_type,
        phone: phone || null,
        email,
        website: website || null,
        city: city || null,
        state: state || null,
        package: clientPackage || "starter",
        status: "onboarding",
        ai_config: ai_config || {},
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ client: data }, { status: 201 });
  } catch (err) {
    console.error("Create client error:", err);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
