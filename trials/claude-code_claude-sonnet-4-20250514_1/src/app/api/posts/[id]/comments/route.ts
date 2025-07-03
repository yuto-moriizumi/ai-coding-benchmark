import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const postComments = await db.select().from(comments).where(eq(comments.postId, parseInt(params.id)));
  
  return NextResponse.json(postComments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name, content } = await request.json();
  
  const [newComment] = await db.insert(comments).values({
    postId: parseInt(params.id),
    name,
    content,
    createdAt: new Date(),
  }).returning();
  
  return NextResponse.json(newComment);
}