import { NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const allArticles = await db.select().from(articles);
  return NextResponse.json(allArticles);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const newArticle = await db.insert(articles).values({ title, content }).returning();
  return NextResponse.json(newArticle[0]);
}
