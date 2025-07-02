import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(params.id)));
  return NextResponse.json(post[0]);
}
