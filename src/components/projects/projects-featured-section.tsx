"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Building2,
  Factory,
  HeartPulse,
  Truck,
} from "lucide-react";
import { featuredClients } from "@/data/clients";

gsap.registerPlugin(ScrollTrigger);

const iconBySector: Record<string, typeof Truck> = {
  Logistics: Truck,
  Healthcare: HeartPulse,
  Manufacturing: Factory,
  "Food & Beverage": Factory,
  Infrastructure: Building2,
  Corporate: Building2,
  Education: Building2,
  Banking: Building2,
  "Real Estate": Building2,
  Residential: Building2,
  Pharma: HeartPulse,
};

export function ProjectsFeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cases = featuredClients.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-intro", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feat-intro-wrap",
          start: "top 80%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".feat-case").forEach((el) => {
        gsap.from(el.querySelectorAll(".feat-reveal"), {
          y: 32,
          opacity: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            once: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#171717] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 94%, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-22 xl:px-16">
        <div className="feat-intro-wrap max-w-[640px]">
          <p className="feat-intro text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
            Featured programmes
          </p>
          <h2 className="feat-intro mt-4 text-[clamp(1.85rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.045em]">
            Named clients. Real systems. Operational delivery.
          </h2>
          <p className="feat-intro mt-5 max-w-[480px] text-[15px] leading-7 text-white/45">
            A sample of logistics, healthcare, manufacturing and campus work —
            drawn from delivered programmes, not stock placeholders.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {cases.map((c, i) => {
            const Icon = iconBySector[c.sector] || Building2;
            const accent = i === 0;
            return (
              <article
                key={c.id}
                className={`feat-case border p-6 sm:p-8 ${
                  accent
                    ? "border-[#f56616]/40 bg-[#f56616]/[0.06]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="feat-reveal flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f56616]">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                </div>
                <p className="feat-reveal mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f56616]">
                  {c.name} · {c.sector}
                </p>
                <h3 className="feat-reveal mt-3 text-[1.35rem] font-medium leading-snug tracking-[-0.03em]">
                  {c.summary}
                </h3>
                <div className="feat-reveal mt-5 flex flex-wrap gap-2">
                  {c.systems.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/55"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="feat-reveal mt-4 text-[12px] text-white/35">
                  {c.yearEnd ? `${c.year}–${c.yearEnd}` : `${c.year}`}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="#index"
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
          >
            Full project index
            <ArrowUpRight
              size={14}
              className="text-[#f56616] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
