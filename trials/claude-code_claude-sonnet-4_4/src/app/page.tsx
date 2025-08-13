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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const postsData = await response.json();
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('/api/reset', { method: 'POST' });
      if (response.ok) {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="flex gap-4 mb-8">
        <Link href="/new-post" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add new article
        </Link>
        <button 
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reset data
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border border-gray-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <Link 
              href={`/posts/${post.id}`}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Read more
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-8">No articles yet. Create your first one!</p>
        )}
      </div>
    </div>
  );
}
