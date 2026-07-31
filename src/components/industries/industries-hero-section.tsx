"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
    ArrowUpRight,
    Building2,
    Factory,
    GraduationCap,
    HeartPulse,
    Home,
    Hotel,
    Landmark,
    Store,
} from "lucide-react";

const marks = [
    { label: "Corporate", blurb: "HQ · IT parks · Campuses", icon: Building2 },
    { label: "Healthcare", blurb: "Hospitals · Clinics · Labs", icon: HeartPulse },
    { label: "Education", blurb: "Campuses · Institutes", icon: GraduationCap },
    { label: "Hospitality", blurb: "Hotels · Resorts", icon: Hotel },
    { label: "Industrial", blurb: "Plants · Logistics", icon: Factory },
    { label: "Government", blurb: "Civic · Regulated sites", icon: Landmark },
    { label: "Residential", blurb: "Homes · Communities", icon: Home },
    { label: "Retail", blurb: "Stores · Malls", icon: Store },
];

export function IndustriesHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".ind-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 })
                .from(
                    ".ind-hero-line",
                    { y: 58, opacity: 0, stagger: 0.08, duration: 0.9 },
                    "-=0.25"
                )
                .from(".ind-hero-copy", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(".ind-hero-action", { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
                .from(
                    ".ind-hero-stage",
                    { opacity: 0, scale: 0.96, duration: 0.75 },
                    "-=0.45"
                )
                .from(
                    ".ind-orb",
                    {
                        scale: 0.6,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 0.5,
                        ease: "back.out(1.5)",
                    },
                    "-=0.4"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (paused) return;
        const id = window.setInterval(() => {
            setActive((prev) => (prev + 1) % marks.length);
        }, 3000);
        return () => window.clearInterval(id);
    }, [paused]);

    const current = marks[active];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f3f1ec] pt-[88px] text-[#171717]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.26]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, black 50%, transparent 100%)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 pb-14 pt-14 sm:px-8 lg:px-12 lg:pb-20 lg:pt-18 xl:px-16">
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
                    {/* LEFT */}
                    <div>
                        <div className="ind-hero-eyebrow flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Industries
                            </span>
                        </div>

                        <h1 className="mt-7">
                            <span className="ind-hero-line block overflow-hidden">
                                <span className="block text-[clamp(2.6rem,5.5vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                    Built for the
                                </span>
                            </span>
                            <span className="ind-hero-line block overflow-hidden">
                                <span className="block text-[clamp(2.6rem,5.5vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                    environment
                                </span>
                            </span>
                            <span className="ind-hero-line block overflow-hidden">
                                <span className="block text-[clamp(2.6rem,5.5vw,5.6rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black/30">
                                    you operate in.
                                </span>
                            </span>
                        </h1>

                        <p className="ind-hero-copy mt-7 max-w-[500px] text-base leading-7 text-black/55 sm:text-[17px] sm:leading-8">
                            ELV systems shaped by sector reality — hospitals, campuses,
                            plants, hotels, offices and public facilities — not generic
                            product bundles.
                        </p>

                        <div className="ind-hero-action mt-8 flex flex-wrap items-center gap-4">
                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="/contact"
                                    className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-[#171717] !bg-[#171717] px-7 !text-sm !font-semibold !text-white transition-all duration-300 hover:!border-[#f56616] hover:!bg-[#f56616] hover:!text-white"                            >
                                    <span>Talk sector requirements</span>
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:rotate-45">
                                        <ArrowUpRight size={15} />
                                    </span>
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <a
                                    href="#mosaic"
                                    className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/55 transition-colors hover:text-[#f56616]"
                                >
                                    Browse verticals
                                    <ArrowUpRight
                                        size={14}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT — orbital constellation */}
                    <div className="ind-hero-stage relative mx-auto w-full max-w-[480px] lg:mx-0">
                        <div
                            className="relative mx-auto h-[400px] w-[400px] sm:h-[440px] sm:w-[440px]"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            {/* rings */}
                            <div className="pointer-events-none absolute inset-0 rounded-full border border-black/[0.06]" />
                            <div className="pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-[#f56616]/25" />
                            <div className="pointer-events-none absolute inset-[20%] rounded-full border border-black/[0.05]" />

                            {/* center */}
                            <div className="absolute left-1/2 top-1/2 z-20 flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#f56616]/35 bg-[#171717] text-white shadow-[0_20px_60px_rgba(23,23,23,0.25)]">
                                <span className="font-mono text-[9px] tracking-[0.2em] text-[#f56616]">
                                    ELV
                                </span>
                                <span className="mt-1 text-[13px] font-semibold tracking-[-0.02em]">
                                    8 verticals
                                </span>
                                <span className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/30">
                                    One standard
                                </span>
                            </div>

                            {/* orbit nodes */}
                            {marks.map((item, i) => {
                                const Icon = item.icon;
                                const on = active === i;
                                const angle = (360 / marks.length) * i - 90;
                                const rad = (angle * Math.PI) / 180;
                                const radius = 155;
                                const x = Math.cos(rad) * radius;
                                const y = Math.sin(rad) * radius;

                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className={`ind-orb absolute z-30 flex flex-col items-center gap-1.5 transition-transform duration-500 ${on ? "scale-110" : "scale-100"
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
                                            className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500 sm:h-16 sm:w-16 ${on
                                                ? "border-[#f56616] bg-[#f56616] text-white shadow-[0_0_32px_rgba(245,102,22,0.4)]"
                                                : "border-black/10 bg-white text-black/45 hover:border-[#f56616]/40 hover:text-[#f56616]"
                                                }`}
                                        >
                                            <Icon size={22} strokeWidth={1.45} />
                                        </span>
                                        <span
                                            className={`max-w-[72px] text-center text-[9px] font-bold uppercase leading-tight tracking-[0.1em] transition-colors duration-500 ${on ? "text-[#f56616]" : "text-black/35"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* detail under orbit */}
                        <div
                            className="relative mt-6 border border-black/[0.08] bg-white px-5 py-4"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.label}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.28 }}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f56616]">
                                            {current.label}
                                        </span>
                                        <span className="font-mono text-[10px] text-black/30">
                                            {String(active + 1).padStart(2, "0")} / 08
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-sm leading-6 text-black/55">
                                        {current.blurb}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-3 flex items-center gap-1.5">
                                {marks.map((item, i) => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        aria-label={item.label}
                                        onClick={() => setActive(i)}
                                        className={`h-1 rounded-full transition-all duration-400 ${i === active
                                            ? "w-5 bg-[#f56616]"
                                            : "w-1.5 bg-black/15 hover:bg-black/30"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[10px] font-medium text-black/35">
                        8 priority verticals · Pan-India delivery
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                        Auto-cycles · Hover to pause
                    </span>
                </div>
            </div>
        </section>
    );
}