"use client";

import { contact } from "@/lib/contact";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    ClipboardList,
    Headphones,
    Mail,
    MapPin,
    MessagesSquare,
    Phone,
    Wrench,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "Design",
        detail:
            "Site survey, risk mapping, parametric BOQ and AutoCAD layouts before procurement starts.",
        icon: ClipboardList,
    },
    {
        number: "02",
        title: "Consult",
        detail:
            "Technology shortlist across 25+ OEM brands — chosen for the environment, not a single catalogue.",
        icon: MessagesSquare,
    },
    {
        number: "03",
        title: "Execute",
        detail:
            "Dedicated PM and site supervisor, staged installation, testing and documented commissioning.",
        icon: Wrench,
    },
    {
        number: "04",
        title: "Support",
        detail:
            "Structured AMC, 24-hour corrective response and manufacturer-backed escalation when required.",
        icon: Headphones,
    },
];

export function SolutionsProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".proc-reveal", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".proc-intro",
                    start: "top 78%",
                    once: true,
                },
            });

            gsap.from(".proc-step", {
                y: 40,
                opacity: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".proc-steps",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".proc-cta", {
                y: 36,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".proc-cta",
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
                className="pointer-events-none absolute inset-0 opacity-[0.13]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 8%, black 90%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="proc-intro grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                    <div className="proc-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Delivery model
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="proc-reveal max-w-[900px] text-[clamp(2.4rem,4.4vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Design. Consult.
                            <span className="block text-white/35">Execute. Support.</span>
                        </h2>
                        <p className="proc-reveal mt-6 max-w-[540px] text-base leading-7 text-white/45">
                            The same four-stage spine on every ELV engagement — from first
                            survey through AMC — so scope, quality and service stay coherent.
                        </p>
                    </div>
                </div>

                {/* STEPS */}
                <div className="proc-steps relative mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-white/10 lg:block"
                    />

                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <article
                                key={step.number}
                                className="proc-step relative border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#f56616]/35"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#f56616]/40 bg-[#171717] text-[#f56616]">
                                        <Icon size={17} strokeWidth={1.5} />
                                    </span>
                                    <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#f56616]">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em]">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/45">
                                    {step.detail}
                                </p>
                            </article>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="proc-cta relative mt-16 overflow-hidden border border-white/10 bg-[#f3f1ec] text-[#171717] lg:mt-20">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.2]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />

                    <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16 lg:px-14 lg:py-16">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#f56616]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                    Next step
                                </span>
                            </div>

                            <h3 className="mt-6 max-w-[640px] text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[1] tracking-[-0.05em]">
                                Ready to scope
                                <span className="block text-black/30">
                                    the right ELV stack?
                                </span>
                            </h3>

                            <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-black/50">
                                Share the site type, priority domains and timeline — we will
                                return a clear design path, not a product dump.
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
                                        href="/about"
                                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/50 transition-colors hover:text-[#f56616]"
                                    >
                                        About the practice
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