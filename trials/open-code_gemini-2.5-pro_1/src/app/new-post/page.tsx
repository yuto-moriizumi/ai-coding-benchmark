"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const createArticle = async () => {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const newArticle = await res.json();
    router.push(`/posts/${newArticle.id}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">New Post</h1>
      <div className="w-full max-w-2xl">
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          id="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={createArticle}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Publish Post
        </button>
      </div>
    </main>
  );
}
