import { NextResponse } from 'next/server';
import { db } from '@/db';
import { comments } from '@/db/schema';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const articleId = parseInt(params.id, 10);
  const { content } = await request.json();

  const newComment = await db.insert(comments).values({ content, articleId }).returning();

  return NextResponse.json(newComment[0]);
}
