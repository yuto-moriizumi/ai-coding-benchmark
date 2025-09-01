import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const allPosts = await db.select().from(posts).orderBy(posts.createdAt);
    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const result = await db.insert(posts).values({ title, content }).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await db.delete(posts);
    return NextResponse.json({ message: 'All posts deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete posts' }, { status: 500 });
  }
}