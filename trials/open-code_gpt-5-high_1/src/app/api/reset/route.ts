import { NextResponse } from "next/server";
import { resetDatabase } from "@/db";

export async function POST() {
  try {
    await resetDatabase();
    return NextResponse.json({ message: "All data reset successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset data" }, { status: 500 });
  }
}
