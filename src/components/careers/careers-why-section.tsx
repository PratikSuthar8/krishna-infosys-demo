"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Layers, Rocket, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Rocket,
    title: "Growth-oriented work",
    detail: "Real projects across corporate, industrial, healthcare and hospitality — not desk-only theory.",
  },
  {
    icon: Layers,
    title: "Full ELV stack",
    detail: "Security, communication, AV, networking and automation under one delivery practice.",
  },
  {
    icon: GraduationCap,
    title: "Continuous learning",
    detail: "Work with current OEM platforms and site standards that keep skills market-relevant.",
  },
  {
    icon: Users,
    title: "Team that delivers",
    detail: "ISO-led processes, clear ownership and support from survey through AMC.",
  },
];

export function CareersWhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".car-why", {
        y: 28, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f3f1ec] text-[#171717]">
      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        <div className="car-why flex items-center gap-3">
          <span className="h-px w-8 bg-[#f56616]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
            Why join us
          </span>
        </div>
        <h2 className="car-why mt-6 max-w-[640px] text-[clamp(2rem,3.6vw,3.4rem)] font-medium leading-[0.96] tracking-[-0.05em]">
          Work that ships on site.
        </h2>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="car-why border border-black/[0.08] bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/50">{item.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
