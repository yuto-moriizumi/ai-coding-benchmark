'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Comment { id: number; postId: number; name: string; content: string; createdAt: Date; }
interface Post { id: number; title: string; content: string; createdAt: Date; comments: Comment[]; }

export default function PostDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        setPost(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) load(); }, [id]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentContent.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${id}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, content: commentContent }) });
      if (res.ok) {
        setName('');
        setCommentContent('');
        load();
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!post) return <div className="p-8">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/" className="inline-block mb-4 text-blue-500">Back to Blog</Link>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article className="prose mb-8"><div className="whitespace-pre-wrap">{post.content}</div></article>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <form onSubmit={submitComment} className="space-y-4 mb-6">
          <div>
            <label htmlFor="comment-name" className="block text-sm font-medium mb-1">Your Name</label>
            <input id="comment-name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label htmlFor="comment-content" className="block text-sm font-medium mb-1">Comment</label>
            <textarea id="comment-content" value={commentContent} onChange={e=>setCommentContent(e.target.value)} rows={4} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-4 py-2 rounded">{submitting? 'Submitting...' : 'Submit'}</button>
        </form>
        <div className="space-y-4">
          {post.comments.length === 0 ? <p>No comments yet.</p> : post.comments.map(c => (
            <div key={c.id} className="border p-3 rounded"><strong>{c.name}</strong><p>{c.content}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
