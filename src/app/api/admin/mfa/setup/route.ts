import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { getPreauthEmail, getSessionEmail } from "@/lib/admin-auth";
import { buildOtpauthUrl, generateMfaSecret, qrDataUrl } from "@/lib/mfa";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const email = (await getPreauthEmail()) || (await getSessionEmail());
    if (!email) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const secret = generateMfaSecret();
    const col = await getCollection("admin_users");
    await col.updateOne(
      { email: email.toLowerCase() },
      { $set: { mfaSecretPending: secret, updatedAt: new Date() } },
    );
    const url = buildOtpauthUrl(email, secret);
    const qr = await qrDataUrl(url);
    return NextResponse.json({
      ok: true,
      secret,
      qr,
      otpauthUrl: url,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
