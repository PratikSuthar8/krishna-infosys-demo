"use client";

import { FormEvent, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const reason = params.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    reason === "idle" ? "Signed out due to inactivity." : "",
  );
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Sign in failed");
      }
      let next = params.get("callbackUrl") || "/admin";
      if (data.mustChangePassword) next = "/admin/change-password";
      else if (data.mfaSetup) next = "/admin/mfa-setup";
      else if (data.mfaRequired) next = "/admin/mfa-verify";
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0f0f0f]">
      {/* Ambient orange */}
      <div
        className="pointer-events-none absolute left-[-20%] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, #f56616 0%, transparent 65%)" }}
      />

      {/* Left — copy only, no fake widgets */}
      <div className="relative hidden w-[48%] flex-col justify-between border-r border-white/[0.06] px-12 py-14 lg:flex xl:px-16">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f56616]">
            Krishna Infosys
          </p>
          <h1 className="mt-10 max-w-[14ch] text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.045em] text-white xl:text-[3.1rem]">
            The command centre behind every project.
          </h1>
          <p className="mt-6 max-w-[32ch] text-[15px] leading-7 text-white/40">
            One place to steer careers, content and conversations — built for
            teams delivering ELV programmes across India.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-8 border-t border-white/[0.07] pt-8">
            {[
              { value: "25+", label: "Years" },
              { value: "2,100+", label: "Projects" },
              { value: "850+", label: "Clients" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[1.5rem] font-semibold tracking-[-0.03em] text-white">
                  {m.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[11px] text-white/25">
            © {new Date().getFullYear()} Krishna Infosys
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-12 sm:px-8">
        <div className="mb-8 text-center lg:hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f56616]">
            Krishna Infosys
          </p>
          <p className="mt-2 text-sm text-white/40">Admin console</p>
        </div>

        <div className="w-full max-w-[400px] rounded-2xl border border-white/[0.08] bg-[#1a1a1a] p-7 sm:p-8">
          <div className="mb-7">
            <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-white">
              Sign in
            </h2>
            <p className="mt-1.5 text-[13px] text-white/40">
              Enter your work email and password.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-white/25 focus:border-[#f56616]/55"
                placeholder="you@krishnainfosys.com"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-white/25 focus:border-[#f56616]/55"
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-[13px] text-red-300">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#f56616] py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#ff7a2e] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-white/40">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
