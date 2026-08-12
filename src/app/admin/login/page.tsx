"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";

function LoginInner() {
  const params = useSearchParams();
  const error = params.get("error");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    await signIn("microsoft-entra-id", { callbackUrl: "/admin" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111] px-5 text-white">
      <div className="w-full max-w-sm border border-white/10 bg-[#171717] p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
          Krishna Infosys
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Admin login</h1>
        <p className="mt-2 text-sm text-white/40">
          Sign in with your organisation Microsoft account. Access is limited to assigned users.
        </p>

        {error ? (
          <p className="mt-4 text-sm text-red-400">
            Sign-in failed ({error}). You may not be assigned to this application.
          </p>
        ) : null}

        <button
          type="button"
          onClick={onLogin}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 bg-[#f56616] py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : null}
          Sign in with Microsoft
        </button>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#111]" />}>
      <LoginInner />
    </Suspense>
  );
}
