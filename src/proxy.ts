import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") === false) {
    return NextResponse.next();
  }

  if (path.startsWith("/admin/login") || path.startsWith("/admin/change-password") || path.startsWith("/admin/mfa-setup") || path.startsWith("/admin/mfa-verify")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("ki_admin_session")?.value;
  if (token) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("callbackUrl", path);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
