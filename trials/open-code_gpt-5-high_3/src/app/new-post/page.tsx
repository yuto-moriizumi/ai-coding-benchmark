"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/posts/${id}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2" />
        </div>
        <div>
          <label htmlFor="content" className="block">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full border p-2" />
        </div>
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
}
