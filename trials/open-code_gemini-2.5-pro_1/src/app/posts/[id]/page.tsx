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
  author: string;
  content: string;
};

export default function Post({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  const fetchArticle = async () => {
    const res = await fetch(`/api/articles/${params.id}`);
    const data = await res.json();
    setArticle(data);
  };

  const createComment = async () => {
    if (!article) return;
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: article.id, author, content: comment }),
    });
    fetchArticle();
    setAuthor("");
    setComment("");
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/" className="self-start mb-8">
        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Back to Blog
        </button>
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-8">{article.title}</h1>
        <div className="w-full max-w-2xl">
          <p className="mb-8">{article.content}</p>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {article.comments.map((c) => (
              <div key={c.id} className="p-2 border-t">
                <p className="font-bold">{c.author}</p>
                <p>{c.content}</p>
              </div>
            ))}
            <div className="mt-4">
              <label htmlFor="author" className="block mb-2">
                Your Name
              </label>
              <input
                id="author"
                type="text"
                placeholder="Your Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <label htmlFor="comment" className="block mb-2">
                Comment
              </label>
              <input
                id="comment"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={createComment}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
