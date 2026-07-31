"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    Mail,
    Phone,
    Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const related = [
    { label: "Communication", href: "/solutions/communication" },
    { label: "Networking & Data", href: "/solutions/networking-data" },
    { label: "Automation & Safety", href: "/solutions/automation-safety" },
    { label: "AMC & Support", href: "/amc-support" },
];

export function SecurityCtaSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".sec-cta", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".sec-cta",
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
                <div className="sec-cta relative overflow-hidden border border-white/10 bg-[#f3f1ec] text-[#171717]">
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
                                    <Shield size={16} strokeWidth={1.5} />
                                </span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                    Security consultation
                                </span>
                            </div>

                            <h2 className="mt-6 max-w-[620px] text-[clamp(2rem,3.4vw,3.4rem)] font-medium leading-[1] tracking-[-0.05em]">
                                Need a security layer
                                <span className="block text-black/30">
                                    that holds on site?
                                </span>
                            </h2>

                            <p className="mt-6 max-w-[460px] text-[15px] leading-7 text-black/50">
                                Share site type, risk zones and whether you need CCTV, access,
                                intrusion, barriers or a full stack — we’ll return a clear
                                design path.
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
                                        All solutions
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
                                    <Phone size={15} className="text-[#f56616]" />
                                    +91 79 4030 9999
                                </a>
                                <a
                                    href="mailto:info@krishnainfosys.com"
                                    className="flex items-center gap-3 text-sm text-black/55 transition-colors hover:text-[#171717]"
                                >
                                    <Mail size={15} className="text-[#f56616]" />
                                    info@krishnainfosys.com
                                </a>
                            </div>

                            <div className="mt-8 border-t border-black/10 pt-6">
                                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                    Related
                                </span>
                                <div className="mt-4 flex flex-col gap-2.5">
                                    {related.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 transition-colors hover:text-[#f56616]"
                                        >
                                            {item.label}
                                            <ArrowUpRight
                                                size={13}
                                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}