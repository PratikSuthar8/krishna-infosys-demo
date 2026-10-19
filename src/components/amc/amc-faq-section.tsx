"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { amcFaqs } from "@/data/amc-faqs";

export function AmcFaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-black/[0.06] bg-[#f3f1ec] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8 lg:px-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c44a08]">
          AMC questions
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-4xl">
          Clear answers before you commit.
        </h2>
        <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-black/50">
          Practical points clients ask when moving from break-fix to planned ELV
          maintenance.
        </p>

        <div className="mt-10 divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {amcFaqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-semibold leading-snug text-[#171717] sm:text-base">
                    {item.question}
                  </span>
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#171717]">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {isOpen ? (
                  <p className="pb-5 pr-12 text-[14px] leading-7 text-black/55 sm:text-[15px]">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#171717] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#f56616]"
          >
            Request an AMC discussion
          </Link>
          <Link
            href="/solutions/security-access"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-[13px] font-semibold text-[#171717] transition-colors hover:border-[#f56616]/40 hover:text-[#f56616]"
          >
            CCTV & access systems
          </Link>
        </div>
      </div>
    </section>
  );
}
