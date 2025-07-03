"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  content: string;
  createdAt: string;
}

export default function PostDetail() {
  const params = useParams();
  const id = params.id;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data));
        
      fetch(`/api/posts/${id}/comments`)
        .then(res => res.json())
        .then(data => setComments(data));
    }
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, content: comment }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setName("");
      setComment("");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Blog
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <article className="prose max-w-none mb-8">
        <p>{post.content}</p>
      </article>
      
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        
        <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-24"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded">
              <h3 className="font-semibold">{comment.name}</h3>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}