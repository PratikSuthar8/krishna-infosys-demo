import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeBody(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof v === "string")
    return v
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

export async function GET() {
  try {
    await requireAdmin();
    const col = await getCollection("blog_posts");
    const items = await col.find({}).sort({ date: -1 }).toArray();
    return NextResponse.json({
      ok: true,
      items: items.map((i) => ({ ...i, _id: i._id.toString() })),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ ok: false, error: "title required" }, { status: 400 });
    }
    const slug = String(body.slug || slugify(title)).trim() || slugify(title);
    const doc = {
      slug,
      title,
      excerpt: String(body.excerpt || "").trim(),
      category: String(body.category || "Engineering").trim(),
      date: String(body.date || new Date().toISOString().slice(0, 10)),
      readTime: String(body.readTime || "5 min").trim(),
      body: normalizeBody(body.body),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const col = await getCollection("blog_posts");
    const existing = await col.findOne({ slug });
    if (existing) {
      return NextResponse.json({ ok: false, error: "slug already exists" }, { status: 409 });
    }
    const result = await col.insertOne(doc);
    return NextResponse.json({ ok: true, id: String(result.insertedId), slug });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const id = String(body.id || body._id || "").trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
    }
    const $set: Record<string, unknown> = { updatedAt: new Date() };
    if (body.title !== undefined) $set.title = String(body.title || "").trim();
    if (body.slug !== undefined) $set.slug = String(body.slug || "").trim();
    if (body.excerpt !== undefined) $set.excerpt = String(body.excerpt || "").trim();
    if (body.category !== undefined) $set.category = String(body.category || "").trim();
    if (body.date !== undefined) $set.date = String(body.date || "").trim();
    if (body.readTime !== undefined) $set.readTime = String(body.readTime || "").trim();
    if (body.body !== undefined) $set.body = normalizeBody(body.body);

    const col = await getCollection("blog_posts");
    await col.updateOne({ _id: new ObjectId(id) }, { $set });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json().catch(() => ({}));
    const id = String(body.id || body._id || "").trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
    }
    const col = await getCollection("blog_posts");
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
