"use client";

import { useEffect, useState } from "react";
import { LogOut, Mail, User, Shield } from "lucide-react";

type Me = {
  name: string;
  email: string;
  role?: string;
};

export default function AdminProfilePage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && d.user) setMe(d.user);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (loading) {
    return <p className="text-sm text-black/40">Loading profile…</p>;
  }

  if (me === null) {
    return <p className="text-sm text-red-600">Not signed in.</p>;
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Profile</h1>
      <p className="mt-1 text-sm text-black/40">Your admin account</p>

      <div className="mt-8 space-y-4 rounded-2xl border border-black/10 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171717] text-sm font-semibold text-white">
            {(me.name || "A").slice(0, 2).toUpperCase()}
          </span>
          <div>
            <div className="font-semibold">{me.name || "Admin"}</div>
            <div className="text-sm text-black/45">{me.email}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-black/55">
          <Mail size={14} />
          {me.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-black/55">
          <User size={14} />
          {me.name || "-"}
        </div>
        <div className="flex items-center gap-2 text-sm text-black/55">
          <Shield size={14} />
          Role: {me.role || "admin"}
        </div>

        <button
          type="button"
          onClick={logout}
          className="mt-4 flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );
}
