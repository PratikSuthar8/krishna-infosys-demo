"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Camera,
  Radio,
  AudioLines,
  Network,
  HousePlug,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  {
    index: "01",
    short: "Security",
    title: "Security & Surveillance",
    href: "/solutions/security-access",
    icon: Camera,
    summary:
      "CCTV, intrusion detection, access control, biometrics and perimeter systems — designed as one defensive layer, not isolated products.",
    points: [
      "IP CCTV & analytics",
      "Access control & biometrics",
      "Intrusion & perimeter",
      "Video door phones",
    ],
  },
  {
    index: "02",
    short: "Communication",
    title: "Communication Systems",
    href: "/solutions/communication",
    icon: Radio,
    summary:
      "EPABX, IP telephony, intercom and campus calling engineered for clarity across floors, wings and sites.",
    points: [
      "IP / hybrid EPABX",
      "Intercom & paging",
      "Hotlines & crisis lines",
      "Campus telephony",
    ],
  },
  {
    index: "03",
    short: "Audio Visual",
    title: "Audio Visual",
    href: "/solutions/audio-visual",
    icon: AudioLines,
    summary:
      "Boardrooms, auditoriums, digital signage and background music — tuned for rooms that get used every day.",
    points: [
      "Meeting rooms & boardrooms",
      "Auditorium & classroom AV",
      "Digital signage",
      "Public address / BGM",
    ],
  },
  {
    index: "04",
    short: "Networking",
    title: "Networking & Data",
    href: "/solutions/networking-data",
    icon: Network,
    summary:
      "Structured cabling, switching and pathways sized for ELV loads — cameras, access, Wi‑Fi and backbone on one plan.",
    points: [
      "Structured copper & fibre",
      "Core / access switching",
      "Rack & pathway design",
      "PoE planning for ELV",
    ],
  },
  {
    index: "05",
    short: "Automation",
    title: "Automation & Safety",
    href: "/solutions/automation-safety",
    icon: HousePlug,
    summary:
      "Fire alarm, emergency voice and life-safety interfaces coordinated with the rest of the ELV stack.",
    points: [
      "Fire detection & alarm",
      "Emergency voice / PA",
      "Safety interfaces",
      "Building automation touch-points",
    ],
  },
];

const LAST = domains.length - 1;

export function AboutDomainsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        // Sit under fixed navbar
        start: "top top+=72",
        end: () => `+=${window.innerHeight * domains.length * 0.9}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (v) => Math.round(v * LAST) / LAST,
          duration: { min: 0.1, max: 0.25 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const idx = Math.min(LAST, Math.max(0, Math.round(self.progress * LAST)));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: self.progress });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    gsap.fromTo(
      stage,
      { autoAlpha: 0.45, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [active]);

  const d = domains[active];
  const Icon = d.icon;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Compact height: fits under navbar in one viewport */}
      <div className="relative mx-auto flex h-[calc(100vh-72px)] max-w-[1500px] flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-16">
        {/* Header — tighter */}
        <div className="max-w-2xl shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#f56616]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f56616]">
              Full ELV systems partner
            </p>
          </div>
          <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.05em]">
            Five domains. One delivery model.
          </h2>
          <p className="mt-2 max-w-[42ch] text-sm leading-6 text-black/50 sm:text-[15px] sm:leading-7">
            Security, communication, AV, networking and automation under a single
            engineering and AMC framework.
          </p>
        </div>

        {/* Pills */}
        <div className="relative mt-7 shrink-0 sm:mt-8">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black/[0.08]" />
          <div
            ref={progressRef}
            className="absolute left-0 top-1/2 h-px w-full origin-left -translate-y-1/2 scale-x-0 bg-[#f56616]"
          />
          <div className="relative flex flex-wrap gap-2 sm:flex-nowrap sm:justify-between">
            {domains.map((item, i) => {
              const on = i === active;
              return (
                <div
                  key={item.index}
                  className={`relative z-[1] flex items-center gap-2 rounded-full border px-2.5 py-1.5 transition-all duration-300 sm:gap-2.5 sm:px-3.5 sm:py-2 ${
                    on
                      ? "border-[#f56616] bg-[#f56616] text-white shadow-[0_10px_28px_-12px_rgba(245,102,22,0.7)]"
                      : "border-black/10 bg-[#f3f1ec] text-black/40"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold sm:h-6 sm:w-6 sm:text-[10px] ${
                      on ? "bg-white/20" : "bg-black/5"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[-0.01em] sm:text-[12px]">
                    {item.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage — flex-1 so it uses remaining space, no overflow crop */}
        <div
          ref={stageRef}
          className="mt-6 grid min-h-0 flex-1 items-center gap-8 lg:mt-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f56616] text-white shadow-[0_12px_28px_-12px_rgba(245,102,22,0.75)]">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                  {d.index} · {d.short}
                </p>
                <p className="text-[11px] text-black/40">Domain focus</p>
              </div>
            </div>

            <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.35rem)] font-medium leading-[1.05] tracking-[-0.045em]">
              {d.title}
            </h3>
            <p className="mt-2.5 max-w-[36rem] text-[13px] leading-6 text-black/55 sm:text-[14px] sm:leading-7">
              {d.summary}
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {d.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 rounded-xl border border-black/[0.05] bg-white/70 px-3.5 py-2 text-[12px] font-medium text-black/70 sm:text-[13px]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f56616]" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={d.href}
                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#171717] transition-colors hover:text-[#f56616]"
              >
                Explore domain
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
                {d.index} / 05
              </span>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[280px] lg:mx-0 lg:block lg:justify-self-end">
            <div className="absolute -inset-3 rounded-[1.75rem] bg-[#f56616]/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-white shadow-[0_28px_60px_-28px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between border-b border-black/[0.05] px-4 py-2.5">
                <span className="text-[10px] font-bold tracking-[0.14em] text-[#f56616]">
                  {d.index}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
                  {d.short}
                </span>
              </div>
              <div className="px-5 py-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f56616] text-white">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <p className="mt-4 text-base font-semibold tracking-[-0.03em]">
                  {d.title}
                </p>
                <p className="mt-2 line-clamp-3 text-[12px] leading-5 text-black/45">
                  {d.summary}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-black/[0.05] px-4 py-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  ELV domain
                </span>
                <Link
                  href={d.href}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-white transition-colors hover:bg-[#f56616]"
                  aria-label={`Open ${d.title}`}
                >
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
