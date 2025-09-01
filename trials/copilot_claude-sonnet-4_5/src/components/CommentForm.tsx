"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          content: content.trim(),
        }),
      });

      if (response.ok) {
        setName("");
        setContent("");
        router.refresh();
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !name.trim() || !content.trim()}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
