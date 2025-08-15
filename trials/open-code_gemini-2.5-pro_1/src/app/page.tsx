"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
};

type Comment = {
  id: number;
  content: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await fetch("/api/articles");
    const data = await res.json();
    setArticles(data);
  };

  const resetData = async () => {
    await fetch("/api/reset", { method: "POST" });
    fetchArticles();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Link href="/new-post">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Add new article
            </button>
          </Link>
        </div>
        <button
          onClick={resetData}
          className="bg-red-500 text-white px-4 py-2 rounded mb-8"
        >
          Reset data
        </button>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Articles</h2>
          {articles.map((article) => (
            <article key={article.id} className="mb-8 p-4 border rounded">
              <Link href={`/posts/${article.id}`}>
                <h3 className="text-xl font-bold hover:underline">
                  {article.title}
                </h3>
              </Link>
              <p>{article.content}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
