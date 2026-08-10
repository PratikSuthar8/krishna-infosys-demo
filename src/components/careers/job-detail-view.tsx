"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Clock,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import type { Job } from "@/lib/jobs";
import { contact, mailTo } from "@/lib/contact";

type Company = {
  name: string;
  tagline: string;
  legalStatus: string;
  hq: string;
  operationalAddress: string;
  website: string;
  about: string[];
  highlights: string[];
};

export function JobDetailView({
  job,
  company,
}: {
  job: Job;
  company: Company;
}) {
  const applyHref = `${mailTo("hr")}?subject=${encodeURIComponent(
    `Application — ${job.role}`
  )}`;

  return (
    <section className="bg-[#f3f1ec] pt-[88px] text-[#171717]">
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/50 transition-colors hover:text-[#f56616]"
        >
          <ArrowLeft size={14} />
          All openings
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:gap-14">
          {/* MAIN */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                {job.department}
              </span>
            </div>

            <h1 className="mt-5 text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.05em]">
              {job.role}
            </h1>

            <div className="mt-5 flex flex-wrap gap-4 text-[13px] text-black/50">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-[#f56616]" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-[#f56616]" />
                {job.experience} · {job.type}
              </span>
            </div>

            <p className="mt-8 text-lg leading-8 text-black/55">{job.summary}</p>

            <div className="mt-12 space-y-10">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em]">About the role</h2>
                <div className="mt-4 space-y-4">
                  {job.description.map((p) => (
                    <p key={p.slice(0, 40)} className="text-[15px] leading-7 text-black/55">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em]">Responsibilities</h2>
                <ul className="mt-4 space-y-2.5">
                  {job.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-7 text-black/55"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f56616]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em]">Requirements</h2>
                <ul className="mt-4 space-y-2.5">
                  {job.requirements.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-7 text-black/55"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f56616]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href={applyHref}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white! transition-colors hover:bg-[#f56616] hover:text-[#171717]!"
              >
                Apply for this role
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-[13px] font-semibold text-black/70 transition-colors hover:border-black/30"
              >
                Back to openings
              </Link>
            </div>
          </div>

          {/* SIDEBAR — company + apply */}
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-black/10 bg-white p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                  <Building2 size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-base font-semibold tracking-[-0.02em]">{company.name}</p>
                  <p className="text-[12px] text-black/40">{company.tagline}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-[13px] leading-6 text-black/55">
                {company.about.map((p) => (
                  <p key={p.slice(0, 28)}>{p}</p>
                ))}
              </div>

              <ul className="mt-5 space-y-2 border-t border-black/10 pt-5">
                {company.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-[13px] font-medium text-black/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f56616]" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-1 border-t border-black/10 pt-5 text-[12px] leading-5 text-black/45">
                <p>{company.legalStatus}</p>
                <p>{company.hq}</p>
                <p>{company.operationalAddress}</p>
              </div>
            </div>

            <div className="border border-black/10 bg-[#171717] p-6 text-white sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
                Apply
              </p>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Send your CV to HR with the role name in the subject line.
              </p>
              <a
                href={applyHref}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#f56616] px-5 py-3.5 text-[13px] font-semibold text-white! transition-colors hover:bg-white hover:text-[#171717]!"
              >
                Apply now
                <ArrowUpRight size={14} />
              </a>
              <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-[13px] text-white/55">
                <a href={mailTo("hr")} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail size={14} className="text-[#f56616]" />
                  {contact.email.hr}
                </a>
                <a href={contact.phone.href} className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone size={14} className="text-[#f56616]" />
                  {contact.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
