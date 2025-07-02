import { db } from "@/db";
import { posts } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const newPost = await db.insert(posts).values({ title, content }).returning();
  return NextResponse.json(newPost);
}

export async function GET() {
  const allPosts = await db.select().from(posts);
  return NextResponse.json(allPosts);
}
