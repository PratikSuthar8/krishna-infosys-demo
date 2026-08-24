import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const col = await getCollection("enquiries");
    const items = await col.find({}).sort({ createdAt: -1 }).limit(200).toArray();
    return NextResponse.json({
      ok: true,
      items: items.map((i) => ({ ...i, _id: i._id.toString() })),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const id = String(body.id || "");
    const status = String(body.status || "");
    if (!id || !status) {
      return NextResponse.json(
        { ok: false, error: "id and status required" },
        { status: 400 },
      );
    }
    const col = await getCollection("enquiries");
    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } },
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
