import { db } from "@/db";
import { articles, comments } from "@/db/schema";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function POST() {
  await db.delete(comments);
  await db.delete(articles);
  try {
    await db.run(sql`DELETE FROM sqlite_sequence WHERE name IN ('articles', 'comments')`);
  } catch (e) {
    // ignore if the table doesn't exist
  }
  return NextResponse.json({ message: "Data reset" });
}
