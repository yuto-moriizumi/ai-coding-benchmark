import Link from 'next/link';
import { articles } from '@/db/schema';

async function getArticles() {
  const res = await fetch('http://localhost:3000/api/articles', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export default async function ArticleList() {
  const allArticles: (typeof articles.$inferSelect)[] = await getArticles();

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {allArticles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/articles/new">New Article</Link>
    </div>
  );
}
