'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    setPosts(data)
  }

  const handleReset = async () => {
    await fetch('/api/reset', { method: 'POST' })
    fetchPosts()
  }

  return (
    <div>
      <h1>Blog</h1>
      <div>
        <Link href="/new-post">
          <button>Add new article</button>
        </Link>
        <button onClick={handleReset}>Reset data</button>
      </div>
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <h2>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.content.substring(0, 100)}...</p>
          </article>
        ))}
      </div>
    </div>
  )
}