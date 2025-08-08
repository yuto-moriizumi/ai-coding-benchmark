import { NextRequest, NextResponse } from 'next/server';
import { db, sqlite } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const all = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json(all);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    if (!title || !content) return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    const [inserted] = await db.insert(posts).values({ title, content }).returning();
    return NextResponse.json(inserted, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // clear comments first then posts
    sqlite.exec('DELETE FROM comments;');
    await db.delete(posts);
    sqlite.exec("DELETE FROM sqlite_sequence WHERE name = 'posts'");
    sqlite.exec("DELETE FROM sqlite_sequence WHERE name = 'comments'");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
