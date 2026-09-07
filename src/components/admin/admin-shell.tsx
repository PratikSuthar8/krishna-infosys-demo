"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  Newspaper,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ExternalLink,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function UserMenu({
  compact,
}: {
  compact?: boolean;
}) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const name = session?.user?.name || "Admin";
  const email = session?.user?.email || "";
  const image = session?.user?.image || null;
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "A";

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className={`relative ${compact ? "" : "px-3 pb-3"}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-black/[0.04] ${open ? "bg-black/[0.04]" : ""
          }`}
        aria-expanded={open}
        aria-label="Account menu"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-black/10"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171717] text-[12px] font-semibold text-white">
            {initials}
          </span>
        )}
        {!compact ? (
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold tracking-[-0.02em]">
              {name}
            </span>
            <span className="block truncate text-[11px] text-black/40">{email}</span>
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          className={`absolute z-50 w-[240px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ${compact
              ? "bottom-0 left-12"
              : "bottom-[calc(100%+8px)] left-3 right-3 w-auto"
            }`}
        >
          <div className="border-b border-black/[0.06] px-4 py-3">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-[12px] text-black/40">{email}</p>
          </div>
          <div className="p-1.5">
            <Link
              href="/admin/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 hover:bg-black/[0.04]"
            >
              <User size={15} />
              View profile
            </Link>
            <Link
              href="/"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 hover:bg-black/[0.04]"
            >
              <ExternalLink size={15} />
              View website
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 hover:bg-black/[0.04]"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function AdminShell({
  children,
  userLabel,
}: {
  children: React.ReactNode;
  userLabel?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active
                ? "bg-[#171717] text-white!"
                : "text-black/55 hover:bg-black/[0.04] hover:text-[#171717]"
              }`}
          >
            <Icon size={17} strokeWidth={1.7} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f3f1ec] text-[#171717]">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-black/[0.06] bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <p className="text-sm font-semibold tracking-[-0.02em]">Admin</p>
        <UserMenu compact />
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[280px] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
                  Krishna Infosys
                </p>
                <p className="text-sm font-semibold">Admin</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
            <div className="border-t border-black/[0.06] pt-2">
              <UserMenu />
            </div>
          </aside>
        </div>
      ) : null}

      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-black/[0.06] bg-white lg:flex xl:w-[260px]">
          <div className="border-b border-black/[0.06] px-5 py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
              Krishna Infosys
            </p>
            <p className="mt-1 text-base font-semibold tracking-[-0.03em]">
              Admin console
            </p>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <NavLinks />
          </div>

          <div className="border-t border-black/[0.06] pt-2">
            <UserMenu />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
