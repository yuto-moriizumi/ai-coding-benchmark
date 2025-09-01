import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/articles`, { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const articles = await getArticles();
  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="flex gap-3 mb-4">
        <form action={async () => {
          'use server';
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/reset`, { method: 'POST' });
          redirect('/');
        }}>
          <button type="submit" className="border px-3 py-2">Reset data</button>
        </form>
        <Link href="/new-post" className="border px-3 py-2">Add new article</Link>
      </div>
      <section className="flex flex-col gap-3">
        {articles.map((a: any) => (
          <article key={a.id} className="border p-3">
            <h2>
              <Link href={`/posts/${a.id}`} className="underline">{a.title}</Link>
            </h2>
          </article>
        ))}
      </section>
    </main>
  );
}
