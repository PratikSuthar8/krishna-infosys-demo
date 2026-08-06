"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
    ArrowUpRight,
    Award,
    MapPin,
    ShieldCheck,
} from "lucide-react";

export function AboutHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            timeline
                .from(".about-hero-eyebrow", {
                    y: 18,
                    opacity: 0,
                    duration: 0.6,
                })
                .from(
                    ".about-hero-line",
                    {
                        y: 72,
                        opacity: 0,
                        rotateX: -10,
                        stagger: 0.09,
                        duration: 0.95,
                    },
                    "-=0.3"
                )
                .from(
                    ".about-hero-copy",
                    {
                        y: 22,
                        opacity: 0,
                        duration: 0.7,
                    },
                    "-=0.5"
                )
                .from(
                    ".about-hero-meta",
                    {
                        y: 16,
                        opacity: 0,
                        stagger: 0.08,
                        duration: 0.55,
                    },
                    "-=0.4"
                )
                .from(
                    ".about-hero-action",
                    {
                        y: 14,
                        opacity: 0,
                        duration: 0.55,
                    },
                    "-=0.3"
                )
                .from(
                    ".about-hero-bar",
                    {
                        y: 12,
                        opacity: 0,
                        duration: 0.5,
                    },
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
            {/* Architectural grid — same language as home */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.28]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 top-24 hidden h-[480px] w-[480px] rounded-full border border-black/[0.04] lg:block"
            >
                <div className="absolute inset-16 rounded-full border border-dashed border-[#f56616]/20" />
                <div className="absolute inset-32 rounded-full border border-black/[0.05]" />
            </div>

            <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20 xl:px-16">
                <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
                    {/* Left — narrative */}
                    <div>
                        <div className="about-hero-eyebrow flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                About Krishna Infosys
                            </span>
                        </div>

                        <h1 className="mt-7 max-w-[920px]">
                            <span className="about-hero-line block overflow-hidden">
                                <span className="block text-[clamp(2.8rem,6.2vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                    Engineering trust
                                </span>
                            </span>
                            <span className="about-hero-line block overflow-hidden">
                                <span className="block text-[clamp(2.8rem,6.2vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black/30">
                                    since 2001.
                                </span>
                            </span>
                        </h1>

                        <p className="about-hero-copy mt-8 max-w-[560px] text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
                            A leading ELV turnkey project consulting company based in
                            Ahmedabad. We design, consult, integrate and execute smart
                            building solutions for commercial, industrial, residential,
                            healthcare, hospitality and government sectors across India.
                        </p>

                        <div className="about-hero-action mt-9 flex flex-wrap items-center gap-4">
                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="/contact"
                                    className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-[#171717] !bg-[#171717] px-7 !text-sm !font-semibold !text-white transition-all duration-300 hover:!border-[#f56616] hover:!bg-[#f56616] hover:!text-white"
                                >
                                    Start a conversation
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:rotate-45">
                                        <ArrowUpRight size={15} />
                                    </span>
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="/solutions"
                                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-black/10 !bg-white/70 px-7 !text-sm !font-semibold !text-[#171717] backdrop-blur transition-all duration-300 hover:!border-[#f56616]/30 hover:!bg-[#f56616]/[0.06] hover:!text-[#f56616]"
                                >
                                    Explore solutions
                                    <ArrowUpRight
                                        size={14}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right — proof meta */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            {
                                label: "Experience",
                                value: "24+",
                                note: "Years",
                                icon: Award,
                            },
                            {
                                label: "Clients",
                                value: "850+",
                                note: "Satisfied",
                                icon: null,
                            },
                            {
                                label: "Projects",
                                value: "2,100+",
                                note: "Delivered",
                                icon: null,
                            },
                            {
                                label: "Certification",
                                value: "ISO",
                                note: "9001:2015",
                                icon: ShieldCheck,
                            },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="about-hero-meta border border-black/[0.08] bg-white/70 px-5 py-5 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
                                        {item.label}
                                    </span>
                                    {item.icon && (
                                        <item.icon
                                            size={15}
                                            strokeWidth={1.5}
                                            className="text-[#f56616]"
                                        />
                                    )}
                                </div>
                                <div className="mt-3 text-[1.65rem] font-semibold tracking-[-0.04em] text-black/80">
                                    {item.value}
                                </div>
                                <div className="mt-1 text-[11px] font-medium text-black/40">
                                    {item.note}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom system bar */}
                <div className="about-hero-bar mt-14 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
                        <span>Design</span>
                        <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                        <span>Consult</span>
                        <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                        <span>Execute</span>
                        <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                        <span>Support</span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-medium text-black/30">
                        <MapPin size={12} strokeWidth={1.6} className="text-[#f56616]" />
                        <span>Ahmedabad · Gujarat · India · Pan-India delivery</span>
                    </div>
                </div>
            </div>
        </section >
    );
}