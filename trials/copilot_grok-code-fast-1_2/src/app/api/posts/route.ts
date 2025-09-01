import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { posts } from "../../../lib/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return NextResponse.json(allPosts);
}

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();
  const newPost = await db
    .insert(posts)
    .values({ title, content })
    .returning({ id: posts.id });
  return NextResponse.json({ id: newPost[0].id });
}
