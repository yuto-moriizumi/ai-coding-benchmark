import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, comments } from "@/lib/db/schema";

export async function POST() {
  try {
    // Delete all comments first (due to foreign key constraint)
    await db.delete(comments);
    // Then delete all posts
    await db.delete(posts);

    return NextResponse.json({ message: "All data reset successfully" });
  } catch (error) {
    console.error("Error resetting data:", error);
    return NextResponse.json(
      { error: "Failed to reset data" },
      { status: 500 }
    );
  }
}
