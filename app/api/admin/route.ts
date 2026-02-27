import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET pending agents
export async function GET() {
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// UPDATE agent status
export async function PATCH(req: Request) {
  const { id, status } = await req.json();

  const { error } = await supabase
    .from("agents")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ message: "Updated successfully" });
}