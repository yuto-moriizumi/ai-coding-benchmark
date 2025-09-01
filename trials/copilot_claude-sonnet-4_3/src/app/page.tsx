"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const resetData = async () => {
    try {
      await fetch("/api/posts", { method: "DELETE" });
      setPosts([]);
    } catch (error) {
      console.error("Failed to reset data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Blog</h1>
          <div className="flex gap-4">
            <Link
              href="/new-post"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add new article
            </Link>
            <button
              onClick={resetData}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset data
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="border p-6 rounded-lg shadow-sm">
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold mb-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4">
                {post.content.substring(0, 150)}...
              </p>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </article>
          ))}

          {posts.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No posts yet. Create your first post!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
