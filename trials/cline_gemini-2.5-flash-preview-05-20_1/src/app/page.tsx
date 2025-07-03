'use client';

import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  const posts: Post[] = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="flex gap-4 mb-8">
        <Link href="/new-post" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add new article
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </main>
  );
}
