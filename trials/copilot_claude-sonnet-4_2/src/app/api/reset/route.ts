import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, comments } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function POST() {
  try {
    // Delete all comments first (due to foreign key constraint)
    await db.delete(comments);

    // Delete all posts
    await db.delete(posts);

    // Reset auto increment counters
    await db.run(
      sql`DELETE FROM sqlite_sequence WHERE name IN ('posts', 'comments')`
    );

    // Return a redirect response
    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
      307
    );
  } catch (error) {
    console.error("Error resetting data:", error);
    return NextResponse.json(
      { error: "Failed to reset data" },
      { status: 500 }
    );
  }
}
