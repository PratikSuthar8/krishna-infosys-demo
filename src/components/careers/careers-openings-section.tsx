"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { getJobs } from "@/lib/jobs";
import { contact } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

export function CareersOpeningsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const openings = getJobs();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".car-open-intro", {
        y: 32, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".car-open-intro-wrap", start: "top 80%", once: true },
      });
      gsap.from(".car-open-card", {
        y: 36, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power3.out",
        scrollTrigger: { trigger: ".car-open-list", start: "top 82%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="openings" ref={sectionRef} className="relative bg-[#171717] text-white">
      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        <div className="car-open-intro-wrap grid gap-6 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="car-open-intro flex items-center gap-3">
            <span className="h-px w-8 bg-[#f56616]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
              Open roles
            </span>
          </div>
          <div>
            <h2 className="car-open-intro max-w-[640px] text-[clamp(2rem,3.6vw,3.6rem)] font-medium leading-[0.96] tracking-[-0.05em]">
              Current openings
            </h2>
            <p className="car-open-intro mt-4 max-w-[480px] text-base leading-7 text-white/45">
              Select a role for the full description, company details and application path.
              Questions: {contact.email.hr}
            </p>
          </div>
        </div>

        <div className="car-open-list mt-10 space-y-3">
          {openings.map((job) => (
            <article
              key={job.slug}
              className="car-open-card grid gap-6 border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-[#f56616]/35 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f56616]/30 bg-[#f56616]/10 text-[#f56616]">
                    <Briefcase size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">{job.role}</h3>
                    <p className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white/35">
                      {job.department} · {job.experience} · {job.type}
                    </p>
                  </div>
                </div>
                <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-white/50">{job.summary}</p>
                <p className="mt-3 flex items-center gap-2 text-[13px] text-white/40">
                  <MapPin size={14} className="text-[#f56616]" />
                  {job.location}
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href={`/careers/${job.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-[#171717]! transition-colors hover:bg-[#f56616] hover:text-white!"
                >
                  View job
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
