import { db } from "@/db";
import { articles, comments } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(params.id)));
  const articleComments = await db
    .select()
    .from(comments)
    .where(eq(comments.articleId, Number(params.id)));
  return NextResponse.json({ ...article[0], comments: articleComments });
}
