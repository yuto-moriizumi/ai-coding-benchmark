'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    try {
      const response = await fetch('/api/posts', { method: 'DELETE' });
      if (response.ok) {
        setPosts([]);
      }
    } catch (error) {
      console.error('Failed to reset data:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="mb-6 flex gap-4">
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

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="border border-gray-300 rounded p-4">
              <Link href={`/posts/${post.id}`} className="text-xl font-semibold hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-600 mt-2">{post.content.substring(0, 200)}...</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
