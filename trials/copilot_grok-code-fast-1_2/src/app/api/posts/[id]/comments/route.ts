import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { comments } from "../../../../../lib/schema";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = parseInt(id);
  const { name, comment } = await request.json();
  await db.insert(comments).values({ postId, name, comment });
  return NextResponse.json({ success: true });
}
