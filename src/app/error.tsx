"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f3f1ec] px-5 text-center text-[#171717]">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
        Something went wrong
      </p>
      <h1 className="mt-3 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-black/50">
        Try again, or go back home. If it keeps happening, contact us.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#171717] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
