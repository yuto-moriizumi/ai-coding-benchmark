"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const handleReset = async () => {
    await fetch("/api/reset", { method: "POST" });
    getPosts().then(setPosts);
  };

  return (
    <main>
      <h1>Blog</h1>
      <Link href="/posts">See all posts</Link>
      <form action={handleReset}>
        <button>Reset data</button>
      </form>
      <Link href="/new-post">Add new article</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
