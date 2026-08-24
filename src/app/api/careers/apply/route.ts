import { NextResponse } from "next/server";
import { Binary } from "mongodb";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const jobSlug = String(form.get("jobSlug") || "").trim();
    const jobRole = String(form.get("jobRole") || "").trim();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const message = String(form.get("message") || "").trim();
    const resume = form.get("resume");

    if (!name || !email || !phone || !jobSlug) {
      return NextResponse.json(
        { ok: false, error: "Name, email, phone and job are required." },
        { status: 400 },
      );
    }
    if (!emailOk(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }
    if (!resume || typeof resume !== "object" || !("arrayBuffer" in resume)) {
      return NextResponse.json(
        { ok: false, error: "Resume is required (PDF or Word, max 5MB)." },
        { status: 400 },
      );
    }

    const file = resume as File;
    if (!file.size) {
      return NextResponse.json(
        { ok: false, error: "Resume is required (PDF or Word, max 5MB)." },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "Resume must be under 5MB." }, { status: 400 });
    }
    const mime = file.type || "application/octet-stream";
    if (mime && !ALLOWED.has(mime) && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      return NextResponse.json(
        { ok: false, error: "Only PDF or Word resumes are accepted." },
        { status: 400 },
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const storedName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const files = await getCollection("resume_files");
    const fileDoc = await files.insertOne({
      storedName,
      originalName: file.name,
      mimeType: mime,
      size: file.size,
      data: new Binary(buf),
      createdAt: new Date(),
    });

    const applications = await getCollection("applications");
    const result = await applications.insertOne({
      jobSlug,
      jobRole,
      name,
      email,
      phone,
      linkedin: linkedin || null,
      message: message || null,
      resume: {
        originalName: file.name,
        storedName,
        mimeType: mime,
        size: file.size,
        fileId: fileDoc.insertedId,
      },
      status: "new",
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true, id: String(result.insertedId) });
  } catch (e) {
    console.error("careers/apply", e);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
