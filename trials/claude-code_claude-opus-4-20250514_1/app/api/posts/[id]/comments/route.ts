import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comments } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postComments = await db.select().from(comments).where(eq(comments.postId, parseInt(id)));
    return NextResponse.json(postComments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, content } = await request.json();
    const [newComment] = await db.insert(comments).values({
      postId: parseInt(id),
      name,
      content
    }).returning();
    return NextResponse.json(newComment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}