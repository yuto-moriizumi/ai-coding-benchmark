'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post, Comment } from '@/lib/db/schema';

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    const response = await fetch(`/api/posts/${params.id}`);
    const data = await response.json();
    setPost(data);
  };

  const fetchComments = async () => {
    const response = await fetch(`/api/posts/${params.id}/comments`);
    const data = await response.json();
    setComments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${params.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content: commentContent }),
    });
    setName('');
    setCommentContent('');
    fetchComments();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/">Back to Blog</Link>
      <h1>{post.title}</h1>
      <article style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc' }}>
        {post.content}
      </article>

      <h2>Comments</h2>
      <div style={{ marginBottom: '20px' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
            <strong>{comment.name}</strong>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
            rows={4}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}