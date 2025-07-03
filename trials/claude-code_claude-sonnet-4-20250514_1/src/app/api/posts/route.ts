import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();
  
  const [newPost] = await db.insert(posts).values({
    title,
    content,
    createdAt: new Date(),
  }).returning();
  
  return NextResponse.json(newPost);
}