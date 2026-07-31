"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    Check,
    Mail,
    MapPin,
    Phone,
    Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
        name: "Essential",
        tagline: "Core uptime care",
        detail:
            "For sites that need scheduled preventive visits and a clear corrective path on critical ELV systems.",
        features: [
            "Preventive maintenance visits",
            "Corrective ticket desk",
            "Basic device service log",
            "Genuine spare guidance",
        ],
        highlighted: false,
    },
    {
        name: "Operational",
        tagline: "Most chosen",
        detail:
            "Balanced coverage for multi-system sites — security, communication and network assets under one SLA rhythm.",
        features: [
            "All Essential inclusions",
            "24-hour critical response",
            "Priority on-site engineering",
            "Periodic health reviews",
            "OEM escalation support",
        ],
        highlighted: true,
    },
    {
        name: "Enterprise",
        tagline: "Multi-site programmes",
        detail:
            "For campuses and multi-location operations that need unified reporting, deeper visits and dedicated coordination.",
        features: [
            "All Operational inclusions",
            "Multi-site coordination",
            "Enhanced visit frequency",
            "Executive service reviews",
            "Custom SLA framing",
        ],
        highlighted: false,
    },
];

export function AmcPlansSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".plan-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".plan-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".plan-card", {
                y: 40,
                opacity: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".plan-grid",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".plan-cta", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".plan-cta",
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
                <div className="plan-intro-wrap grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="plan-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Engagement models
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="plan-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Coverage shaped to
                            <span className="block text-white/35">site criticality.</span>
                        </h2>
                        <p className="plan-intro mt-5 max-w-[520px] text-base leading-7 text-white/45">
                            Plans are starting frameworks — final AMC scope follows asset
                            inventory, risk zones and response expectations for your sites.
                        </p>
                    </div>
                </div>

                {/* PLANS */}
                <div className="plan-grid mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <article
                            key={plan.name}
                            className={`plan-card flex flex-col border p-6 sm:p-8 ${plan.highlighted
                                ? "border-[#f56616]/50 bg-[#1f1c19]"
                                : "border-white/[0.08] bg-white/[0.02]"
                                }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                                    {plan.name}
                                </h3>
                                {plan.highlighted && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f56616]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#f56616]">
                                        <Sparkles size={11} />
                                        {plan.tagline}
                                    </span>
                                )}
                            </div>

                            {!plan.highlighted && (
                                <span className="mt-2 text-[12px] font-medium text-white/35">
                                    {plan.tagline}
                                </span>
                            )}

                            <p className="mt-5 text-sm leading-6 text-white/45">
                                {plan.detail}
                            </p>

                            <ul className="mt-8 flex-1 space-y-3">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                                        <Check
                                            size={14}
                                            strokeWidth={2.5}
                                            className="mt-0.5 shrink-0 text-[#f56616]"
                                        />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contact"
                                className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold transition-colors duration-300 ${plan.highlighted
                                    ? "bg-[#f56616] text-white hover:bg-white hover:text-[#171717]!"
                                    : "bg-white text-[#171717]! hover:bg-[#f56616] hover:text-white!"
                                    }`}
                            >
                                <span >Talk this plan</span>
                                <ArrowUpRight size={14} />
                            </Link>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="plan-cta relative mt-16 overflow-hidden border border-white/10 bg-[#f3f1ec] text-[#171717] lg:mt-20">
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
                                <span className="h-px w-8 bg-[#f56616]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                    AMC consultation
                                </span>
                            </div>

                            <h3 className="mt-6 max-w-[620px] text-[clamp(2rem,3.4vw,3.4rem)] font-medium leading-[1] tracking-[-0.05em]">
                                Share your asset list.
                                <span className="block text-black/30">
                                    We’ll propose coverage.
                                </span>
                            </h3>

                            <p className="mt-6 max-w-[460px] text-[15px] leading-7 text-black/50">
                                Site count, system types and criticality are enough to draft a
                                practical AMC outline — including visit rhythm and response
                                expectations.
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/contact"
                                        className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-[#171717] !bg-[#171717] px-7 !text-sm !font-semibold !text-white transition-all duration-300 hover:!border-[#f56616] hover:!bg-[#f56616] hover:!text-white"                                >
                                        <span>Request AMC proposal</span>
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
                                        href="/projects"
                                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/50 transition-colors hover:text-[#f56616]"
                                    >
                                        View project work
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
                                            Pan-India service support
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