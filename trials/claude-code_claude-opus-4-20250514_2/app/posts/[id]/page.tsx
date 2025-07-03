'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

interface Comment {
  id: number
  postId: number
  author: string
  content: string
  createdAt: string
}

export default function PostPage() {
  const params = useParams()
  const postId = params.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [postId])

  const fetchPost = async () => {
    const response = await fetch(`/api/posts/${postId}`)
    const data = await response.json()
    setPost(data)
  }

  const fetchComments = async () => {
    const response = await fetch(`/api/comments?postId=${postId}`)
    const data = await response.json()
    setComments(data)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: parseInt(postId),
        author,
        content: comment,
      }),
    })
    
    setAuthor('')
    setComment('')
    fetchComments()
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Link href="/">Back to Blog</Link>
      <h1>{post.title}</h1>
      <article>{post.content}</article>
      
      <h2>Comments</h2>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.author}</strong>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmitComment}>
        <div>
          <label htmlFor="author">Your Name</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}