import { NextResponse } from "next/server";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const all = db.select().from(posts).orderBy(desc(posts.createdAt)).all();
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const body = await req.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "").trim();
  if (!title || !content) {
    return NextResponse.json({ error: "title and content required" }, { status: 400 });
  }
  const result = db.insert(posts).values({ title, content }).run();
  const id = Number(result.lastInsertRowid);
  return NextResponse.json({ id }, { status: 201 });
}
