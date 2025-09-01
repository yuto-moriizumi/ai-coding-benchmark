import { db, posts, comments } from '@/db';
import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';

export async function POST() {
  // Use raw SQL with drizzle's sql tagged template
  db.run(sql`DELETE FROM comments`);
  db.run(sql`DELETE FROM posts`);
  return NextResponse.json({ ok: true });
}
