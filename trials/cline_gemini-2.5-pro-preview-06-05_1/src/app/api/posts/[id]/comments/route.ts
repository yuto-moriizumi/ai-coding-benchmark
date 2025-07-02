import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const allComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, Number(params.id)));
  return NextResponse.json(allComments);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { author, content } = await request.json();
  const newComment = await db
    .insert(comments)
    .values({ postId: Number(params.id), author, content })
    .returning();
  return NextResponse.json(newComment);
}
