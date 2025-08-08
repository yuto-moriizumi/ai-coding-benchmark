'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, content }) });
      if (res.ok) {
        const post = await res.json();
        router.push(`/posts/${post.id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input id="title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
            <textarea id="content" value={content} onChange={e=>setContent(e.target.value)} rows={10} className="w-full p-2 border rounded" required />
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">{loading? 'Publishing...' : 'Publish Post'}</button>
          <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
