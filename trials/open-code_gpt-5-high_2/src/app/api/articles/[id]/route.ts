import { NextResponse } from 'next/server';
import { db, posts, comments } from '@/db';
import { eq } from 'drizzle-orm';

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const pid = Number(id);
  const post = db.select().from(posts).where(eq(posts.id, pid)).get();
  if (!post) return NextResponse.json({ error: 'not found' }, { status: 404 });
  const comms = db.select().from(comments).where(eq(comments.postId, pid)).all();
  return NextResponse.json({ post, comments: comms });
}
