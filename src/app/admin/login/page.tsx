"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Login failed");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111] px-5 text-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-white/10 bg-[#171717] p-8"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
          Krishna Infosys
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Admin login</h1>
        <p className="mt-2 text-sm text-white/40">Protected area for enquiries and content.</p>

        <label className="mt-8 block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Password
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#f56616]/50"
            autoComplete="current-password"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 bg-[#f56616] py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : null}
          Sign in
        </button>
      </form>
    </main>
  );
}
