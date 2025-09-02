import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../../lib/db';
import { comments, posts } from '../../../../../../lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    // Check if post exists
    const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
    if (post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { author, content } = await request.json();

    if (!author || !content) {
      return NextResponse.json({ error: 'Author and content are required' }, { status: 400 });
    }

    const newComment = await db.insert(comments).values({
      postId,
      author,
      content,
    }).returning();

    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}