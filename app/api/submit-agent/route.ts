import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, category, description, platform, url, creatorName, creatorEmail } = body;

    const { error } = await supabase.from("agents").insert([
      {
        name,
        category,
        description,
        platform,
        url,
        creatorName,
        creatorEmail,
        status: "pending",
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "Agent submitted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to submit agent" },
      { status: 500 }
    );
  }
}