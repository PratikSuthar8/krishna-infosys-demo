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

function normalizeList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof v === "string")
    return v
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

export async function GET() {
  try {
    await requireAdmin();
    const col = await getCollection("jobs");
    const items = await col.find({}).sort({ role: 1 }).toArray();
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
    const role = String(body.role || "").trim();
    if (!role) {
      return NextResponse.json({ ok: false, error: "role required" }, { status: 400 });
    }
    const slug = String(body.slug || slugify(role)).trim() || slugify(role);
    const doc = {
      slug,
      role,
      department: String(body.department || "").trim(),
      experience: String(body.experience || "").trim(),
      location: String(body.location || "").trim(),
      type: String(body.type || "Full-time").trim(),
      summary: String(body.summary || "").trim(),
      description: normalizeList(body.description),
      responsibilities: normalizeList(body.responsibilities),
      requirements: normalizeList(body.requirements),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const col = await getCollection("jobs");
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
    const role = String(body.role || "").trim();
    const slug = String(body.slug || slugify(role)).trim();
    const $set: Record<string, unknown> = {
      updatedAt: new Date(),
    };
    if (role) $set.role = role;
    if (slug) $set.slug = slug;
    if (body.department !== undefined) $set.department = String(body.department || "").trim();
    if (body.experience !== undefined) $set.experience = String(body.experience || "").trim();
    if (body.location !== undefined) $set.location = String(body.location || "").trim();
    if (body.type !== undefined) $set.type = String(body.type || "").trim();
    if (body.summary !== undefined) $set.summary = String(body.summary || "").trim();
    if (body.description !== undefined) $set.description = normalizeList(body.description);
    if (body.responsibilities !== undefined)
      $set.responsibilities = normalizeList(body.responsibilities);
    if (body.requirements !== undefined) $set.requirements = normalizeList(body.requirements);

    const col = await getCollection("jobs");
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
    const col = await getCollection("jobs");
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
