import { db } from '@/lib/db';
import { posts, comments } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await db.delete(comments);
    await db.delete(posts);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to reset data:', error);
    return NextResponse.json({ error: 'Failed to reset data' }, { status: 500 });
  }
}