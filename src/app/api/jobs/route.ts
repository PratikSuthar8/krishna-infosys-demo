import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const col = await getCollection("jobs");
    // published: true OR missing (seed / legacy docs)
    const jobs = await col
      .find({
        $or: [
          { published: true },
          { published: { $exists: false } },
          { published: null },
        ],
      })
      .project({ _id: 0 })
      .sort({ role: 1 })
      .toArray();
    return NextResponse.json({ ok: true, jobs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
