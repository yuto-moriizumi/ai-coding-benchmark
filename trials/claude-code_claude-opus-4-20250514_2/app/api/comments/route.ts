import { NextResponse } from 'next/server'
import { db } from '@/db'
import { comments } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get('postId')
  
  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 })
  }
  
  const postComments = await db.select()
    .from(comments)
    .where(eq(comments.postId, parseInt(postId)))
    .orderBy(desc(comments.createdAt))
  
  return NextResponse.json(postComments)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { postId, author, content } = body
  
  const newComment = await db.insert(comments).values({
    postId,
    author,
    content,
  }).returning()
  
  return NextResponse.json(newComment[0])
}