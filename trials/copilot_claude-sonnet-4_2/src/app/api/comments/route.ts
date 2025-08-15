import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { postId, name, content } = await request.json();

    if (!postId || !name || !content) {
      return NextResponse.json(
        { error: "Post ID, name, and content are required" },
        { status: 400 }
      );
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        postId,
        name,
        content,
      })
      .returning();

    return NextResponse.json({ id: newComment.id });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
