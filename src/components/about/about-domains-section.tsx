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
      "CCTV, intrusion, access control, biometrics and perimeter — one defensive layer, not isolated products.",
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
      "EPABX, IP telephony, intercom and campus calling engineered for clarity across floors and sites.",
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
      "Boardrooms, auditoriums, digital signage and BGM — tuned for rooms that are used every day.",
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
      "Structured cabling, switching and pathways sized for cameras, access, Wi-Fi and backbone together.",
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
      "Building automation links",
    ],
  },
];

const LAST = domains.length - 1;

type Domain = (typeof domains)[number];

function DomainCard({
  d,
  on,
  className = "",
}: {
  d: Domain;
  on: boolean;
  className?: string;
}) {
  const Icon = d.icon;
  return (
    <article
      className={`flex flex-col rounded-[24px] border p-5 transition-[opacity,box-shadow,border-color] duration-300 sm:p-6 ${
        on
          ? "border-black/10 bg-white shadow-[0_20px_56px_rgba(0,0,0,0.08)]"
          : "border-black/[0.06] bg-white/70 opacity-75"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            on ? "bg-[#f56616] text-white" : "bg-black/[0.05] text-[#171717]"
          }`}
        >
          <Icon size={20} strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
            {d.index} · {d.short}
          </p>
          <h3 className="mt-0.5 text-[1.25rem] font-semibold tracking-[-0.03em] sm:text-[1.35rem]">
            {d.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-6 text-black/48 sm:text-[14px] sm:leading-7">
        {d.summary}
      </p>

      <ul className="mb-5 mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {d.points.map((p) => (
          <li
            key={p}
            className="flex items-center gap-2 rounded-xl bg-[#f3f1ec] px-2.5 py-2 text-[12px] font-semibold text-black/55"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f56616]" />
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t border-black/[0.06] pt-4">
        <Link
          href={d.href}
          className="group/l inline-flex min-h-11 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#171717] sm:text-[11px]"
        >
          Explore domain
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-white transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5">
            <ArrowUpRight size={13} />
          </span>
        </Link>
        <span className="text-[11px] font-semibold tabular-nums text-black/25">
          {d.index}/05
        </span>
      </div>
    </article>
  );
}

export function AboutDomainsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /* Desktop: pinned horizontal track. Same breakpoint + reduced-motion rule as the home page. */
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as {
            desktop?: boolean;
            reduceMotion?: boolean;
          };

          if (!conditions.desktop || conditions.reduceMotion) return;

          const getScrollDistance = () => {
            const pad = 48;
            return Math.max(0, track.scrollWidth - window.innerWidth + pad);
          };

          const tween = gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top+=88",
              end: () => `+=${getScrollDistance() + window.innerHeight * 0.35}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  LAST,
                  Math.max(0, Math.round(self.progress * LAST)),
                );
                if (idx !== activeRef.current) {
                  activeRef.current = idx;
                  setActive(idx);
                }
              },
            },
          });

          const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

          return () => {
            cancelAnimationFrame(frame);
            tween.scrollTrigger?.kill();
            tween.kill();
            activeRef.current = 0;
            setActive(0);
          };
        },
      );

      /* Phones + tablets: stacked cards that reveal as they scroll in (no pin). */
      mm.add(
        {
          compact: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as {
            compact?: boolean;
            reduceMotion?: boolean;
          };

          if (!conditions.compact || conditions.reduceMotion) return;

          gsap.from(".domains-head", {
            y: 38,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".domains-head",
              start: "top 86%",
              once: true,
            },
          });

          gsap.utils
            .toArray<HTMLElement>(".domain-mobile-card")
            .forEach((card) => {
              gsap.from(card, {
                y: 34,
                opacity: 0,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              });
            });
        },
      );
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#f3f1ec] text-[#171717]"
    >
      <div className="py-14 sm:py-20 lg:flex lg:min-h-[calc(100svh-88px)] lg:flex-col lg:justify-center lg:py-10">
        {/* Header — padded container */}
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="domains-head flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[520px]">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#f56616]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
                  Full ELV systems partner
                </span>
              </div>
              <h2 className="mt-3 text-[clamp(1.85rem,3.8vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.04em]">
                Five domains.
                <br />
                One delivery model.
              </h2>
              <p className="mt-3 max-w-[38ch] text-[14px] leading-6 text-black/45 sm:text-[15px] sm:leading-7">
                <span className="lg:hidden">
                  Security, communication, AV, networking and automation — one
                  engineering and AMC framework.
                </span>
                <span className="hidden lg:inline">
                  Scroll to move through security, communication, AV,
                  networking and automation — one engineering and AMC
                  framework.
                </span>
              </p>
            </div>

            <div className="hidden flex-col items-start gap-2 lg:flex lg:items-end">
              <span className="text-[12px] font-semibold tabular-nums tracking-[0.12em] text-black/35">
                <span className="text-[#f56616]">{domains[active].index}</span>
                {" / 05"}
              </span>
              <div className="flex items-center gap-2">
                {domains.map((d, i) => (
                  <span
                    key={d.index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-[#f56616]" : "w-2.5 bg-black/15"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/25">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>

        {/* DESKTOP — horizontal track, full bleed, GSAP moves x */}
        <div className="mt-8 hidden overflow-hidden motion-reduce:overflow-x-auto lg:block">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-12 will-change-transform xl:px-16"
          >
            {domains.map((d, i) => (
              <DomainCard
                key={d.index}
                d={d}
                on={i === active}
                className="w-[440px] shrink-0"
              />
            ))}
          </div>
        </div>

        {/* MOBILE / TABLET — stacked cards, no pin */}
        <div className="mx-auto mt-9 grid max-w-[1500px] gap-4 px-5 sm:grid-cols-2 sm:gap-5 sm:px-8 lg:hidden">
          {domains.map((d) => (
            <DomainCard
              key={d.index}
              d={d}
              on
              className="domain-mobile-card sm:[&:last-child]:col-span-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
