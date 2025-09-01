import { NextResponse } from 'next/server';
import { db, comments } from '@/db';

export async function POST(req: Request) {
  const body = await req.json();
  const { postId, author, body: text } = body ?? {};
  if (!postId || !author || !text) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  const res = db.insert(comments).values({ postId: Number(postId), author, body: text, createdAt: Number(new Date()) }).run();
  return NextResponse.json({ id: Number(res.lastInsertRowid) });
}
