import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../lib/db';
import { comments } from '../../../../../lib/schema';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    const { name, content } = await request.json();
    
    const [newComment] = await db.insert(comments).values({
      postId,
      name,
      content,
    }).returning();

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}