import { db } from "@/db";
import { comments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    const { authorName, content } = await request.json();

    if (!authorName || !content) {
      return NextResponse.json(
        { error: "Author name and content are required" },
        { status: 400 }
      );
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        postId,
        authorName,
        content,
      })
      .returning();

    return NextResponse.json(newComment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
