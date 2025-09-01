import Link from "next/link";
import { db } from "../db";
import { articles, comments } from "../db/schema";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";

async function resetData() {
  "use server";
  await db.delete(comments);
  await db.delete(articles);
  await db.run(sql`DELETE FROM sqlite_sequence WHERE name='articles'`);
  await db.run(sql`DELETE FROM sqlite_sequence WHERE name='comments'`);
  revalidatePath("/");
}

export default async function Home() {
  const allArticles = await db
    .select()
    .from(articles)
    .orderBy(desc(articles.createdAt));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="mb-4 space-x-4">
        <form action={resetData} className="inline">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reset data
          </button>
        </form>
        <Link
          href="/new-post"
          className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
        >
          Add new article
        </Link>
      </div>
      <div className="space-y-4">
        {allArticles.map((article) => (
          <article key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/posts/${article.id}`}
                className="text-blue-600 hover:underline"
              >
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600">
              {article.content.substring(0, 100)}...
            </p>
            <p className="text-sm text-gray-500">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
