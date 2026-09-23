"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Newspaper,
  ContactRound,
  LogOut,
  Menu,
  X,
  ExternalLink,
  User,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IdleLogout } from "@/components/admin/idle-logout";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/leads", label: "Leads", icon: ContactRound },
  { href: "/admin/users", label: "Users", icon: Users },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

type Me = { name: string; email: string; role?: string };

function UserMenu() {
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState<Me | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && d.user) setMe(d.user);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node) === false) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const name = me?.name || "Admin";
  const email = me?.email || "";
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  const logout = async () => {
    setOpen(false);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div ref={ref} className="relative px-3 pb-3">
      {open ? (
        <div
          className="absolute bottom-[calc(100%+8px)] left-3 right-3 z-50 overflow-hidden rounded-2xl border border-black/10 bg-white py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
          role="menu"
        >
          <Link
            href="/admin/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mx-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#171717] transition-colors hover:bg-black/[0.04]"
          >
            <User size={15} className="shrink-0 text-black/45" />
            Profile
          </Link>
          <div className="my-1 border-t border-black/[0.06]" />
          <button
            type="button"
            role="menuitem"
            onClick={logout}
            className="mx-1 flex w-[calc(100%-8px)] items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={15} className="shrink-0" />
            Sign out
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className={`flex w-full items-center gap-3 rounded-2xl border px-2.5 py-2 text-left transition-colors ${
          open
            ? "border-black/10 bg-black/[0.03]"
            : "border-transparent hover:border-black/10 hover:bg-black/[0.03]"
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[11px] font-semibold tracking-wide text-white">
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold leading-tight text-[#171717]">
            {name}
          </span>
          <span className="mt-0.5 block truncate text-[11px] leading-tight text-black/40">
            {email || "Signed in"}
          </span>
        </span>
      </button>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && d.user) setMe(d.user);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f6f5f2] text-[#171717]">
      <IdleLogout idleMs={15 * 60 * 1000} />
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-black/10 bg-white lg:flex">
        <div className="border-b border-black/10 px-4 py-4">
          <Link href="/admin" className="block">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f56616]">
              Krishna Infosys
            </span>
            <span className="mt-0.5 block truncate text-[15px] font-semibold tracking-[-0.02em]">
              {me?.name || "Admin"}
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-[#171717] !text-white hover:bg-[#171717] hover:!text-white [&_svg]:!text-white"
                    : "text-black/55 hover:bg-black/[0.04] hover:text-black"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} className="shrink-0 text-current" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-black/10 pt-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mx-3 mb-1 flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] text-black/40 hover:bg-black/[0.04] hover:text-black/70"
          >
            <ExternalLink size={14} />
            View site
          </a>
          <UserMenu />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 hover:bg-black/[0.04]"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="text-[13px] font-semibold">Admin</span>
          <span className="w-9" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[260px] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
              <span className="text-[13px] font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 hover:bg-black/[0.04]"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 space-y-0.5 p-3">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium ${
                      active
                        ? "bg-[#171717] !text-white hover:!text-white [&_svg]:!text-white"
                        : "text-black/60"
                    }`}
                  >
                    <Icon size={16} className="shrink-0 text-current" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <UserMenu />
          </div>
        </div>
      ) : null}
    </div>
  );
}
