"use client";

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
    ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { value: "8+", label: "Priority verticals" },
    { value: "2,100+", label: "Projects delivered" },
    { value: "825+", label: "Clients served" },
    { value: "<1.5%", label: "Complaint ratio" },
];

export function IndustriesCtaSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ind-cta-metric", {
                y: 28,
                opacity: 0,
                duration: 0.7,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".ind-cta-metrics",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".ind-cta-panel", {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".ind-cta-panel",
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
                {/* METRICS */}
                <div className="ind-cta-metrics grid grid-cols-2 gap-3 border-b border-white/10 pb-12 lg:grid-cols-4 lg:gap-4 lg:pb-16">
                    {metrics.map((item) => (
                        <div
                            key={item.label}
                            className="ind-cta-metric border border-white/[0.08] bg-white/[0.02] px-5 py-6"
                        >
                            <div className="text-[clamp(1.7rem,2.8vw,2.4rem)] font-semibold tracking-[-0.05em] text-[#f56616]">
                                {item.value}
                            </div>
                            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA PANEL */}
                <div className="ind-cta-panel relative mt-12 overflow-hidden border border-white/10 bg-[#f3f1ec] text-[#171717] lg:mt-16">
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
                                    <ShieldCheck size={16} strokeWidth={1.5} />
                                </span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                    Sector consultation
                                </span>
                            </div>

                            <h2 className="mt-6 max-w-[640px] text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[1] tracking-[-0.05em]">
                                Tell us the environment.
                                <span className="block text-black/30">
                                    We’ll shape the stack.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-black/50">
                                Hospital, campus, plant, hotel or office — share constraints,
                                compliance needs and timeline. You get a design-led path, not a
                                catalogue dump.
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
                                        <ArrowUpRight
                                            size={15}
                                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        />
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
                                        View solutions
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
                                    href="tel:+917940309999"
                                    className="flex items-center gap-3 text-sm text-black/55 transition-colors hover:text-[#171717]"
                                >
                                    <Phone size={15} strokeWidth={1.5} className="text-[#f56616]" />
                                    +91 79 4030 9999
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