"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Mail, User, Shield } from "lucide-react";

export default function AdminProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-black/10" />
      </div>
    );
  }

  const user = session?.user;
  const name = user?.name || "Admin user";
  const email = user?.email || "—";
  const image = user?.image || null;
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
          Account
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          Profile
        </h1>
        <p className="mt-2 text-sm leading-6 text-black/45">
          Your identity is managed by Microsoft Entra ID. Changes to name or password
          are made in your organisation directory.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col gap-5 border-b border-black/[0.06] bg-[#faf9f7] px-6 py-6 sm:flex-row sm:items-center">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              className="h-16 w-16 rounded-2xl object-cover ring-1 ring-black/10"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#171717] text-lg font-semibold text-white">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold tracking-[-0.03em]">{name}</p>
            <p className="truncate text-sm text-black/45">{email}</p>
          </div>
        </div>

        <div className="divide-y divide-black/[0.06]">
          <div className="flex items-start gap-3 px-6 py-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/45">
              <User size={16} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
                Display name
              </p>
              <p className="mt-1 text-sm font-medium">{name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-6 py-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/45">
              <Mail size={16} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
                Email
              </p>
              <p className="mt-1 text-sm font-medium">{email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-6 py-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] text-black/45">
              <Shield size={16} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
                Access
              </p>
              <p className="mt-1 text-sm font-medium">Admin · Microsoft Entra ID</p>
              <p className="mt-1 text-[12px] leading-5 text-black/40">
                Only users assigned to the Krishna Infosys Admin app in Azure can sign
                in here.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-black/[0.06] px-6 py-5">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#171717] transition-colors hover:border-black/20"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
