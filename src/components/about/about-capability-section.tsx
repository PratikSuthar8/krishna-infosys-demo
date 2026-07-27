"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    AudioLines,
    HousePlug,
    MessagesSquare,
    Network,
    ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const domains = [
    {
        number: "01",
        title: "Security & Access",
        description:
            "Surveillance, access control, intrusion, barriers and video door systems engineered as one protective layer.",
        href: "/solutions/security-access",
        icon: ShieldCheck,
    },
    {
        number: "02",
        title: "Communication",
        description:
            "Intercom, EPABX, video conferencing, public address and FTTH — connected communication across environments.",
        href: "/solutions/communication",
        icon: MessagesSquare,
    },
    {
        number: "03",
        title: "Audio Visual",
        description:
            "Professional audio, digital signage, auditorium and immersive AV systems designed around the space.",
        href: "/solutions/audio-visual",
        icon: AudioLines,
    },
    {
        number: "04",
        title: "Networking & Data",
        description:
            "Structured cabling, fiber, Wi-Fi, RF, server rooms and data centre infrastructure for reliable operations.",
        href: "/solutions/networking-data",
        icon: Network,
    },
    {
        number: "05",
        title: "Automation & Safety",
        description:
            "Home and building automation integrated with fire alarm and life-safety systems under one responsibility.",
        href: "/solutions/automation-safety",
        icon: HousePlug,
    },
];

export function AboutCapabilitySection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cap-reveal", {
                y: 38,
                opacity: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 76%",
                    once: true,
                },
            });

            gsap.from(".cap-row", {
                y: 36,
                opacity: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cap-list",
                    start: "top 82%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white text-[#171717]"
        >
            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                <div className="grid gap-12 border-b border-black/10 pb-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:pb-18">
                    <div className="cap-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Capability domains
                            </span>
                        </div>

                        <p className="mt-8 text-sm leading-7 text-black/40">
                            Five domains. One integrated delivery model. Designed so systems
                            work together — not as isolated product installs.
                        </p>
                    </div>

                    <div>
                        <h2 className="cap-reveal max-w-[820px] text-[clamp(2.4rem,4.4vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                            What we engineer
                            <span className="block text-black/30">
                                under one responsibility.
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="cap-list mt-2">
                    {domains.map((domain, index) => {
                        const Icon = domain.icon;

                        return (
                            <Link
                                key={domain.number}
                                href={domain.href}
                                className={`cap-row group flex flex-col gap-5 border-b border-black/10 py-8 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-9 ${index === 0 ? "border-t-0" : ""
                                    }`}
                            >
                                <div className="flex min-w-0 flex-1 items-start gap-5 sm:items-center sm:gap-8">
                                    <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#f56616]">
                                        {domain.number}
                                    </span>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#f3f1ec] text-[#f56616] transition-all duration-300 group-hover:border-[#f56616]/40 group-hover:bg-[#f56616]/10">
                                        <Icon size={18} strokeWidth={1.5} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-[#f56616] sm:text-2xl">
                                            {domain.title}
                                        </h3>
                                        <p className="mt-2 max-w-[520px] text-sm leading-6 text-black/45">
                                            {domain.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        Explore
                                    </span>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/40 transition-all duration-300 group-hover:border-[#f56616] group-hover:bg-[#f56616] group-hover:text-white">
                                        <ArrowUpRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-black/40">
                        Prefer a full overview of the solution stack?
                    </p>
                    <Link
                        href="/solutions"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#171717] transition-colors hover:text-[#f56616]"
                    >
                        View all solutions
                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}