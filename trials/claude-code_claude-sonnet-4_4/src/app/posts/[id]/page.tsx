'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPost();
      fetchComments();
    }
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (response.ok) {
        const postData = await response.json();
        setPost(postData);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}/comments`);
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !comment) return;
    
    setIsSubmittingComment(true);
    
    try {
      const response = await fetch(`/api/posts/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content: comment }),
      });
      
      if (response.ok) {
        setName('');
        setComment('');
        fetchComments();
      } else {
        console.error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          Back to Blog
        </Link>
      </div>
      
      <article className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Comments ({comments.length})</h2>
        
        <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Add a comment</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                aria-label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                aria-label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your comment here"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={!name || !comment || isSubmittingComment}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingComment ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}