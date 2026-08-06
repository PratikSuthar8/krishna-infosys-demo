"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Layers, MapPin, ShieldCheck } from "lucide-react";
import { motion } from 'framer-motion'

const stats = [
    { value: "2,100+", label: "Projects", icon: Layers },
    { value: "850+", label: "Clients", icon: ShieldCheck },
    { value: "Pan-India", label: "Delivery", icon: MapPin },
];

export function ProjectsHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".proj-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 })
                .from(
                    ".proj-hero-line",
                    { y: 56, opacity: 0, stagger: 0.08, duration: 0.9 },
                    "-=0.25"
                )
                .from(".proj-hero-copy", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(".proj-hero-action", { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
                .from(
                    ".proj-hero-stat",
                    { y: 20, opacity: 0, stagger: 0.08, duration: 0.55 },
                    "-=0.25"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

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

            <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20 xl:px-16">
                <div className="max-w-[920px]">
                    <div className="proj-hero-eyebrow flex items-center gap-3">
                        <span className="h-px w-8 bg-[#f56616]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                            Projects
                        </span>
                    </div>

                    <h1 className="mt-7">
                        <span className="proj-hero-line block overflow-hidden">
                            <span className="block text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                Work that holds
                            </span>
                        </span>
                        <span className="proj-hero-line block overflow-hidden">
                            <span className="block text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black/30">
                                after handover.
                            </span>
                        </span>
                    </h1>

                    <p className="proj-hero-copy mt-8 max-w-[540px] text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
                        Selected ELV programmes across logistics, healthcare, manufacturing
                        and enterprise — designed, executed and supported under one
                        accountable line.
                    </p>

                    <div className="proj-hero-action mt-9 flex flex-wrap items-center gap-4">
                        <motion.div
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href="/contact"
                                className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-[#171717] !bg-[#171717] px-7 !text-sm !font-semibold !text-white transition-all duration-300 hover:!border-[#f56616] hover:!bg-[#f56616] hover:!text-white"                        >
                                <span>Start a project brief</span>
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
                                href="#featured"
                                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/55 transition-colors hover:text-[#f56616]"
                            >
                                View featured work
                                <ArrowUpRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* stats row */}
                <div className="mt-14 grid gap-3 border-t border-black/10 pt-8 sm:grid-cols-3">
                    {stats.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                className="proj-hero-stat flex items-center gap-4 border border-black/[0.08] bg-white/80 px-5 py-5"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                                    <Icon size={18} strokeWidth={1.5} />
                                </span>
                                <div>
                                    <div className="text-xl font-semibold tracking-[-0.04em]">
                                        {item.value}
                                    </div>
                                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                                        {item.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}