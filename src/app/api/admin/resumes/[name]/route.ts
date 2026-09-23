import { NextResponse } from "next/server";
import {requireAdmin, requirePermission} from "@/lib/admin-auth";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  try {
    await requirePermission("applications:read");
    const { name } = await context.params;
    const safe = String(name || "").replace(/[^a-zA-Z0-9._-]/g, "");
    if (!safe) {
      return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
    }

    const files = await getCollection("resume_files");
    const doc = await files.findOne({ storedName: safe });
    if (!doc || !doc.data) {
      return NextResponse.json({ ok: false, error: "File not found" }, { status: 404 });
    }

    const raw = doc.data.buffer ? Buffer.from(doc.data.buffer) : Buffer.from(doc.data);

    return new NextResponse(raw, {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${doc.originalName || safe}"`,
        "Content-Length": String(raw.length),
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
