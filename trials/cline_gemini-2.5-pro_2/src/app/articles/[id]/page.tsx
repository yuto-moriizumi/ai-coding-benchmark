'use client';

import { useState, useEffect } from 'react';
import { articles, comments } from '@/db/schema';
import { useRouter } from 'next/navigation';

type Article = typeof articles.$inferSelect & {
  comments: (typeof comments.$inferSelect)[];
};

export default function ArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`/api/articles/${params.id}`)
      .then((res) => res.json())
      .then(setArticle);
  }, [params.id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/articles/${params.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: comment }),
    });
    setComment('');
    // Refresh the article data to show the new comment
    fetch(`/api/articles/${params.id}`)
      .then((res) => res.json())
      .then(setArticle);
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>

      <h2>Comments</h2>
      <ul>
        {article.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <h3>Add a comment</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Join the conversation"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
