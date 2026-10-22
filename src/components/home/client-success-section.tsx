"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  KeyRound,
  MessageSquareMore,
  Network,
  Radio,
  Wifi,
  Flame,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type CaseSystem = {
  label: string;
  icon: typeof Camera;
};

type CaseStudy = {
  id: string;
  caseNo: string;
  clientLine1: string;
  clientLine2: string;
  clientLine3?: string;
  division?: string;
  location: string;
  engagement: string;
  sector: string;
  challengeTitle: string;
  challengeBody: string;
  response: string;
  outcomeLabel: string;
  outcomeValue: string;
  outcomeUnit?: string;
  outcomeCaption: string;
  outcomeNote: string;
  demonstrates: string;
  systems: CaseSystem[];
};

const cases: CaseStudy[] = [
  {
    id: "ramdev",
    caseNo: "01",
    clientLine1: "Ramdev Food",
    clientLine2: "Products",
    clientLine3: "Private Limited",
    division: "Snacks Division · Namkeen Unit",
    location: "Chiyada Plant · Gujarat",
    engagement: "Multi-system ELV",
    sector: "Manufacturing",
    challengeTitle: "Engineering around a live-site constraint.",
    challengeBody:
      "With structural work already complete and no existing ELV drawings, Krishna Infosys engineered the ELV environment around actual site conditions and coordinated multiple technology systems into one integrated infrastructure.",
    response:
      "A complete ELV environment designed from scratch and coordinated around real construction conditions.",
    outcomeLabel: "Reported outcome / 2025",
    outcomeValue: "10%",
    outcomeCaption: "Complaint rate compared with their other plant",
    outcomeNote:
      "The case study reports significantly lower complaint incidence alongside one of the cleanest ELV installations in the client's portfolio.",
    demonstrates: "Engineering quality measured in operation, not presentation.",
    systems: [
      { label: "CCTV", icon: Camera },
      { label: "EPABX", icon: MessageSquareMore },
      { label: "Public Address", icon: Radio },
      { label: "Access Control", icon: KeyRound },
      { label: "Networking", icon: Network },
      { label: "Wi-Fi", icon: Wifi },
    ],
  },
  {
    id: "sterling",
    caseNo: "02",
    clientLine1: "Sterling Addlife",
    clientLine2: "India Pvt. Ltd.",
    division: "Clinical campuses",
    location: "Ahmedabad · Gujarat",
    engagement: "Zoned PA programme",
    sector: "Healthcare",
    challengeTitle: "Clear paging without disrupting care zones.",
    challengeBody:
      "Hospital and clinic floors needed reliable public-address coverage with zone control — so announcements reach the right wing without flooding quiet or critical areas.",
    response:
      "Zoned PA architecture with paging discipline suited to clinical operations and emergency use.",
    outcomeLabel: "Programme focus",
    outcomeValue: "Zone",
    outcomeCaption: "Controlled coverage across clinical environments",
    outcomeNote:
      "Delivery focused on intelligible paging, zone integrity and maintenance access rather than device count alone.",
    demonstrates: "Healthcare ELV that respects clinical workflow.",
    systems: [
      { label: "Public Address", icon: Radio },
      { label: "Networking", icon: Network },
    ],
  },
  {
    id: "lt",
    caseNo: "03",
    clientLine1: "Larsen & Toubro",
    clientLine2: "Limited",
    division: "Operational sites",
    location: "Infrastructure programmes",
    engagement: "Surveillance support",
    sector: "Infrastructure",
    challengeTitle: "Visibility across active operational sites.",
    challengeBody:
      "Site teams needed dependable surveillance coverage coordinated with site movement, power availability and practical maintenance paths — not a catalogue install.",
    response:
      "Camera layout and recording support engineered for operational sites and handover clarity.",
    outcomeLabel: "Delivery model",
    outcomeValue: "Site",
    outcomeCaption: "Surveillance aligned to live operations",
    outcomeNote:
      "Emphasis on coverage that matches how the site actually runs, with clear documentation for the client team.",
    demonstrates: "Infrastructure CCTV built around site reality.",
    systems: [{ label: "CCTV", icon: Camera }],
  },
  {
    id: "nippon",
    caseNo: "04",
    clientLine1: "Nippon Express",
    clientLine2: "(India) Pvt. Ltd.",
    division: "Logistics operations",
    location: "India operations",
    engagement: "Voice + network",
    sector: "Logistics",
    challengeTitle: "Communication that keeps logistics moving.",
    challengeBody:
      "Warehouse and office operations required stable internal voice with structured cabling that could carry day-to-day traffic and grow with the site.",
    response:
      "EPABX deployment paired with structured networking for operational continuity.",
    outcomeLabel: "Systems linked",
    outcomeValue: "2",
    outcomeCaption: "EPABX and structured network under one programme",
    outcomeNote:
      "Voice and data pathways planned together so expansion does not force a second rewire cycle.",
    demonstrates: "Logistics ELV that supports throughput, not just desks.",
    systems: [
      { label: "EPABX", icon: MessageSquareMore },
      { label: "Networking", icon: Network },
    ],
  },
  {
    id: "stelvio",
    caseNo: "05",
    clientLine1: "Stelvio",
    clientLine2: "Healthcare LLP",
    division: "Integrated campus ELV",
    location: "Healthcare facility",
    engagement: "Multi-system ELV",
    sector: "Healthcare",
    challengeTitle: "One campus, several life-safety systems.",
    challengeBody:
      "Fire detection, surveillance, EPABX and cabling had to land as one coordinated environment rather than four disconnected vendors on the same floors.",
    response:
      "Integrated fire, CCTV, EPABX and structured cabling under a single delivery sequence.",
    outcomeLabel: "Systems in scope",
    outcomeValue: "4+",
    outcomeCaption: "Fire, surveillance, voice and network",
    outcomeNote:
      "Single-team coordination reduced interface gaps between fire, security and communication packages.",
    demonstrates: "True multi-system ELV under one accountability line.",
    systems: [
      { label: "Fire Alarm", icon: Flame },
      { label: "CCTV", icon: Camera },
      { label: "EPABX", icon: MessageSquareMore },
      { label: "Networking", icon: Network },
    ],
  },
];

export function ClientSuccessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const animatingRef = useRef(false);
  const total = cases.length;
  const current = cases[active];

  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    animatingRef.current = animating;
  }, [animating]);

  const transitionTo = useCallback((next: number, dir: -1 | 1 = 1) => {
    if (animatingRef.current) return;
    if (next === activeRef.current) return;
    setAnimating(true);
    animatingRef.current = true;
    const el = panelRef.current;
    // dir 1 (next): exit left, enter from right
    // dir -1 (prev): exit right, enter from left
    const exitX = dir > 0 ? -48 : 48;
    const enterX = dir > 0 ? 48 : -48;
    if (el) {
      gsap.to(el, {
        x: exitX,
        opacity: 0,
        duration: 0.32,
        ease: "power2.in",
        onComplete: () => {
          setActive(next);
          activeRef.current = next;
          gsap.fromTo(
            el,
            { x: enterX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.42,
              ease: "power3.out",
              onComplete: () => {
                setAnimating(false);
                animatingRef.current = false;
              },
            },
          );
        },
      });
    } else {
      setActive(next);
      activeRef.current = next;
      setAnimating(false);
      animatingRef.current = false;
    }
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = (activeRef.current + dir + total) % total;
      transitionTo(next, dir);
    },
    [total, transitionTo],
  );

  // Autoplay every 6s — pause on hover / when tab hidden
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (document.hidden || animatingRef.current) return;
      const next = (activeRef.current + 1) % total;
      transitionTo(next, 1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, total, transitionTo]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".success-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
        <div className="success-reveal mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
              Client outcomes
            </p>
            <h2 className="mt-2 max-w-[420px] text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-[-0.035em]">
              Engineering measured on site.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] tabular-nums text-black/40">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous case"
                onClick={() => go(-1)}
                disabled={animating}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#171717] transition-colors hover:border-[#f56616]/40 hover:text-[#f56616] disabled:opacity-40"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next case"
                onClick={() => go(1)}
                disabled={animating}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#171717] transition-colors hover:border-[#f56616]/40 hover:text-[#f56616] disabled:opacity-40"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="success-reveal overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
          }}
        >
        <div ref={panelRef} className="will-change-transform">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)_minmax(0,0.85fr)]">
            {/* LEFT — client */}
            <div className="flex flex-col bg-[#171717] p-7 text-white sm:p-8 lg:p-9">
              <div className="flex items-start justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                  Case / {current.caseNo}
                </p>
              </div>

              <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Featured client
              </p>
              <h3 className="mt-3 text-[clamp(1.6rem,2.8vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.04em]">
                <span className="text-white">{current.clientLine1} </span>
                <span className="text-[#f56616]">{current.clientLine2}</span>
                {current.clientLine3 ? (
                  <>
                    <br />
                    <span className="text-white/70">{current.clientLine3}</span>
                  </>
                ) : null}
              </h3>

              {current.division ? (
                <p className="mt-3 text-[13px] text-white/45">{current.division}</p>
              ) : null}
              <p className="mt-4 flex items-center gap-2 text-[12px] text-white/40">
                <span className="inline-block h-px w-6 bg-[#f56616]" />
                {current.location}
              </p>

              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                  Engagement
                </p>
                <p className="mt-1.5 text-[14px] font-medium text-white/80">
                  {current.engagement}
                </p>
              </div>
            </div>

            {/* CENTER — challenge */}
            <div className="flex flex-col border-b border-black/6 p-7 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f56616]">
                  Engineering challenge
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  {current.sector}
                </p>
              </div>
              <div className="mt-3 h-px w-full bg-black/8" />

              <h4 className="mt-6 text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-[1.15] tracking-[-0.035em]">
                {current.challengeTitle}
              </h4>
              <p className="mt-4 text-[14px] leading-7 text-black/50">
                {current.challengeBody}
              </p>

              <div className="mt-6 border-l-2 border-[#f56616] pl-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                  Engineering response
                </p>
                <p className="mt-1.5 text-[14px] leading-6 text-[#171717]">
                  {current.response}
                </p>
              </div>

              <div className="mt-8 border-t border-black/8 pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                    Integrated scope
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/25">
                    {String(current.systems.length).padStart(2, "0")} systems
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {current.systems.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="flex items-center gap-2.5 text-[12px] font-medium text-[#171717]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f1ec] text-[#171717]">
                          <Icon size={14} strokeWidth={1.7} />
                        </span>
                        {s.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT — outcome */}
            <div className="flex flex-col p-7 sm:p-8 lg:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                {current.outcomeLabel}
              </p>
              <div className="mt-5 flex items-start gap-3">
                <span className="mt-1 inline-block h-12 w-[3px] shrink-0 bg-[#f56616] sm:h-16" />
                <div>
                  <p className="text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-[#171717]">
                    {current.outcomeValue}
                  </p>
                  <p className="mt-3 max-w-[200px] text-[11px] font-semibold uppercase leading-4 tracking-[0.1em] text-black/40">
                    {current.outcomeCaption}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[13px] leading-6 text-black/45">
                {current.outcomeNote}
              </p>
              <div className="mt-auto border-t border-black/8 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
                  What this demonstrates
                </p>
                <p className="mt-2 text-[15px] font-medium leading-snug tracking-[-0.02em] text-[#171717]">
                  {current.demonstrates}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Dots + portfolio link */}
        <div className="success-reveal mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {cases.map((c, i) => (
              <button
                key={c.id}
                type="button"
                aria-label={`Go to case ${c.caseNo}`}
                onClick={() => {
                  if (i === active || animating) return;
                  transitionTo(i, i > active ? 1 : -1);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-8 bg-[#f56616]"
                    : "w-1.5 bg-black/15 hover:bg-black/30"
                }`}
              />
            ))}
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#171717]"
          >
            Explore full project index
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#f56616] transition-all group-hover:border-[#f56616]/35 group-hover:bg-[#f56616] group-hover:text-white">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
