import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { posts, comments } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postComments = await db.select().from(comments).where(eq(comments.postId, postId));

    return NextResponse.json({ post, comments: postComments });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}