import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { posts } from '../../../lib/schema';

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();
    
    const [newPost] = await db.insert(posts).values({
      title,
      content,
    }).returning();

    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}