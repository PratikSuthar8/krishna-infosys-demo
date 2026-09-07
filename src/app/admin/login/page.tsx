"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";

function LoginInner() {
  const params = useSearchParams();
  const error = params.get("error");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    await signIn("microsoft-entra-id", {
      callbackUrl: "/admin",
      prompt: "select_account",
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#f3f1ec] px-5 text-[#171717]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f56616]">
            Krishna Infosys
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
            Admin console
          </h1>
          <p className="mt-2 text-sm leading-6 text-black/45">
            Sign in with your organisation Microsoft account. Access is limited to
            assigned users.
          </p>
        </div>
        <div className="rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-[#faf9f7] px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
              <ShieldCheck size={18} strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[-0.02em]">Microsoft Entra ID</p>
              <p className="text-[12px] text-black/40">SSO · assigned users only</p>
            </div>
          </div>
          {error ? (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Sign-in failed ({error}). You may not be assigned to this application.
            </p>
          ) : null}
          <button
            type="button"
            onClick={onLogin}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Redirecting…
              </>
            ) : (
              "Continue with Microsoft"
            )}
          </button>
          <p className="mt-5 text-center text-[11px] leading-5 text-black/35">
            By continuing you agree to use this console only for authorised company
            operations.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f3f1ec]">
          <div className="h-8 w-8 animate-pulse rounded-full bg-black/10" />
        </main>
      }
    >
      <LoginInner />
    </Suspense>
  );
}
