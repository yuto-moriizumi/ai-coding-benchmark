"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

interface Comment {
  id: number;
  name: string;
  comment: string;
  createdAt: Date;
}

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const fetchData = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    setPost(data.post);
    setComments(data.comments);
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, comment }),
    });
    setName("");
    setComment("");
    fetchData();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <article className="mb-8 p-4 border rounded">
        <p>{post.content}</p>
      </article>
      <div className="mb-4">
        <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded">
          Back to Blog
        </Link>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {comments.map((c) => (
          <div key={c.id} className="mb-2 p-2 border rounded">
            <strong>{c.name}:</strong> {c.comment}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
