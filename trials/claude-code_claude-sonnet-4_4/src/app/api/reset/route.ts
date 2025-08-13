import { NextResponse } from 'next/server';
import { resetAllData } from '@/lib/db-actions';

export async function POST() {
  try {
    await resetAllData();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset data' }, { status: 500 });
  }
}