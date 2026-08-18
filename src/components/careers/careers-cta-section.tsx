"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { contact, mailTo } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

export function CareersCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".car-cta", {
        y: 32, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".car-cta", start: "top 88%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#171717] text-white">
      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        <div className="car-cta border border-white/10 bg-[#f3f1ec] p-8 text-[#171717] sm:p-12 lg:p-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
            Applications
          </span>
          <h2 className="mt-5 max-w-[560px] text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            Send your CV. We read every application.
          </h2>
          <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-black/50">
            Email HR with the role in the subject line. For open-ended interest,
            tell us the discipline you want to grow in.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={mailTo("hr")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white! transition-colors hover:bg-[#f56616]"
            >
              <Mail size={15} />
              {contact.email.hr}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={contact.phone.href}
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/55 transition-colors hover:text-[#f56616]"
            >
              <Phone size={14} />
              {contact.phone.display}
            </a>
          </div>
          <div className="mt-10 border-t border-black/10 pt-6">
            <Link href="/contact" className="text-[13px] font-semibold text-black/50 transition-colors hover:text-[#f56616]">
              General company contact →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
