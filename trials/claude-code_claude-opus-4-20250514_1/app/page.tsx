'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/db/schema';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  const handleReset = async () => {
    await fetch('/api/reset', { method: 'POST' });
    setPosts([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Blog</h1>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/new-post">
          <button>Add new article</button>
        </Link>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>
          Reset data
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <article key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h2>
              <Link href={`/posts/${post.id}`}>
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