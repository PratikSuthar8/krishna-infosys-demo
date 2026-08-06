"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import type { DomainConfig } from "@/data/domains";
import { contact, mailTo } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

export function DomainCta({ domain }: { domain: DomainConfig }) {
  const sectionRef = useRef<HTMLElement>(null);
  const Icon = domain.cta.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dom-cta", {
        y: 36, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".dom-cta", start: "top 88%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#171717] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        <div className="dom-cta relative overflow-hidden border border-white/10 bg-[#f3f1ec] text-[#171717]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16 lg:px-14 lg:py-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                  {domain.cta.eyebrow}
                </span>
              </div>
              <h2 className="mt-6 max-w-[620px] text-[clamp(2rem,3.4vw,3.4rem)] font-medium leading-[1] tracking-[-0.05em]">
                {domain.cta.title}
                <span className="block text-black/30">{domain.cta.subtitle}</span>
              </h2>
              <p className="mt-6 max-w-[460px] text-[15px] leading-7 text-black/50">{domain.cta.copy}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white! transition-colors duration-300 hover:bg-[#f56616]"
                >
                  <span>Request consultation</span>
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/solutions"
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/50 transition-colors hover:text-[#f56616]"
                >
                  All solutions
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            <div className="border-t border-black/10 pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">Direct contact</span>
              <div className="mt-5 space-y-4">
                <a href={contact.phone.href} className="flex items-center gap-3 text-sm text-black/55 transition-colors hover:text-[#171717]">
                  <Phone size={15} className="text-[#f56616]" />
                  {contact.phone.display}
                </a>
                <a href={mailTo("general")} className="flex items-center gap-3 text-sm text-black/55 transition-colors hover:text-[#171717]">
                  <Mail size={15} className="text-[#f56616]" />
                  {contact.email.general}
                </a>
              </div>
              <div className="mt-8 border-t border-black/10 pt-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">Related</span>
                <div className="mt-4 flex flex-col gap-2.5">
                  {domain.related.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 transition-colors hover:text-[#f56616]"
                    >
                      {item.label}
                      <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
