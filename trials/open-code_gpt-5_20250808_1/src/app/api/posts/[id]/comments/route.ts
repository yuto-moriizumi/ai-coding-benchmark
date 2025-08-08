import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { comments } from '@/db/schema';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const pid = parseInt(id, 10);
    if (isNaN(pid)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const { name, content } = await req.json();
    if (!name || !content) return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
    const [inserted] = await db.insert(comments).values({ postId: pid, name, content }).returning();
    return NextResponse.json(inserted, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
