import fs from "fs";
import path from "path";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  content: string;
  createdAt: number;
}

export interface Database {
  posts: Post[];
  comments: Comment[];
  nextPostId: number;
  nextCommentId: number;
}

const DB_FILE = path.join(process.cwd(), "blog.db.json");

function readDatabase(): Database {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading database:", error);
  }

  return {
    posts: [],
    comments: [],
    nextPostId: 1,
    nextCommentId: 1,
  };
}

function writeDatabase(db: Database): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error("Error writing database:", error);
    throw error;
  }
}

export const db = {
  getAllPosts(): Post[] {
    const data = readDatabase();
    return data.posts.sort((a, b) => b.createdAt - a.createdAt);
  },

  getPostById(id: number): Post | null {
    const data = readDatabase();
    return data.posts.find((post) => post.id === id) || null;
  },

  createPost(title: string, content: string): Post {
    const data = readDatabase();
    const newPost: Post = {
      id: data.nextPostId,
      title,
      content,
      createdAt: Date.now(),
    };

    data.posts.push(newPost);
    data.nextPostId++;
    writeDatabase(data);

    return newPost;
  },

  getCommentsByPostId(postId: number): Comment[] {
    const data = readDatabase();
    return data.comments
      .filter((comment) => comment.postId === postId)
      .sort((a, b) => a.createdAt - b.createdAt);
  },

  createComment(postId: number, name: string, content: string): Comment {
    const data = readDatabase();
    const newComment: Comment = {
      id: data.nextCommentId,
      postId,
      name,
      content,
      createdAt: Date.now(),
    };

    data.comments.push(newComment);
    data.nextCommentId++;
    writeDatabase(data);

    return newComment;
  },

  resetAllData(): void {
    const emptyData: Database = {
      posts: [],
      comments: [],
      nextPostId: 1,
      nextCommentId: 1,
    };
    writeDatabase(emptyData);
  },
};
