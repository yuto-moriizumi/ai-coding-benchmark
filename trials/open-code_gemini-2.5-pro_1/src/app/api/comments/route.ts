import { db } from "@/db";
import { comments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { articleId, author, content } = await request.json();
  const newComment = await db
    .insert(comments)
    .values({ articleId, author, content })
    .returning();
  return NextResponse.json(newComment[0]);
}
