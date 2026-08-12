"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/blog", label: "Blog" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const logout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-semibold tracking-[-0.02em]">
              KI Admin
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                      active ? "bg-white/10 text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[12px] text-white/40 hover:text-white">
              View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-[12px] font-semibold text-[#f56616]"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-5 py-8">{children}</main>
    </div>
  );
}
