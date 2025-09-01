import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts, comments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const post = db.select().from(posts).where(eq(posts.id, id)).get();
  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });
  const comm = db.select().from(comments).where(eq(comments.postId, id)).orderBy(desc(comments.createdAt)).all();
  return NextResponse.json({ post, comments: comm });
}
