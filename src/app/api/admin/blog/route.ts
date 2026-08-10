import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const col = await getCollection("blog_posts");
  const items = await col.find({}).sort({ date: -1 }).toArray();
  return NextResponse.json({
    ok: true,
    items: items.map((i) => ({ ...i, _id: i._id.toString() })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const title = String(body.title || "").trim();
  if (!title) {
    return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
  }

  const slug = String(body.slug || slugify(title)).trim() || slugify(title);
  const col = await getCollection("blog_posts");
  if (await col.findOne({ slug })) {
    return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
  }

  const bodyLines = Array.isArray(body.body)
    ? body.body.map(String)
    : String(body.body || "")
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean);

  const doc = {
    slug,
    title,
    excerpt: String(body.excerpt || "").trim(),
    category: String(body.category || "Engineering").trim(),
    date: String(body.date || new Date().toISOString().slice(0, 10)),
    readTime: String(body.readTime || "5 min").trim(),
    body: bodyLines,
    published: body.published !== false,
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  const result = await col.insertOne(doc);
  return NextResponse.json({ ok: true, id: result.insertedId.toString(), slug });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const id = String(body.id || "").trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }

  const title = String(body.title || "").trim();
  if (!title) {
    return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
  }

  const slug = String(body.slug || slugify(title)).trim();
  const col = await getCollection("blog_posts");
  const conflict = await col.findOne({
    slug,
    _id: { $ne: new ObjectId(id) },
  });
  if (conflict) {
    return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
  }

  const bodyLines = Array.isArray(body.body)
    ? body.body.map(String)
    : String(body.body || "")
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean);

  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        slug,
        title,
        excerpt: String(body.excerpt || "").trim(),
        category: String(body.category || "Engineering").trim(),
        date: String(body.date || new Date().toISOString().slice(0, 10)),
        readTime: String(body.readTime || "5 min").trim(),
        body: bodyLines,
        published: Boolean(body.published),
        updatedAt: new Date(),
      },
    }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
  }
  const col = await getCollection("blog_posts");
  await col.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
