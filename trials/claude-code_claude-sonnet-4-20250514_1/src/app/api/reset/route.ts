import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts, comments } from "@/db/schema";

export async function POST() {
  await db.delete(comments);
  await db.delete(posts);
  
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}