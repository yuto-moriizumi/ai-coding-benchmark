import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    const { name, content } = await request.json();

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and content are required" },
        { status: 400 }
      );
    }

    const newComment = await db
      .insert(comments)
      .values({
        postId,
        name,
        content,
        createdAt: Date.now(),
      })
      .returning();

    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
