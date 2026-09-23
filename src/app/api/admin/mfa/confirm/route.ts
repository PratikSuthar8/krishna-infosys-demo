import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import {
  createSessionToken,
  getPreauthEmail,
  getSessionEmail,
  preauthCookieName,
  sessionCookieOptions,
} from "@/lib/admin-auth";
import { verifyTotp } from "@/lib/mfa";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const email = (await getPreauthEmail()) || (await getSessionEmail());
    if (!email) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const code = String(body.code || "").trim();
    const col = await getCollection("admin_users");
    const user = await col.findOne({ email: email.toLowerCase() });
    if (!user || !user.mfaSecretPending) {
      return NextResponse.json(
        { ok: false, error: "Start MFA setup again." },
        { status: 400 },
      );
    }
    if (!verifyTotp(code, user.mfaSecretPending)) {
      return NextResponse.json({ ok: false, error: "Invalid code." }, { status: 400 });
    }
    await col.updateOne(
      { _id: user._id },
      {
        $set: {
          mfaSecret: user.mfaSecretPending,
          mfaEnabled: true,
          updatedAt: new Date(),
        },
        $unset: { mfaSecretPending: "" },
      },
    );
    const token = createSessionToken(email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(sessionCookieOptions(token));
    res.cookies.set({ name: preauthCookieName(), value: "", path: "/", maxAge: 0 });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
