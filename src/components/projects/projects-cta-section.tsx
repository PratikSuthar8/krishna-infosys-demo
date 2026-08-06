"use client";

import { contact } from "@/lib/contact";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from 'framer-motion'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    Target,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const outcomes = [
    {
        value: "2,100+",
        label: "Projects delivered",
        note: "Across verticals and site types",
    },
    {
        value: "850+",
        label: "Clients",
        note: "Repeat and long-term relationships",
    },
    {
        value: "<1.5%",
        label: "Complaint ratio",
        note: "Service discipline after handover",
    },
    {
        value: "24+",
        label: "Years",
        note: "Engineering continuity since 2001",
    },
];

export function ProjectsCtaSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".out-reveal", {
                y: 32,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".out-intro",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".out-metric", {
                y: 28,
                opacity: 0,
                duration: 0.65,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".out-metrics",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".out-cta", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".out-cta",
                    start: "top 88%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#171717] text-white"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="out-intro grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="out-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Outcomes
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="out-reveal max-w-[800px] text-[clamp(2.2rem,4vw,4rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Measured after commissioning.
                            <span className="block text-white/35">
                                Not only at handover.
                            </span>
                        </h2>
                        <p className="out-reveal mt-5 max-w-[500px] text-base leading-7 text-white/45">
                            Volume matters — continuity and low complaint ratios matter more.
                            That is how project quality shows up over years of AMC.
                        </p>
                    </div>
                </div>

                {/* METRICS */}
                <div className="out-metrics mt-12 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    {outcomes.map((item) => (
                        <div
                            key={item.label}
                            className="out-metric border border-white/[0.08] bg-white/[0.02] px-5 py-6"
                        >
                            <div className="text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold tracking-[-0.05em] text-[#f56616]">
                                {item.value}
                            </div>
                            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                                {item.label}
                            </div>
                            <p className="mt-2 text-[12px] leading-5 text-white/30">
                                {item.note}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="out-cta relative mt-16 overflow-hidden border border-white/10 bg-[#f3f1ec] text-[#171717] lg:mt-20">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.2]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />

                    <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16 lg:px-14 lg:py-16">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                                    <Target size={16} strokeWidth={1.5} />
                                </span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                    Project enquiry
                                </span>
                            </div>

                            <h3 className="mt-6 max-w-[620px] text-[clamp(2rem,3.4vw,3.4rem)] font-medium leading-[1] tracking-[-0.05em]">
                                Have a site in mind?
                                <span className="block text-black/30">
                                    Send the constraints.
                                </span>
                            </h3>

                            <p className="mt-6 max-w-[460px] text-[15px] leading-7 text-black/50">
                                Sector, building type, priority domains and timeline are enough
                                to start a design conversation — no need for a full tender pack
                                on day one.
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/contact"
                                        className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-[#171717] !bg-[#171717] px-7 !text-sm !font-semibold !text-white transition-all duration-300 hover:!border-[#f56616] hover:!bg-[#f56616] hover:!text-white"                                >
                                        <span>Request consultation</span>
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
                                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/50 transition-colors hover:text-[#f56616]"
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

                        <div className="border-t border-black/10 pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                Direct contact
                            </span>

                            <div className="mt-5 space-y-4">
                                <a
                                    href={contact.phone.href}
                                    className="flex items-center gap-3 text-sm text-black/55 transition-colors hover:text-[#171717]"
                                >
                                    <Phone size={15} strokeWidth={1.5} className="text-[#f56616]" />
                                    {contact.phone.display}
                                </a>

                                <a
                                    href="mailto:info@krishnainfosys.com"
                                    className="flex items-center gap-3 text-sm text-black/55 transition-colors hover:text-[#171717]"
                                >
                                    <Mail size={15} strokeWidth={1.5} className="text-[#f56616]" />
                                    info@krishnainfosys.com
                                </a>

                                <div className="flex items-start gap-3 text-sm text-black/45">
                                    <MapPin
                                        size={15}
                                        strokeWidth={1.5}
                                        className="mt-0.5 shrink-0 text-[#f56616]"
                                    />
                                    <span className="leading-6">
                                        Ahmedabad, Gujarat
                                        <span className="mt-1 block text-[12px] text-black/30">
                                            Pan-India project delivery
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}