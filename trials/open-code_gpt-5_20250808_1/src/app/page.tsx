'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
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
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    try {
      await fetch('/api/posts', { method: 'DELETE' });
      setPosts([]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="mb-6 flex gap-4">
        <Link href="/new-post" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add new article</Link>
        <button onClick={resetData} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reset data</button>
      </div>
      <div className="space-y-6">
        {posts.length === 0 ? <p>No posts yet.</p> : posts.map(post => (
          <article key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2"><Link href={`/posts/${post.id}`} className="hover:text-blue-600">{post.title}</Link></h2>
            <p className="text-gray-600">{post.content.substring(0, 200)}...</p>
          </article>
        ))}
      </div>
    </div>
  );
}
