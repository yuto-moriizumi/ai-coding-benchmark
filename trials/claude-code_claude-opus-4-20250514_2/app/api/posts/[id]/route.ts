import { NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  const post = await db.select().from(posts).where(eq(posts.id, parseInt(params.id))).limit(1)
  
  if (post.length === 0) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  
  return NextResponse.json(post[0])
}