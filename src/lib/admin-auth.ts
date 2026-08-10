import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "ki_admin_session";

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret";
}

export function signSession(payload: string) {
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return verifySession(jar.get(COOKIE)?.value);
}

export function sessionCookieValue() {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  return signSession(String(exp));
}

export function sessionCookieName() {
  return COOKIE;
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  if (password.length !== expected.length) {
    // still compare to reduce trivial timing issues
    try {
      timingSafeEqual(Buffer.from(password.padEnd(expected.length)), Buffer.from(expected));
    } catch {
      /* ignore */
    }
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return password === expected;
  }
}
