import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts, comments } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const pid = parseInt(id, 10);
    if (isNaN(pid)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const [post] = await db.select().from(posts).where(eq(posts.id, pid));
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const comms = await db.select().from(comments).where(eq(comments.postId, pid));
    return NextResponse.json({ ...post, comments: comms });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
