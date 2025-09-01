'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const resetData = async () => {
    try {
      await fetch('/api/posts', { method: 'DELETE' });
      setPosts([]);
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="space-x-4">
          <Link
            href="/new-post"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add new article
          </Link>
          <button
            onClick={resetData}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset data
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600">{post.content.substring(0, 200)}...</p>
          </article>
        ))}
      </div>
    </div>
  );
}
