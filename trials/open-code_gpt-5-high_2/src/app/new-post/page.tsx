"use client";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    if (!res.ok) return;
    const data = await res.json();
    router.push(`/posts/${data.id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2" />
        <label htmlFor="content">Content</label>
        <textarea id="content" value={content} onChange={e=>setContent(e.target.value)} className="border p-2" />
        <button type="submit" className="border px-3 py-2">Publish Post</button>
      </form>
    </div>
  );
}
