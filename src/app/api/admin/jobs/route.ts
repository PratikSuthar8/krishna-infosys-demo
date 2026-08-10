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
  const col = await getCollection("jobs");
  const items = await col.find({}).sort({ role: 1 }).toArray();
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
  const role = String(body.role || "").trim();
  if (!role) {
    return NextResponse.json({ ok: false, error: "Role is required" }, { status: 400 });
  }

  const slug = String(body.slug || slugify(role)).trim() || slugify(role);
  const col = await getCollection("jobs");
  const exists = await col.findOne({ slug });
  if (exists) {
    return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
  }

  const doc = {
    slug,
    role,
    department: String(body.department || "").trim(),
    experience: String(body.experience || "").trim(),
    location: String(body.location || "").trim(),
    type: String(body.type || "Full-time").trim(),
    summary: String(body.summary || "").trim(),
    description: Array.isArray(body.description)
      ? body.description.map(String)
      : String(body.description || "")
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
    responsibilities: Array.isArray(body.responsibilities)
      ? body.responsibilities.map(String)
      : String(body.responsibilities || "")
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
    requirements: Array.isArray(body.requirements)
      ? body.requirements.map(String)
      : String(body.requirements || "")
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
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

  const role = String(body.role || "").trim();
  if (!role) {
    return NextResponse.json({ ok: false, error: "Role is required" }, { status: 400 });
  }

  const slug = String(body.slug || slugify(role)).trim();
  const col = await getCollection("jobs");

  const conflict = await col.findOne({
    slug,
    _id: { $ne: new ObjectId(id) },
  });
  if (conflict) {
    return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
  }

  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        slug,
        role,
        department: String(body.department || "").trim(),
        experience: String(body.experience || "").trim(),
        location: String(body.location || "").trim(),
        type: String(body.type || "Full-time").trim(),
        summary: String(body.summary || "").trim(),
        description: Array.isArray(body.description)
          ? body.description.map(String)
          : String(body.description || "")
              .split("\n")
              .map((s: string) => s.trim())
              .filter(Boolean),
        responsibilities: Array.isArray(body.responsibilities)
          ? body.responsibilities.map(String)
          : String(body.responsibilities || "")
              .split("\n")
              .map((s: string) => s.trim())
              .filter(Boolean),
        requirements: Array.isArray(body.requirements)
          ? body.requirements.map(String)
          : String(body.requirements || "")
              .split("\n")
              .map((s: string) => s.trim())
              .filter(Boolean),
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
  const col = await getCollection("jobs");
  await col.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
