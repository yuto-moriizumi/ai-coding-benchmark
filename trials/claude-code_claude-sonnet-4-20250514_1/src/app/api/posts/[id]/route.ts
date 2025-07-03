import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.select().from(posts).where(eq(posts.id, parseInt(params.id)));
  
  if (post.length === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  
  return NextResponse.json(post[0]);
}