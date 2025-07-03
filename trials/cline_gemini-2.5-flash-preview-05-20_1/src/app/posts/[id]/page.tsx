'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
}

export default function PostDetailPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop(); // Extract id from the path
  console.log('Current Post ID:', id); // Debugging id extraction
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!id || isNaN(parseInt(id))) {
      console.error('Invalid or missing post ID:', id); // Debugging invalid ID
      return;
    }

    const fetchPostAndComments = async () => {
      try {
        const postRes = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (postRes.ok) {
          const postData: Post = await postRes.json();
          console.log('Fetched post data:', postData); // Debugging post data
          setPost(postData);
        } else {
          console.error('Failed to fetch post:', postRes.status, postRes.statusText); // Debugging fetch error
          setPost(null);
        }

        const commentsRes = await fetch(`http://localhost:3000/api/posts/${id}/comments`);
        if (commentsRes.ok) {
          const commentsData: Comment[] = await commentsRes.json();
          console.log('Fetched comments data:', commentsData); // Debugging comments data
          setComments(commentsData);
        } else {
          console.error('Failed to fetch comments:', commentsRes.status, commentsRes.statusText); // Debugging fetch error
          setComments([]);
        }
      } catch (error) {
        console.error('Error during fetch in PostDetailPage:', error); // Catching network errors
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || isNaN(parseInt(id))) {
      console.error('Invalid or missing post ID for comment submission:', id); // Debugging invalid ID
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, content: commentContent }),
      });

      if (res.ok) {
        setAuthor('');
        setCommentContent('');
        // Re-fetch comments to update the list
        const commentsRes = await fetch(`http://localhost:3000/api/posts/${id}/comments`);
        if (commentsRes.ok) {
          const commentsData: Comment[] = await commentsRes.json();
          setComments(commentsData);
        } else {
          console.error('Failed to re-fetch comments after submission:', commentsRes.status, commentsRes.statusText);
        }
      } else {
        console.error('Failed to add comment:', res.status, res.statusText); // Debugging API error
        alert('Failed to add comment');
      }
    } catch (error) {
      console.error('Error during comment submission:', error); // Catching network errors
      alert('Failed to add comment');
    }
  };

  if (!post) {
    return <main className="flex min-h-screen flex-col items-center p-24">Loading post...</main>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button onClick={() => router.push('/')} className="mb-8 px-4 py-2 bg-gray-500 text-white rounded">
        Back to Blog
      </button>
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <article className="text-lg mb-8">{post.content}</article>

      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border p-4 rounded-lg">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 border rounded text-black"
            required
          />
          <textarea
            placeholder="Your Comment"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="p-2 border rounded h-24 text-black"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit Comment
          </button>
        </form>
      </div>
    </main>
  );
}
