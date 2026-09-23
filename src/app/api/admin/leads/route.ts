import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import {requireAdmin, requirePermission} from "@/lib/admin-auth";
import { isLeadStatus, type LeadStatus } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await requirePermission("leads:read");
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const q = (searchParams.get("q") || "").trim();

    const filter: Record<string, unknown> = {};
    if (status && isLeadStatus(status)) filter.status = status;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ];
    }

    const col = await getCollection("leads");
    const items = await col
      .find(filter)
      .sort({ updatedAt: -1, createdAt: -1 })
      .limit(500)
      .toArray();

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
    await requirePermission("leads:write");
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "name and email required" },
        { status: 400 },
      );
    }
    const status: LeadStatus = isLeadStatus(String(body.status || ""))
      ? (body.status as LeadStatus)
      : "new";

    const doc = {
      name,
      email,
      phone: String(body.phone || "").trim() || null,
      company: String(body.company || "").trim() || null,
      source: String(body.source || "manual").trim() || "manual",
      interest: String(body.interest || "").trim() || null,
      message: String(body.message || "").trim() || null,
      status,
      value: typeof body.value === "number" ? body.value : null,
      notes: [] as { text: string; createdAt: Date; author?: string }[],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const col = await getCollection("leads");
    const result = await col.insertOne(doc);
    return NextResponse.json({ ok: true, id: String(result.insertedId) });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requirePermission("leads:write");
    const body = await request.json();
    const id = String(body.id || body._id || "").trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
    }

    const $set: Record<string, unknown> = { updatedAt: new Date() };
    for (const key of ["name", "email", "phone", "company", "source", "interest", "message"] as const) {
      if (body[key] !== undefined) $set[key] = String(body[key] || "").trim() || null;
    }
    if (body.status !== undefined) {
      if (!isLeadStatus(String(body.status))) {
        return NextResponse.json({ ok: false, error: "invalid status" }, { status: 400 });
      }
      $set.status = body.status;
    }
    if (body.value !== undefined) {
      $set.value = typeof body.value === "number" ? body.value : null;
    }

    const col = await getCollection("leads");

    if (body.note && String(body.note).trim()) {
      await col.updateOne(
        { _id: new ObjectId(id) },
        {
          $set,
          $push: {
            notes: {
              text: String(body.note).trim(),
              createdAt: new Date(),
              author: String(body.author || "admin").trim(),
            },
          },
        } as never,
      );
    } else {
      await col.updateOne({ _id: new ObjectId(id) }, { $set });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requirePermission("leads:write");
    const body = await request.json().catch(() => ({}));
    const id = String(body.id || body._id || "").trim();
    if (!id) {
      return NextResponse.json({ ok: false, error: "id required" }, { status: 400 });
    }
    const col = await getCollection("leads");
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
