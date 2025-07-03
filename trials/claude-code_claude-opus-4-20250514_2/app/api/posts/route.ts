import { NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt))
  return NextResponse.json(allPosts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title, content } = body
  
  const newPost = await db.insert(posts).values({
    title,
    content,
  }).returning()
  
  return NextResponse.json(newPost[0])
}