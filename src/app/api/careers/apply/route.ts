import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
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
    const message = String(form.get("message") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const resume = form.get("resume");

    if (!jobSlug || !name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name, email, phone and job are required." },
        { status: 400 }
      );
    }
    if (!emailOk(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!resume || typeof resume !== "object" || !("arrayBuffer" in resume)) {
      return NextResponse.json(
        { ok: false, error: "Resume is required (PDF or Word, max 5MB)." },
        { status: 400 }
      );
    }

    const file = resume as File;
    if (!file.size) {
      return NextResponse.json(
        { ok: false, error: "Resume is required (PDF or Word, max 5MB)." },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Resume must be under 5MB." },
        { status: 400 }
      );
    }
    const mime = file.type || "application/octet-stream";
    if (!ALLOWED.has(mime)) {
      return NextResponse.json(
        { ok: false, error: "Resume must be PDF or Word (.pdf, .doc, .docx)." },
        { status: 400 }
      );
    }
    const ext =
      mime === "application/pdf"
        ? ".pdf"
        : mime === "application/msword"
          ? ".doc"
          : ".docx";
    const safeSlug = jobSlug.replace(/[^a-z0-9-]/gi, "");
    const storedName = `${Date.now()}-${safeSlug}${ext}`;
    const dir = path.join(process.cwd(), "uploads", "resumes");
    await mkdir(dir, { recursive: true });
    const fullPath = path.join(dir, storedName);
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(fullPath, buf);
    const resumeMeta = {
      originalName: file.name,
      storedName,
      mimeType: mime,
      size: file.size,
      path: `uploads/resumes/${storedName}`,
    };

    const col = await getCollection("applications");
    const result = await col.insertOne({
      jobSlug,
      jobRole,
      name,
      email,
      phone,
      message,
      linkedin,
      resume: resumeMeta,
      status: "new",
      source: "website",
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true, id: result.insertedId.toString() });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
