import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    const ping = await db.command({ ping: 1 });
    const collections = await db.listCollections().toArray();
    return NextResponse.json({
      ok: true,
      database: db.databaseName,
      ping,
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
