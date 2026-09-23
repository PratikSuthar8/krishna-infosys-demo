"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function MfaSetupPage() {
  const router = useRouter();
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/mfa/setup", { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok) throw new Error(d.error || "Failed");
        setQr(d.qr);
        setSecret(d.secret);
      })
      .catch((e) => setError(e.message || "Failed"))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/mfa/confirm", {
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
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f1ec] px-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-black/[0.06] bg-white p-8 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
          Two-factor authentication
        </p>
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">
          Set up Microsoft Authenticator
        </h1>
        <ol className="list-decimal space-y-1 pl-4 text-sm text-black/55">
          <li>Open Microsoft Authenticator</li>
          <li>Add account → Other account</li>
          <li>Scan this QR code</li>
          <li>Enter the 6-digit code below</li>
        </ol>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-black/40" />
          </div>
        ) : (
          <>
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt="MFA QR code" className="mx-auto h-[220px] w-[220px]" />
            ) : null}
            <p className="break-all text-center font-mono text-[11px] text-black/40">
              Manual key: {secret}
            </p>
            <form onSubmit={onSubmit} className="space-y-3">
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-center text-lg tracking-[0.3em] outline-none focus:border-[#f56616]"
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                Verify and continue
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
