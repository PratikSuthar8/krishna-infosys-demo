"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { DomainConfig } from "@/data/domains";

export function DomainHero({ domain }: { domain: DomainConfig }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".dom-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 })
        .from(".dom-hero-line", { y: 56, opacity: 0, stagger: 0.08, duration: 0.9 }, "-=0.25")
        .from(".dom-hero-copy", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".dom-hero-action", { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".dom-hero-chip", { y: 12, opacity: 0, stagger: 0.05, duration: 0.45 }, "-=0.25");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f3f1ec] pt-[88px] text-[#171717]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.26]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-22 lg:pt-20 xl:px-16">
        <div className="max-w-[900px]">
          <div className="dom-hero-eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-[#f56616]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
              {domain.eyebrow}
            </span>
          </div>
          <h1 className="mt-7">
            <span className="dom-hero-line block overflow-hidden">
              <span className="block text-[clamp(2.5rem,5.4vw,5.4rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                {domain.heroLines[0]}
              </span>
            </span>
            <span className="dom-hero-line block overflow-hidden">
              <span className="block text-[clamp(2.5rem,5.4vw,5.4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black/30">
                {domain.heroLines[1]}
              </span>
            </span>
          </h1>
          <p className="dom-hero-copy mt-8 max-w-[540px] text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
            {domain.heroCopy}
          </p>
          <div className="dom-hero-action mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white! transition-colors duration-300 hover:bg-[#f56616]"
            >
              <span>{domain.heroCta}</span>
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#capabilities"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/55 transition-colors hover:text-[#f56616]"
            >
              View capabilities
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-2.5">
          {domain.systems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="dom-hero-chip inline-flex items-center gap-2.5 border border-black/[0.08] bg-white/85 px-4 py-2.5"
              >
                <Icon size={14} strokeWidth={1.5} className="text-[#f56616]" />
                <span className="text-[12px] font-semibold text-black/70">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
