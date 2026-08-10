import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  name?: string;
  organisation?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const name = (body.name ?? "").trim();
    const organisation = (body.organisation ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const interest = (body.interest ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !phone || !interest || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill all required fields." },
        { status: 400 }
      );
    }
    if (!emailOk(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Message is too long." },
        { status: 400 }
      );
    }

    const col = await getCollection("enquiries");
    const doc = {
      name,
      organisation,
      email,
      phone,
      interest,
      message,
      status: "new",
      source: "website",
      createdAt: new Date(),
    };
    const result = await col.insertOne(doc);

    return NextResponse.json({
      ok: true,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
