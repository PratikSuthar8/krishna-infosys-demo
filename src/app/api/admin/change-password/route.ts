import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import {
  getSessionEmail,
  hashPassword,
  verifyPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { ok: false, error: "Current and new password required." },
        { status: 400 },
      );
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { ok: false, error: "New password must be at least 8 characters." },
        { status: 400 },
      );
    }
    if (newPassword === currentPassword) {
      return NextResponse.json(
        { ok: false, error: "New password must be different." },
        { status: 400 },
      );
    }

    const col = await getCollection("admin_users");
    const user = await col.findOne({ email: email.toLowerCase() });
    if (!user || user.active === false) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const ok = await verifyPassword(currentPassword, user.passwordHash || "");
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect." },
        { status: 400 },
      );
    }

    await col.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordHash: await hashPassword(newPassword),
          mustChangePassword: false,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
