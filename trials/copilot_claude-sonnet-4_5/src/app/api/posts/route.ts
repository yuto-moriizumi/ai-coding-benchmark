import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export async function GET() {
  try {
    const allPosts = await db.select().from(posts).orderBy(posts.createdAt);
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newPost = await db
      .insert(posts)
      .values({
        title,
        content,
        createdAt: Date.now(),
      })
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
