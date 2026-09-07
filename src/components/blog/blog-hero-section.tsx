"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BlogHeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-hero-line", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-black/[0.06] bg-[#f3f1ec] pt-[100px] pb-14 sm:pt-[120px] sm:pb-16"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        <p className="blog-hero-line text-[10px] font-bold uppercase tracking-[0.22em] text-[#f56616]">
          Insights
        </p>
        <h1 className="blog-hero-line mt-3 max-w-2xl text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#171717]">
          Field notes on ELV systems
        </h1>
        <p className="blog-hero-line mt-4 max-w-xl text-[15px] leading-7 text-black/50 sm:text-base">
          Practical writing on design sequencing, infrastructure and support for
          project owners and technical buyers.
        </p>
      </div>
    </section>
  );
}
