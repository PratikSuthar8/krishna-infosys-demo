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

export function AboutDomainsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
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

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#f3f1ec] text-[#171717]"
    >
      <div className="flex min-h-[calc(100vh-88px)] flex-col justify-center py-10">
        {/* Header — padded container */}
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
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
                Scroll to move through security, communication, AV, networking
                and automation — one engineering and AMC framework.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 lg:items-end">
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

        {/* Horizontal track — full bleed, GSAP moves x */}
        <div className="mt-8 overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-4 px-5 will-change-transform sm:gap-5 sm:px-8 lg:px-12 xl:px-16"
          >
            {domains.map((d, i) => {
              const Icon = d.icon;
              const on = i === active;
              return (
                <article
                  key={d.index}
                  className={`flex w-[min(85vw,400px)] shrink-0 flex-col rounded-[24px] border p-5 transition-[opacity,box-shadow,border-color] duration-300 sm:w-[420px] sm:p-6 lg:w-[440px] ${
                    on
                      ? "border-black/10 bg-white shadow-[0_20px_56px_rgba(0,0,0,0.08)]"
                      : "border-black/[0.06] bg-white/70 opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                        on
                          ? "bg-[#f56616] text-white"
                          : "bg-black/[0.05] text-[#171717]"
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

                  <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {d.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 rounded-xl bg-[#f3f1ec] px-2.5 py-2 text-[11px] font-semibold text-black/55 sm:text-[12px]"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f56616]" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
                    <Link
                      href={d.href}
                      className="group/l inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#171717] sm:text-[11px]"
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
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
