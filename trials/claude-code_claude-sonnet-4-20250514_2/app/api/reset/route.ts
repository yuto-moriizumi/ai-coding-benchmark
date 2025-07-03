import { NextResponse } from "next/server";
import { db, posts, comments } from "@/lib/db";

export async function POST() {
  try {
    await db.delete(comments);
    await db.delete(posts);
    
    return NextResponse.json({ message: "All data reset successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset data" }, { status: 500 });
  }
}