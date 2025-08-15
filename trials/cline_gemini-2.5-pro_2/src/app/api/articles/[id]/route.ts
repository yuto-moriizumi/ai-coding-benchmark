import { NextResponse } from 'next/server';
import { db } from '@/db';
import { articles, comments } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const articleId = parseInt(params.id, 10);
  const article = await db.query.articles.findFirst({
    where: eq(articles.id, articleId),
    with: {
      comments: true,
    },
  });

  if (!article) {
    return new NextResponse('Article not found', { status: 404 });
  }

  return NextResponse.json(article);
}
