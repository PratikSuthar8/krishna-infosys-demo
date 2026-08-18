"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Briefcase, Mail } from "lucide-react";
import { contact } from "@/lib/contact";
import type { Job } from "@/lib/jobs";

gsap.registerPlugin(ScrollTrigger);

export function CareersOpeningsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openings, setOpenings] = useState<Job[]>([]);
  const [loaded, setLoaded] = useState(false);

  // contact.email is { general, sales, support, hr, ceo }
  const hrMail =
    (contact as { email?: { hr?: string }; hr?: string }).email?.hr ||
    (contact as { hr?: string }).hr ||
    "hr@krishnainfosys.com";


  useEffect(() => {
    let cancelled = false;
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.ok && Array.isArray(d.jobs)) {
          setOpenings(d.jobs);
        } else {
          setOpenings([]);
        }
      })
      .catch(() => {
        if (!cancelled) setOpenings([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(".open-anim", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, [loaded, openings.length]);

  return (
    <section
      id="openings"
      ref={sectionRef}
      className="relative bg-[#171717] text-white"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 xl:px-16">
        <div className="open-anim grid gap-6 border-b border-white/10 pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f56616]">
                Open roles
              </p>
            </div>
          </div>
          <div className="lg:text-right">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-medium tracking-[-0.04em]">
              Current openings
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/45 lg:ml-auto lg:max-w-md">
              Select a role for the full description, company details and
              application path. Questions:{" "}
              <a
                href={`mailto:${hrMail}`}
                className="text-white/70 transition-colors hover:text-[#f56616]"
              >
                {hrMail}
              </a>
            </p>
          </div>
        </div>

        {!loaded ? (
          <div className="open-anim py-20 text-center">
            <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-white/10" />
            <p className="mt-4 text-sm text-white/35">Loading roles…</p>
          </div>
        ) : openings.length === 0 ? (
          <div className="open-anim mx-auto max-w-lg py-16 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Briefcase size={26} strokeWidth={1.5} className="text-[#f56616]" />
            </div>
            <h3 className="mt-7 text-2xl font-medium tracking-[-0.03em]">
              No open roles right now
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/45">
              We don&apos;t have active openings at the moment. Share your profile
              with HR and we&apos;ll reach out when a matching role opens.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${hrMail}?subject=Career%20interest%20—%20Krishna%20Infosys`}
                className="inline-flex items-center gap-2 rounded-full bg-[#f56616] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Mail size={15} />
                Email HR
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                Contact us
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-white/10">
            {openings.map((job) => (
              <li key={job.slug} className="open-anim">
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex flex-col gap-4 py-7 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
                      {job.department || "General"}
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-white transition-colors group-hover:text-[#f56616] sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-white/45">
                      {job.summary}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                    <div className="flex flex-wrap gap-2 text-[11px] text-white/40">
                      {job.location ? (
                        <span className="rounded-full border border-white/10 px-3 py-1">
                          {job.location}
                        </span>
                      ) : null}
                      {job.type ? (
                        <span className="rounded-full border border-white/10 px-3 py-1">
                          {job.type}
                        </span>
                      ) : null}
                      {job.experience ? (
                        <span className="rounded-full border border-white/10 px-3 py-1">
                          {job.experience}
                        </span>
                      ) : null}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/60 transition-colors group-hover:text-[#f56616]">
                      View role
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
