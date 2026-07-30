"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Building2,
    Globe2,
    ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        icon: Building2,
        title: "Headquarters",
        detail: "Ahmedabad, Gujarat",
        note: "Design, engineering and delivery coordination",
    },
    {
        icon: Globe2,
        title: "Delivery footprint",
        detail: "Pan-India execution",
        note: "Multi-site programmes under one standard",
    },
    {
        icon: ShieldCheck,
        title: "Quality system",
        detail: "ISO 9001:2015",
        note: "Process-controlled project and service delivery",
    },
];

export function ContactPresenceSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".pres-card", {
                y: 32,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".pres-grid",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.from(".pres-links", {
                y: 24,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".pres-links",
                    start: "top 90%",
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

            <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
                <div className="pres-grid grid gap-3 sm:grid-cols-3 lg:gap-4">
                    {cards.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="pres-card border border-white/[0.08] bg-white/[0.02] px-6 py-7"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#f56616]">
                                    <Icon size={17} strokeWidth={1.5} />
                                </span>
                                <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                                    {item.title}
                                </div>
                                <div className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                                    {item.detail}
                                </div>
                                <p className="mt-2 text-sm leading-6 text-white/40">
                                    {item.note}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="pres-links mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[420px] text-sm text-white/40">
                        Prefer to explore first? Review solutions, industries or active
                        support models before you write in.
                    </p>

                    <div className="flex flex-wrap gap-5">
                        <Link
                            href="/solutions"
                            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors hover:text-[#f56616]"
                        >
                            Solutions
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                        <Link
                            href="/industries"
                            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors hover:text-[#f56616]"
                        >
                            Industries
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                        <Link
                            href="/amc-support"
                            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors hover:text-[#f56616]"
                        >
                            AMC & Support
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}