"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function MfaVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Invalid code");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f1ec] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl border border-black/[0.06] bg-white p-8 shadow-sm"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
          Two-factor authentication
        </p>
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">
          Enter authenticator code
        </h1>
        <p className="text-sm text-black/45">
          Open Microsoft Authenticator and enter the 6-digit code for Krishna Infosys Admin.
        </p>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          required
          autoFocus
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-center text-lg tracking-[0.3em] outline-none focus:border-[#f56616]"
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          Verify
        </button>
      </form>
    </div>
  );
}
