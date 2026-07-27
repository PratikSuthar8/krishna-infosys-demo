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
        href: "/solutions#security",
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
        href: "/solutions#communication",
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
        href: "/solutions#av",
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
        href: "/solutions#networking",
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
        href: "/solutions#automation",
    },
];

export function SolutionsDomainsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeRef = useRef(0);

    useEffect(() => {
        const section = sectionRef.current;
        const journey = journeyRef.current;
        const panel = panelRef.current;
        if (!section || !journey || !panel) return;

        const mm = gsap.matchMedia();
        const count = domains.length;

        const layoutDeck = (progress: number) => {
            const raw = progress * (count - 1);
            const current = Math.max(0, Math.min(count - 1, Math.round(raw)));

            if (current !== activeRef.current) {
                activeRef.current = current;
                setActiveIndex(current);
            }

            cardRefs.current.forEach((card, i) => {
                if (!card) return;

                const offset = i - raw;
                const abs = Math.abs(offset);

                gsap.set(card, {
                    x: offset * 44,
                    y: abs * 12,
                    z: -abs * 70,
                    rotate: offset * -5.5,
                    scale: Math.max(0.74, 1 - abs * 0.09),
                    opacity: abs > 2.1 ? 0 : Math.max(0.22, 1 - abs * 0.32),
                    zIndex: Math.round(120 - abs * 12),
                    transformPerspective: 1000,
                    force3D: true,
                });
            });
        };

        const ctx = gsap.context(() => {
            gsap.from(".sol-dom-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".sol-dom-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            layoutDeck(0);

            mm.add("(min-width: 1024px)", () => {
                const trigger = ScrollTrigger.create({
                    trigger: journey,
                    start: "top top+=110",
                    end: `+=${count * 400}`,
                    pin: panel,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        layoutDeck(self.progress);
                        if (progressRef.current) {
                            gsap.set(progressRef.current, {
                                scaleX: self.progress,
                                transformOrigin: "left center",
                            });
                        }
                    },
                });

                return () => trigger.kill();
            });

            mm.add("(max-width: 1023px)", () => {
                gsap.utils
                    .toArray<HTMLElement>(".sol-mobile-domain")
                    .forEach((card) => {
                        gsap.from(card, {
                            y: 32,
                            opacity: 0,
                            duration: 0.7,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 86%",
                                once: true,
                            },
                        });
                    });
            });
        }, section);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        const copy = copyRef.current;
        if (!copy || !copy.children.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                copy.children,
                { y: 16, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.045,
                    duration: 0.45,
                    ease: "power3.out",
                }
            );
        });
        return () => ctx.revert();
    }, [activeIndex]);

    const active = domains[activeIndex];
    const ActiveIcon = active.icon;

    return (
        <section
            id="domains"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#171717] text-white"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 10%, black 92%, transparent)",
                }}
            />

            {/* INTRO */}
            <div className="sol-dom-intro-wrap relative mx-auto max-w-[1500px] px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pb-14 lg:pt-24 xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                    <div className="sol-dom-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Domain explorer
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="sol-dom-intro max-w-[860px] text-[clamp(2.3rem,4.2vw,4.4rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Scroll the stack.
                            <span className="block text-white/35">
                                Pick the domain that matters.
                            </span>
                        </h2>
                        <p className="sol-dom-intro mt-5 max-w-[520px] text-base leading-7 text-white/45">
                            Five practice areas — each designed to integrate with the others,
                            not sit as a siloed product line.
                        </p>
                    </div>
                </div>
            </div>

            {/* DESKTOP PINNED */}
            <div ref={journeyRef} className="relative hidden lg:block">
                <div
                    ref={panelRef}
                    className="relative mx-auto h-[calc(100vh-110px)] min-h-[640px] max-h-[860px] max-w-[1500px] px-12 xl:px-16"
                >
                    <div className="flex h-full flex-col border-t border-white/[0.08]">
                        {/* ticks + progress */}
                        <div className="relative shrink-0 py-5">
                            <div className="absolute left-0 right-0 top-[42px] h-px bg-white/10" />
                            <div
                                ref={progressRef}
                                className="absolute left-0 right-0 top-[42px] h-px origin-left scale-x-0 bg-[#f56616]"
                            />
                            <div className="relative grid grid-cols-5">
                                {domains.map((d, i) => {
                                    const on = i === activeIndex;
                                    const done = i < activeIndex;
                                    return (
                                        <div key={d.id} className="flex items-center gap-2.5">
                                            <div
                                                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-400 ${on
                                                        ? "border-[#f56616] bg-[#f56616] text-white"
                                                        : done
                                                            ? "border-[#f56616]/45 bg-[#251b16] text-[#f56616]"
                                                            : "border-white/15 bg-[#171717] text-white/30"
                                                    }`}
                                            >
                                                {d.number}
                                            </div>
                                            <span
                                                className={`hidden text-[11px] font-semibold transition-colors duration-400 xl:block ${on ? "text-white" : "text-white/30"
                                                    }`}
                                            >
                                                {d.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] items-center gap-10 border-t border-white/[0.06]">
                            {/* COPY */}
                            <div
                                key={`sol-copy-${activeIndex}`}
                                ref={copyRef}
                                className="max-w-[560px] py-8"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f56616] text-white">
                                        <ActiveIcon size={18} strokeWidth={1.5} />
                                    </span>
                                    <div>
                                        <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                            {active.number} · {active.label}
                                        </span>
                                        <span className="mt-0.5 block text-[11px] text-white/35">
                                            ELV domain
                                        </span>
                                    </div>
                                </div>

                                <h3 className="mt-8 text-[clamp(1.9rem,3vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                                    {active.title}
                                </h3>

                                <p className="mt-5 text-[15px] leading-7 text-white/48 sm:text-base sm:leading-8">
                                    {active.summary}
                                </p>

                                <ul className="mt-7 grid grid-cols-2 gap-2">
                                    {active.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-[12px] font-medium text-white/55"
                                        >
                                            <Check
                                                size={12}
                                                strokeWidth={2}
                                                className="shrink-0 text-[#f56616]"
                                            />
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
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
                                    <span className="font-mono text-[11px] text-white/30">
                                        {String(activeIndex + 1).padStart(2, "0")}
                                        <span className="mx-1.5 text-white/15">/</span>
                                        05
                                    </span>
                                </div>
                            </div>

                            {/* DECK */}
                            <div className="relative flex h-full min-h-[480px] items-center justify-center">
                                <div
                                    className="relative h-[380px] w-[340px]"
                                    style={{ perspective: "1100px" }}
                                >
                                    {domains.map((domain, i) => {
                                        const Icon = domain.icon;
                                        const isActive = i === activeIndex;

                                        return (
                                            <div
                                                key={domain.id}
                                                ref={(el) => {
                                                    cardRefs.current[i] = el;
                                                }}
                                                className="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                                            >
                                                <div
                                                    className={`overflow-hidden border bg-[#1c1c1c] shadow-[0_28px_90px_rgba(0,0,0,0.45)] transition-colors duration-500 ${isActive
                                                            ? "border-[#f56616]/45"
                                                            : "border-white/10"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                                                        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#f56616]">
                                                            {domain.number}
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
                                                            {domain.label}
                                                        </span>
                                                    </div>

                                                    <div className="px-5 py-8">
                                                        <div
                                                            className={`flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500 ${isActive
                                                                    ? "border-[#f56616] bg-[#f56616] text-white"
                                                                    : "border-white/10 bg-white/[0.04] text-white/40"
                                                                }`}
                                                        >
                                                            <Icon size={22} strokeWidth={1.4} />
                                                        </div>
                                                        <h4 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                                                            {domain.title}
                                                        </h4>
                                                        <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-white/40">
                                                            {domain.summary}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3.5">
                                                        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/25">
                                                            Capability card
                                                        </span>
                                                        <ArrowUpRight
                                                            size={13}
                                                            className={
                                                                isActive ? "text-[#f56616]" : "text-white/20"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="relative mx-auto max-w-[1500px] px-5 pb-16 sm:px-8 lg:hidden">
                {domains.map((domain) => {
                    const Icon = domain.icon;
                    return (
                        <article
                            key={domain.id}
                            id={domain.id}
                            className="sol-mobile-domain border-b border-white/10 py-10 first:border-t"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f56616] text-white">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                        {domain.number} · {domain.label}
                                    </span>
                                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                                        {domain.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="mt-5 text-sm leading-7 text-white/50">
                                {domain.summary}
                            </p>
                            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {domain.points.map((p) => (
                                    <li
                                        key={p}
                                        className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[12px] text-white/55"
                                    >
                                        <Check size={12} className="text-[#f56616]" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}