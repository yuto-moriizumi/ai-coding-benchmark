"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleReset = async () => {
    await fetch("/api/reset", { method: "DELETE" });
    fetchPosts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <div className="mb-4">
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Reset data
        </button>
        <Link
          href="/new-post"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add new article
        </Link>
      </div>
      <div>
        {posts.map((post) => (
          <article key={post.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/posts/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
