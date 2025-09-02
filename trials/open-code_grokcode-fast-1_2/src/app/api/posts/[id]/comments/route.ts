import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comments } from '@/lib/schema';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    const { author, content } = await request.json();

    if (!author || !content) {
      return NextResponse.json({ error: 'Author and content are required' }, { status: 400 });
    }

    const newComment = await db.insert(comments).values({
      postId,
      author,
      content,
      createdAt: new Date(),
    }).returning();

    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}