import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import {
  createPreauthToken,
  createSessionToken,
  ensureBootstrapAdmin,
  preauthCookieOptions,
  sessionCookieOptions,
  sessionCookieName,
  preauthCookieName,
  verifyPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await ensureBootstrapAdmin();
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password required." },
        { status: 400 },
      );
    }

    const col = await getCollection("admin_users");
    const user = await col.findOne({ email });
    if (!user || user.active === false) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password." },
        { status: 401 },
      );
    }
    const ok = await verifyPassword(password, user.passwordHash || "");
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const mustChangePassword = user.mustChangePassword === true;
    const mfaEnabled = user.mfaEnabled === true;

    // Need password change first — full session allowed only on change-password page flow
    if (mustChangePassword) {
      const token = createSessionToken(email);
      const res = NextResponse.json({
        ok: true,
        mustChangePassword: true,
        mfaEnabled,
        mfaRequired: false,
        user: { email: user.email, name: user.name, role: user.role || "admin" },
      });
      res.cookies.set(sessionCookieOptions(token));
      res.cookies.set({ name: preauthCookieName(), value: "", path: "/", maxAge: 0 });
      return res;
    }

    // MFA: preauth only until TOTP verified
    if (mfaEnabled) {
      const pre = createPreauthToken(email);
      const res = NextResponse.json({
        ok: true,
        mustChangePassword: false,
        mfaEnabled: true,
        mfaRequired: true,
        user: { email: user.email, name: user.name, role: user.role || "admin" },
      });
      res.cookies.set(preauthCookieOptions(pre));
      res.cookies.set({ name: sessionCookieName(), value: "", path: "/", maxAge: 0 });
      return res;
    }

    // No MFA yet → force setup (preauth)
    const pre = createPreauthToken(email);
    const res = NextResponse.json({
      ok: true,
      mustChangePassword: false,
      mfaEnabled: false,
      mfaRequired: true,
      mfaSetup: true,
      user: { email: user.email, name: user.name, role: user.role || "admin" },
    });
    res.cookies.set(preauthCookieOptions(pre));
    res.cookies.set({ name: sessionCookieName(), value: "", path: "/", maxAge: 0 });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
