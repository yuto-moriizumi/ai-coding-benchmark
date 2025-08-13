import { NextRequest, NextResponse } from "next/server";
import { getDb, posts, persistDb } from "@/db";

export async function GET() {
  try {
    const db = await getDb();
    const allPosts = await db.select().from(posts);
    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const { title, content } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }
    const newPost = await db.insert(posts).values({
      title,
      content,
      createdAt: new Date(),
    }).returning();
    await persistDb();
    return NextResponse.json(newPost[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
