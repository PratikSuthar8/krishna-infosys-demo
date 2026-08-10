"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BlogHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-hero", {
        y: 28, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
      });
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
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 pb-14 pt-16 sm:px-8 lg:px-12 lg:pt-20 xl:px-16">
        <div className="blog-hero flex items-center gap-3">
          <span className="h-px w-8 bg-[#f56616]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
            Blog
          </span>
        </div>
        <h1 className="blog-hero mt-6 max-w-[720px] text-[clamp(2.4rem,5vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
          Field notes from
          <span className="block text-black/30">ELV delivery.</span>
        </h1>
        <p className="blog-hero mt-6 max-w-[480px] text-base leading-7 text-black/55">
          Practical writing on design sequencing, infrastructure and support —
          written for project owners and technical buyers.
        </p>
      </div>
    </section>
  );
}
