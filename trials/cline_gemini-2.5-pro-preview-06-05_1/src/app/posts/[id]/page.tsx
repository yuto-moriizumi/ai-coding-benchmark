"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

type Comment = {
  id: number;
  postId: number;
  author: string;
  content: string;
};

export default function Post({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${params.id}`);
      const post = await res.json();
      setPost(post);
    };
    const fetchComments = async () => {
      const res = await fetch(`/api/posts/${params.id}/comments`);
      const comments = await res.json();
      setComments(comments);
    };
    fetchPost();
    fetchComments();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${params.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author, content }),
    });
    setAuthor("");
    setContent("");
    const res = await fetch(`/api/posts/${params.id}/comments`);
    const comments = await res.json();
    setComments(comments);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">Back to Blog</Link>
      <h1>{post.title}</h1>
      <article>{post.content}</article>

      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author}</strong>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h3>Add a comment</h3>
        <div>
          <label htmlFor="author">Your Name</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Comment</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
