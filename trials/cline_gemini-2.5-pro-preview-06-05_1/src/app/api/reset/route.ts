import { db } from "@/db";
import { posts, comments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST() {
  await db.delete(comments);
  await db.delete(posts);
  return NextResponse.json({ message: "Database reset" });
}
