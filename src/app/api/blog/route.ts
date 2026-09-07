import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection("blog_posts");
    // published: true OR field missing (legacy / Atlas manual inserts)
    const posts = await col
      .find({
        $or: [
          { published: true },
          { published: { $exists: false } },
          { published: null },
        ],
      })
      .project({ _id: 0 })
      .sort({ date: -1 })
      .toArray();
    return NextResponse.json({ ok: true, posts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
