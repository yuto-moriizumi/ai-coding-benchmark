import { db } from '@/db';
import { posts, comments } from '@/db/schema';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    await db.delete(comments);
    await db.delete(posts);
    // Revalidate the homepage to ensure fresh data is fetched
    revalidatePath('/');
    return NextResponse.json({ message: 'Database reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting database:', error);
    return NextResponse.json({ error: 'Failed to reset database' }, { status: 500 });
  }
}
