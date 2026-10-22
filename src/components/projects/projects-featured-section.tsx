"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { featuredClients } from "@/data/clients";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsFeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cases = featuredClients.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-a", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
      gsap.from(".feat-card", {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feat-grid",
          start: "top 84%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative bg-[#171717] text-white"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[520px]">
            <p className="feat-a text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
              Featured programmes
            </p>
            <h2 className="feat-a mt-3 text-[clamp(1.75rem,3vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.045em]">
              Named clients. Delivered systems.
            </h2>
          </div>
          <Link
            href="#index"
            className="feat-a group inline-flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
          >
            Full index
            <ArrowUpRight
              size={14}
              className="text-[#f56616] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="feat-grid mt-10 grid gap-3 sm:grid-cols-2">
          {cases.map((c, i) => (
            <article
              key={c.id}
              className="feat-card group flex flex-col rounded-lg border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.05] sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f56616]">
                  {c.sector}
                </span>
                <span className="text-[11px] tabular-nums text-white/30">
                  {c.yearEnd ? `${c.year}–${c.yearEnd}` : c.year}
                </span>
              </div>

              <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.025em]">
                {c.name}
              </h3>

              <p className="mt-2 flex-1 text-[13px] leading-6 text-white/40">
                {c.summary}
              </p>

              <p className="mt-4 border-t border-white/[0.08] pt-3 text-[11px] leading-5 text-white/35">
                {c.systems.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
