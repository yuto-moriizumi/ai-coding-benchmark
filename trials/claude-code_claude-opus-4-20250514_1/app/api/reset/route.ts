import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, comments } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

export async function POST() {
  try {
    await db.delete(comments);
    await db.delete(posts);
    return NextResponse.json({ message: 'Data reset successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset data' }, { status: 500 });
  }
}