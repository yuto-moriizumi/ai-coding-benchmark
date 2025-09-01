import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { posts, comments } from "../../../../lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = parseInt(id);
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);
  if (post.length === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);
  return NextResponse.json({ post: post[0], comments: postComments });
}
