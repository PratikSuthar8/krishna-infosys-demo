"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";
import type { DomainConfig } from "@/data/domains";

gsap.registerPlugin(ScrollTrigger);

export function DomainApproach({ domain }: { domain: DomainConfig }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dom-apr-intro", {
        y: 36, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".dom-apr-intro-wrap", start: "top 80%", once: true },
      });
      gsap.from(".dom-apr-card", {
        y: 32, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".dom-apr-principles", start: "top 82%", once: true },
      });
      gsap.from(".dom-apr-phase", {
        y: 28, opacity: 0, duration: 0.65, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".dom-apr-phases", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, transparent, black 8%, black 94%, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        <div className="dom-apr-intro-wrap grid gap-8 border-b border-black/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
          <div className="dom-apr-intro">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">Approach</span>
            </div>
          </div>
          <div>
            <h2 className="dom-apr-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
              {domain.approachIntro.title}
              <span className="block text-black/30">{domain.approachIntro.subtitle}</span>
            </h2>
            <p className="dom-apr-intro mt-5 max-w-[520px] text-base leading-7 text-black/50">
              {domain.approachIntro.copy}
            </p>
          </div>
        </div>
        <div className="dom-apr-principles mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {domain.principles.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="dom-apr-card border border-black/[0.08] bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/50">{item.detail}</p>
              </article>
            );
          })}
        </div>
        <div className="dom-apr-phases mt-16 border border-black/10 bg-white lg:mt-20">
          <div className="border-b border-black/10 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#f56616]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                {domain.phasesTitle}
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {domain.phases.map((phase, index) => (
              <div
                key={phase.number}
                className={`dom-apr-phase border-black/10 px-6 py-7 sm:px-7 ${
                  index % 2 === 1 ? "sm:border-l" : ""
                } ${index >= 2 ? "border-t lg:border-t-0" : ""} lg:border-l lg:first:border-l-0`}
              >
                <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#f56616]">
                  {phase.number}
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{phase.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/50">{phase.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
