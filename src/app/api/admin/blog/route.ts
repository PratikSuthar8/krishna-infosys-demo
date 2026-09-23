import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import {requireAdmin, requirePermission} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** HTML string from rich editor, or legacy string[] paragraphs */
function normalizeBody(v: unknown): string | string[] {
  if (typeof v === "string") {
    const s = v.trim();
    // rich HTML from TipTap
    if (s.startsWith("<")) return s;
    // plain text fallback → keep as single HTML paragraph block later
    return s;
  }
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  return "";
}

function errResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Error";
  const status = message === "Unauthorized" ? 401 : message === "Forbidden" ? 403 : 500;
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function GET() {
  try {
    await requirePermission("blog:read");
    const col = await getCollection("blog_posts");
    const items = await col.find({}).sort({ date: -1 }).toArray();
    return NextResponse.json({
      ok: true,
      items: items.map((i) => ({ ...i, _id: i._id.toString() })),
    });
  } catch (error) {
    return errResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await requirePermission("blog:write");
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
      category: String(body.category || "").trim(),
      date: String(body.date || new Date().toISOString().slice(0, 10)).trim(),
      readTime: String(body.readTime || "5 min").trim(),
      body: normalizeBody(body.body),
      published: body.published !== false,
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
  } catch (error) {
    return errResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requirePermission("blog:write");
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
    if (body.published !== undefined) $set.published = body.published !== false;

    const col = await getCollection("blog_posts");
    await col.updateOne({ _id: new ObjectId(id) }, { $set });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await requirePermission("blog:write");
    const url = new URL(request.url);
    let id = url.searchParams.get("id") || "";
    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = String(body.id || body._id || "").trim();
    }
    if (!id) {
      return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
    }
    const col = await getCollection("blog_posts");
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errResponse(error);
  }
}
