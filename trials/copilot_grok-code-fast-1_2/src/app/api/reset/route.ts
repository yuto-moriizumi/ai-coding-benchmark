import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { posts, comments } from "../../../lib/schema";

export async function DELETE() {
  await db.delete(comments);
  await db.delete(posts);
  return NextResponse.json({ success: true });
}
