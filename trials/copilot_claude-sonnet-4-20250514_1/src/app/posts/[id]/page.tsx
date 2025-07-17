'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  content: string;
  createdAt: Date;
}

interface PostWithComments extends Post {
  comments: Comment[];
}

export default function PostDetail() {
  const params = useParams();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [post, setPost] = useState<PostWithComments | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !commentContent.trim()) {
      alert('Please fill in both name and comment');
      return;
    }

    setSubmittingComment(true);
    
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content: commentContent }),
      });

      if (response.ok) {
        setName('');
        setCommentContent('');
        // Refresh to show new comment
        const fetchPost = async () => {
          try {
            const response = await fetch(`/api/posts/${postId}`);
            if (response.ok) {
              const data = await response.json();
              setPost(data);
            }
          } catch (error) {
            console.error('Failed to refresh post:', error);
          }
        };
        fetchPost();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add comment');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  useEffect(() => {
    console.log('PostDetail useEffect triggered, postId:', postId);
    const fetchPost = async () => {
      try {
        console.log('Fetching post with ID:', postId);
        const response = await fetch(`/api/posts/${postId}`);
        console.log('Response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('Post data received:', data);
          setPost(data);
        } else {
          console.error('Failed to fetch post, status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!post) {
    return <div className="p-8">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link
        href="/"
        className="inline-block mb-6 text-blue-500 hover:text-blue-700"
      >
        ← Back to Blog
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <p className="text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      
      <article className="prose max-w-none mb-12">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </article>
      
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        
        <form onSubmit={handleCommentSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="comment-name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="comment-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="comment-content" className="block text-sm font-medium mb-2">
              Comment
            </label>
            <textarea
              id="comment-content"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              rows={4}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={submittingComment}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {submittingComment ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        
        <div className="space-y-4">
          {post.comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{comment.name}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
