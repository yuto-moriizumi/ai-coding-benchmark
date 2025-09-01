import { NextResponse } from 'next/server';
import { db, posts } from '@/db';
import { desc } from 'drizzle-orm';

export async function GET() {
  const list = db.select().from(posts).orderBy(desc(posts.id)).all();
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body ?? {};
  if (!title || !content) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  const res = db.insert(posts).values({ title, content, createdAt: Number(new Date()) }).run();
  const id = Number(res.lastInsertRowid);
  return NextResponse.json({ id });
}
