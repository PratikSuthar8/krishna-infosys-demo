"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Cable,
    Cctv,
    Check,
    Network,
    Radio,
    Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const domains = [
    {
        id: "security",
        number: "01",
        label: "Security",
        title: "Security & Surveillance",
        summary:
            "CCTV, intrusion, access control, biometrics and perimeter — layered as one defensive system with clear monitoring and response paths.",
        points: [
            "IP CCTV & video analytics",
            "Access control & biometrics",
            "Intrusion alarm systems",
            "Boom barriers & perimeter",
            "Video door phones",
            "Central monitoring / VMS",
        ],
        icon: Cctv,
    },
    {
        id: "communication",
        number: "02",
        label: "Communication",
        title: "Communication Systems",
        summary:
            "Voice and announcement infrastructure for daily operations — EPABX / IP PBX, intercom, PA and conferencing under one design.",
        points: [
            "EPABX / IP PBX",
            "Public address (PA)",
            "Intercom systems",
            "Video conferencing",
            "Nurse call (healthcare)",
            "Paging & zones",
        ],
        icon: Radio,
    },
    {
        id: "av",
        number: "03",
        label: "Audio Visual",
        title: "Audio Visual Systems",
        summary:
            "Boardrooms, auditoriums, digital signage and video walls — image, sound and control engineered for reliability and simple operation.",
        points: [
            "Boardroom & meeting AV",
            "Video walls & LED",
            "Digital signage",
            "Switching & control",
            "Audio reinforcement",
            "Presentation systems",
        ],
        icon: Sparkles,
    },
    {
        id: "networking",
        number: "04",
        label: "Networking",
        title: "Networking Infrastructure",
        summary:
            "The backbone under every ELV layer — structured cabling, switching and wireless sized for cameras, voice, AV and automation traffic.",
        points: [
            "Structured cabling",
            "Enterprise switching",
            "Wi-Fi survey & design",
            "Rack & backbone",
            "PoE planning",
            "Network security basics",
        ],
        icon: Network,
    },
    {
        id: "automation",
        number: "05",
        label: "Automation",
        title: "Building Automation",
        summary:
            "Lighting, climate and scene control for homes, offices and mixed-use — integrated with security and AV where the brief demands it.",
        points: [
            "Home automation",
            "Lighting control",
            "Climate integration",
            "Scene & schedule logic",
            "Central dashboards",
            "Occupancy-driven control",
        ],
        icon: Cable,
    },
];

export function SolutionsDomainsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const chaptersWrapRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const chapterRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const chaptersWrap = chaptersWrapRef.current;
        const rail = railRef.current;
        if (!section || !chaptersWrap) return;

        const ctx = gsap.context(() => {
            gsap.from(".sol-chap-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".sol-chap-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            // Pin the rail for the full height of chapters (desktop only)
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                if (!rail) return;

                ScrollTrigger.create({
                    trigger: chaptersWrap,
                    start: "top top+=110",
                    end: "bottom bottom-=80",
                    pin: rail,
                    pinSpacing: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                });
            });

            // Spy each chapter
            chapterRefs.current.forEach((el, i) => {
                if (!el) return;

                ScrollTrigger.create({
                    trigger: el,
                    start: "top 45%",
                    end: "bottom 45%",
                    onEnter: () => setActiveIndex(i),
                    onEnterBack: () => setActiveIndex(i),
                });

                gsap.from(el.querySelectorAll(".chap-reveal"), {
                    y: 28,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.05,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        once: true,
                    },
                });
            });

            // Refresh after layout (Lenis / fonts)
            requestAnimationFrame(() => ScrollTrigger.refresh());
        }, section);

        return () => ctx.revert();
    }, []);

    const scrollToChapter = (index: number) => {
        const el = chapterRefs.current[index];
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <section
            id="domains"
            ref={sectionRef}
            className="relative bg-[#171717] text-white"
        >
            {/* grid — absolute, does NOT clip sticky/pin */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 8%, black 94%, transparent)",
                }}
            />

            {/* INTRO */}
            <div className="sol-chap-intro-wrap relative mx-auto max-w-[1500px] px-5 pb-12 pt-20 sm:px-8 lg:px-12 lg:pb-16 lg:pt-24 xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                    <div className="sol-chap-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Domains
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="sol-chap-intro max-w-[860px] text-[clamp(2.3rem,4.2vw,4.4rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Five domains.
                            <span className="block text-white/35">
                                One integrated practice.
                            </span>
                        </h2>
                        <p className="sol-chap-intro mt-5 max-w-[520px] text-base leading-7 text-white/45">
                            Scroll the chapters — or jump from the rail. Each domain is built
                            to connect with the others, not sit as a siloed product line.
                        </p>
                    </div>
                </div>
            </div>

            {/* CHAPTERS + RAIL */}
            <div className="relative mx-auto max-w-[1500px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28 xl:px-16">
                <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[240px_1fr] xl:gap-16">
                    {/* RAIL — pinned by GSAP on desktop */}
                    {/* RAIL */}
                    <div className="relative hidden lg:block">
                        <div ref={railRef} className="w-[260px] xl:w-[280px]">
                            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                                Index
                            </span>

                            <nav className="mt-6 space-y-1.5 border-l border-white/10">
                                {domains.map((d, i) => {
                                    const on = i === activeIndex;
                                    return (
                                        <button
                                            key={d.id}
                                            type="button"
                                            onClick={() => scrollToChapter(i)}
                                            className={`flex w-full items-center gap-3.5 border-l-2 py-3.5 pl-5 text-left transition-all duration-300 ${on
                                                ? "-ml-px border-[#f56616] text-white"
                                                : "border-transparent text-white/40 hover:text-white/75"
                                                }`}
                                        >
                                            <span
                                                className={`font-mono text-[12px] tracking-[0.14em] ${on ? "text-[#f56616]" : "text-white/30"
                                                    }`}
                                            >
                                                {d.number}
                                            </span>
                                            <span
                                                className={`text-[15px] font-semibold tracking-[-0.02em] ${on ? "text-white" : ""
                                                    }`}
                                            >
                                                {d.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>

                            <div className="mt-10 border-t border-white/10 pt-6">
                                <span className="font-mono text-[13px] text-white/40">
                                    {String(activeIndex + 1).padStart(2, "0")}
                                    <span className="mx-2 text-white/20">/</span>
                                    05
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CHAPTER LIST */}
                    <div ref={chaptersWrapRef}>
                        {domains.map((domain, i) => {
                            const Icon = domain.icon;
                            const isActive = i === activeIndex;

                            return (
                                <article
                                    key={domain.id}
                                    id={domain.id}
                                    ref={(el) => {
                                        chapterRefs.current[i] = el;
                                    }}
                                    className={`relative border-t border-white/[0.08] py-14 lg:py-20 ${i === domains.length - 1 ? "border-b border-white/[0.08]" : ""
                                        }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-0 top-8 select-none text-[clamp(5rem,12vw,9rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.03]"
                                    >
                                        {domain.number}
                                    </span>

                                    <div className="relative grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
                                        <div>
                                            <div className="chap-reveal flex items-center gap-3">
                                                <span
                                                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-500 ${isActive
                                                        ? "border-[#f56616] bg-[#f56616] text-white"
                                                        : "border-white/15 bg-white/[0.03] text-white/50"
                                                        }`}
                                                >
                                                    <Icon size={20} strokeWidth={1.45} />
                                                </span>
                                                <div>
                                                    <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                                        {domain.number} · {domain.label}
                                                    </span>
                                                    <span className="mt-0.5 block text-[11px] text-white/35">
                                                        ELV domain
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="chap-reveal mt-8 text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.045em]">
                                                {domain.title}
                                            </h3>

                                            <p className="chap-reveal mt-5 max-w-[420px] text-[15px] leading-7 text-white/48">
                                                {domain.summary}
                                            </p>

                                            <div className="chap-reveal mt-8">
                                                <Link
                                                    href="/contact"
                                                    className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors hover:text-[#f56616]"
                                                >
                                                    Discuss this domain
                                                    <ArrowUpRight
                                                        size={14}
                                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                    />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="chap-reveal">
                                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                                                Capabilities
                                            </span>
                                            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                                                {domain.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-center gap-2.5 border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-[13px] font-medium text-white/60 transition-colors duration-300 hover:border-[#f56616]/30 hover:text-white/80"
                                                    >
                                                        <Check
                                                            size={13}
                                                            strokeWidth={2}
                                                            className="shrink-0 text-[#f56616]"
                                                        />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* mobile chips */}
                <div className="mt-8 flex gap-2 overflow-x-auto pb-2 lg:hidden">
                    {domains.map((d, i) => (
                        <button
                            key={d.id}
                            type="button"
                            onClick={() => scrollToChapter(i)}
                            className={`shrink-0 border px-3.5 py-2 text-[11px] font-semibold transition-colors ${i === activeIndex
                                ? "border-[#f56616] bg-[#f56616] text-white!"
                                : "border-white/15 text-white/50"
                                }`}
                        >
                            {d.number} {d.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}