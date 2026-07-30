"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
    ArrowUpRight,
    Clock,
    Headphones,
    ShieldCheck,
    Wrench,
} from "lucide-react";

const marks = [
    { label: "24-hour response", icon: Clock },
    { label: "Preventive visits", icon: Wrench },
    { label: "Corrective SLA", icon: Headphones },
    { label: "OEM escalation", icon: ShieldCheck },
];

export function AmcHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".amc-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 })
                .from(
                    ".amc-hero-line",
                    { y: 56, opacity: 0, stagger: 0.08, duration: 0.9 },
                    "-=0.25"
                )
                .from(".amc-hero-copy", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(".amc-hero-action", { y: 14, opacity: 0, duration: 0.5 }, "-=0.3")
                .from(
                    ".amc-hero-mark",
                    { y: 18, opacity: 0, stagger: 0.06, duration: 0.5 },
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
                <div className="max-w-[900px]">
                    <div className="amc-hero-eyebrow flex items-center gap-3">
                        <span className="h-px w-8 bg-[#f56616]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                            AMC & Support
                        </span>
                    </div>

                    <h1 className="mt-7">
                        <span className="amc-hero-line block overflow-hidden">
                            <span className="block text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                Systems stay
                            </span>
                        </span>
                        <span className="amc-hero-line block overflow-hidden">
                            <span className="block text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                reliable after
                            </span>
                        </span>
                        <span className="amc-hero-line block overflow-hidden">
                            <span className="block text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black/30">
                                commissioning.
                            </span>
                        </span>
                    </h1>

                    <p className="amc-hero-copy mt-8 max-w-[520px] text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
                        Structured annual maintenance, corrective response and
                        manufacturer-backed escalation — so ELV infrastructure remains
                        accountable long after handover.
                    </p>

                    <div className="amc-hero-action mt-9 flex flex-wrap items-center gap-4">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-[#f56616]"
                        >
                            <span>Discuss AMC coverage</span>
                            <ArrowUpRight
                                size={15}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>

                        <a
                            href="#coverage"
                            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/55 transition-colors hover:text-[#f56616]"
                        >
                            See what’s covered
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    </div>
                </div>

                <div className="mt-14 grid grid-cols-2 gap-3 border-t border-black/10 pt-8 lg:grid-cols-4">
                    {marks.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                className="amc-hero-mark flex items-center gap-3 border border-black/[0.08] bg-white/80 px-4 py-4"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                                    <Icon size={17} strokeWidth={1.5} />
                                </span>
                                <span className="text-[13px] font-semibold tracking-[-0.02em] text-black/75">
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}