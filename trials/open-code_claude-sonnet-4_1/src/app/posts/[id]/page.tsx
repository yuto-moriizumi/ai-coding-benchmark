'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Comment {
  id: number;
  name: string;
  content: string;
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(resolvedParams => {
      setPostId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.post);
          setComments(data.comments);
        } else if (response.status === 404) {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content: comment }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setName('');
        setComment('');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
          Back to Blog
        </Link>
        <div>Post not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Blog
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <article className="prose max-w-none mb-8">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-4 border-gray-200 pl-4">
              <div className="font-semibold">{comment.name}</div>
              <div className="text-gray-700 whitespace-pre-wrap">{comment.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}