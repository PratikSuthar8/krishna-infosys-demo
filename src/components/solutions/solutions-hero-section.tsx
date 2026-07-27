"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
    ArrowUpRight,
    Cable,
    Cctv,
    Network,
    Radio,
    Sparkles,
} from "lucide-react";

const stack = [
    {
        id: "security",
        label: "Security",
        blurb: "CCTV, access control, intrusion and perimeter as one defensive layer.",
        icon: Cctv,
    },
    {
        id: "communication",
        label: "Communication",
        blurb: "EPABX, PA, intercom and conferencing for clear site operations.",
        icon: Radio,
    },
    {
        id: "av",
        label: "Audio Visual",
        blurb: "Boardrooms, video walls and signage engineered for daily use.",
        icon: Sparkles,
    },
    {
        id: "networking",
        label: "Networking",
        blurb: "Cabling, switching and Wi-Fi sized for every ELV load.",
        icon: Network,
    },
    {
        id: "automation",
        label: "Automation",
        blurb: "Lighting, climate and scenes integrated with the wider stack.",
        icon: Cable,
    },
];

export function SolutionsHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0); // Security active by default
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".sol-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 })
                .from(
                    ".sol-hero-line",
                    { y: 56, opacity: 0, stagger: 0.08, duration: 0.85 },
                    "-=0.25"
                )
                .from(".sol-hero-copy", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(".sol-hero-action", { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
                .from(
                    ".sol-hero-stage",
                    { opacity: 0, scale: 0.96, duration: 0.75 },
                    "-=0.5"
                )
                .from(
                    ".sol-node",
                    {
                        scale: 0.65,
                        opacity: 0,
                        stagger: 0.07,
                        duration: 0.5,
                        ease: "back.out(1.5)",
                    },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* cycle 0 → 1 → 2 → 3 → 4 → 0 … pause while hovering stage */
    useEffect(() => {
        if (paused) return;
        const id = window.setInterval(() => {
            setActive((prev) => (prev + 1) % stack.length);
        }, 3200);
        return () => window.clearInterval(id);
    }, [paused]);

    const current = stack[active];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f3f1ec] pt-[88px] text-[#171717]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.28]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, black 45%, transparent 100%)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 pb-14 pt-14 sm:px-8 lg:px-12 lg:pb-20 lg:pt-18 xl:px-16">
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
                    {/* LEFT */}
                    <div>
                        <div className="sol-hero-eyebrow flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Solutions
                            </span>
                        </div>

                        <h1 className="mt-7">
                            <span className="sol-hero-line block overflow-hidden">
                                <span className="block text-[clamp(2.6rem,5.5vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                    One ELV stack.
                                </span>
                            </span>
                            <span className="sol-hero-line block overflow-hidden">
                                <span className="block text-[clamp(2.6rem,5.5vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black/30">
                                    Five engineered domains.
                                </span>
                            </span>
                        </h1>

                        <p className="sol-hero-copy mt-7 max-w-[500px] text-base leading-7 text-black/55 sm:text-[17px] sm:leading-8">
                            Security, communication, AV, networking and automation — designed
                            and supported as a single accountable system.
                        </p>

                        <div className="sol-hero-action mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact"
                                className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-[#171717] !bg-[#171717] px-7 !text-sm !font-semibold !text-white transition-all duration-300 hover:!border-[#f56616] hover:!bg-[#f56616] hover:!text-white"
                            >
                                <span>Scope a project</span>
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:rotate-45">
                                    <ArrowUpRight size={15} />
                                </span>
                            </Link>

                            <a
                                href="#domains"
                                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-black/10 !bg-white/70 px-7 !text-sm !font-semibold !text-[#171717] backdrop-blur transition-all duration-300 hover:!border-[#f56616]/30 hover:!bg-[#f56616]/[0.06] hover:!text-[#f56616]"
                            >
                                Explore domains
                                <ArrowUpRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="sol-hero-stage relative mx-auto w-full max-w-[480px] lg:mx-0">
                        <div
                            className="relative mx-auto h-[380px] w-[380px] sm:h-[420px] sm:w-[420px]"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            {/* rings */}
                            <div className="pointer-events-none absolute inset-0 rounded-full border border-black/[0.06]" />
                            <div className="pointer-events-none absolute inset-[11%] rounded-full border border-dashed border-[#f56616]/25" />
                            <div className="pointer-events-none absolute inset-[22%] rounded-full border border-black/[0.05]" />

                            {/* fixed center */}
                            <div className="absolute left-1/2 top-1/2 z-20 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#f56616]/35 bg-[#171717] text-white shadow-[0_20px_60px_rgba(23,23,23,0.25)]">
                                <span className="font-mono text-[9px] tracking-[0.2em] text-[#f56616]">
                                    ELV
                                </span>
                                <span className="mt-1 text-[13px] font-semibold tracking-[-0.02em]">
                                    5 domains
                                </span>
                                <span className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/30">
                                    One stack
                                </span>
                            </div>

                            {/* larger orbit nodes */}
                            {stack.map((item, i) => {
                                const Icon = item.icon;
                                const on = active === i;
                                const angle = (360 / stack.length) * i - 90;
                                const rad = (angle * Math.PI) / 180;
                                const radius = 150; // slightly larger orbit for bigger nodes
                                const x = Math.cos(rad) * radius;
                                const y = Math.sin(rad) * radius;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`sol-node absolute z-30 flex flex-col items-center gap-2 transition-transform duration-500 ${on ? "scale-110" : "scale-100"
                                            }`}
                                        style={{
                                            left: "50%",
                                            top: "50%",
                                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                        }}
                                        onMouseEnter={() => {
                                            setPaused(true);
                                            setActive(i);
                                        }}
                                        onFocus={() => {
                                            setPaused(true);
                                            setActive(i);
                                        }}
                                        aria-label={item.label}
                                        aria-pressed={on}
                                    >
                                        <span
                                            className={`flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-500 sm:h-[4.5rem] sm:w-[4.5rem] ${on
                                                ? "border-[#f56616] bg-[#f56616] text-white shadow-[0_0_36px_rgba(245,102,22,0.4)]"
                                                : "border-black/10 bg-white text-black/45 hover:border-[#f56616]/40 hover:text-[#f56616]"
                                                }`}
                                        >
                                            <Icon size={24} strokeWidth={1.45} />
                                        </span>
                                        <span
                                            className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-500 ${on ? "text-[#f56616]" : "text-black/35"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* detail — always shows active domain */}
                        <div
                            className="relative mt-8 border border-black/[0.08] bg-white px-5 py-4"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f56616]">
                                            {current.label}
                                        </span>
                                        <span className="font-mono text-[10px] text-black/30">
                                            {String(active + 1).padStart(2, "0")} / 05
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-sm leading-6 text-black/55">
                                        {current.blurb}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* progress dots */}
                            <div className="mt-3 flex items-center gap-1.5">
                                {stack.map((item, i) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        aria-label={`Show ${item.label}`}
                                        onClick={() => setActive(i)}
                                        className={`h-1 rounded-full transition-all duration-400 ${i === active
                                            ? "w-6 bg-[#f56616]"
                                            : "w-1.5 bg-black/15 hover:bg-black/30"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
                        <span>Design</span>
                        <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                        <span>Consult</span>
                        <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                        <span>Execute</span>
                        <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                        <span>Support</span>
                    </div>
                    <span className="text-[10px] font-medium text-black/30">
                        Auto-cycles · Hover to pause
                    </span>
                </div>
            </div>
        </section>
    );
}