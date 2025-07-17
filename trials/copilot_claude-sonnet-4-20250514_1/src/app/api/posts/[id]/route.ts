import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts, comments } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const postId = parseInt(id);
    
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postComments = await db.select().from(comments).where(eq(comments.postId, postId));

    return NextResponse.json({ ...post, comments: postComments });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
