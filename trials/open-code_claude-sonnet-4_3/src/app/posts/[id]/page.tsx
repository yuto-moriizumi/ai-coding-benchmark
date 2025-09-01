import Link from 'next/link';
import { db } from '@/lib/db';
import { posts, comments } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import { CommentForm } from '@/components/CommentForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  
  if (isNaN(postId)) {
    notFound();
  }

  const [post] = await db.select().from(posts).where(eq(posts.id, postId));
  
  if (!post) {
    notFound();
  }

  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);

  async function addComment(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const content = formData.get('content') as string;
    
    if (!name || !content) return;
    
    await db.insert(comments).values({
      postId,
      name,
      content,
      createdAt: new Date(),
    });
    
    redirect(`/posts/${postId}`);
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-500 hover:underline"
        >
          Back to Blog
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      
      <article className="prose max-w-none mb-8">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        
        <CommentForm onSubmit={addComment} />
        
        <div className="space-y-4 mt-8">
          {postComments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-lg">
              <div className="font-semibold">{comment.name}</div>
              <div className="text-gray-600 text-sm mb-2">
                {comment.createdAt.toLocaleDateString()}
              </div>
              <div className="whitespace-pre-wrap">{comment.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}