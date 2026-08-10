"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export function CareersHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".car-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 })
        .from(".car-hero-line", { y: 48, opacity: 0, stagger: 0.08, duration: 0.85 }, "-=0.25")
        .from(".car-hero-copy", { y: 18, opacity: 0, duration: 0.55 }, "-=0.35")
        .from(".car-hero-action", { y: 14, opacity: 0, duration: 0.45 }, "-=0.25");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f3f1ec] pt-[88px] text-[#171717]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.24]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, black 45%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-22 lg:pt-20 xl:px-16">
        <div className="max-w-[820px]">
          <div className="car-hero-eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-[#f56616]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
              Careers
            </span>
          </div>
          <h1 className="mt-7">
            <span className="car-hero-line block overflow-hidden">
              <span className="block text-[clamp(2.4rem,5vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                Build systems that
              </span>
            </span>
            <span className="car-hero-line block overflow-hidden">
              <span className="block text-[clamp(2.4rem,5vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.055em] text-black/30">
                keep sites safe and connected.
              </span>
            </span>
          </h1>
          <p className="car-hero-copy mt-7 max-w-[520px] text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
            Krishna Infosys is hiring people who care about clean engineering,
            on-site delivery and long-term client trust — across projects, sales
            and technical roles.
          </p>
          <div className="car-hero-action mt-9 flex flex-wrap gap-4">
            <a
              href="#openings"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white! transition-colors hover:bg-[#f56616] hover:text-[#171717]!"
            >
              View openings
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/55 transition-colors hover:text-[#f56616]"
            >
              About the company
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
