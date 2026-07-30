"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Building2,
    Factory,
    HeartPulse,
    Truck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
    {
        id: "nippon",
        number: "01",
        client: "Nippon Express",
        sector: "Logistics",
        title: "Multi-site security and access for logistics operations.",
        summary:
            "Surveillance, access control and site monitoring designed around warehouse flow, gates and shift operations.",
        scope: ["IP CCTV", "Access control", "Gate monitoring", "Central VMS"],
        icon: Truck,
        accent: true,
    },
    {
        id: "sterling",
        number: "02",
        client: "Sterling Hospital",
        sector: "Healthcare",
        title: "Clinical-zone security and communication backbone.",
        summary:
            "Department access, corridor surveillance and communication paths aligned to hospital workflows.",
        scope: ["Zone access", "CCTV", "PA / nurse call links", "Networking"],
        icon: HeartPulse,
        accent: false,
    },
    {
        id: "ramdev",
        number: "03",
        client: "Ramdev Namkeen",
        sector: "Industrial",
        title: "Plant and perimeter visibility for manufacturing.",
        summary:
            "Outdoor and plant-floor monitoring with controlled entry points for a high-throughput production environment.",
        scope: ["Perimeter CCTV", "Plant cameras", "Access points", "Recording"],
        icon: Factory,
        accent: false,
    },
    {
        id: "enterprise",
        number: "04",
        client: "Enterprise campus",
        sector: "Corporate",
        title: "Campus-wide ELV stack for office operations.",
        summary:
            "Integrated access, meeting-room AV and structured networking across multi-building corporate facilities.",
        scope: ["Access control", "Meeting AV", "Structured cabling", "CCTV"],
        icon: Building2,
        accent: false,
    },
];

export function ProjectsFeaturedSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".feat-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".feat-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.utils.toArray<HTMLElement>(".feat-case").forEach((el) => {
                gsap.from(el.querySelectorAll(".feat-reveal"), {
                    y: 32,
                    opacity: 0,
                    duration: 0.75,
                    stagger: 0.06,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 78%",
                        once: true,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="featured"
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
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 8%, black 94%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="feat-intro-wrap grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="feat-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Featured work
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="feat-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Selected programmes.
                            <span className="block text-white/35">
                                Real operating environments.
                            </span>
                        </h2>
                        <p className="feat-intro mt-5 max-w-[500px] text-base leading-7 text-white/45">
                            A cross-section of logistics, healthcare, industrial and corporate
                            deployments — each shaped by site constraints, not catalogue
                            defaults.
                        </p>
                    </div>
                </div>

                {/* CASES */}
                <div className="mt-4">
                    {cases.map((item, index) => {
                        const Icon = item.icon;
                        const isFirst = index === 0;

                        return (
                            <article
                                key={item.id}
                                className={`feat-case relative grid gap-8 border-b border-white/[0.08] py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-18 ${isFirst ? "lg:py-20" : ""
                                    }`}
                            >
                                {/* meta */}
                                <div>
                                    <div className="feat-reveal flex items-center gap-3">
                                        <span
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border ${isFirst
                                                    ? "border-[#f56616] bg-[#f56616] text-white"
                                                    : "border-white/15 bg-white/[0.03] text-[#f56616]"
                                                }`}
                                        >
                                            <Icon size={20} strokeWidth={1.45} />
                                        </span>
                                        <div>
                                            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                                {item.number} · {item.sector}
                                            </span>
                                            <span className="mt-0.5 block text-sm font-semibold text-white/80">
                                                {item.client}
                                            </span>
                                        </div>
                                    </div>

                                    <h3
                                        className={`feat-reveal mt-8 font-medium leading-[1.08] tracking-[-0.04em] ${isFirst
                                                ? "text-[clamp(1.8rem,3vw,2.8rem)]"
                                                : "text-[clamp(1.5rem,2.4vw,2.2rem)]"
                                            }`}
                                    >
                                        {item.title}
                                    </h3>

                                    <p className="feat-reveal mt-5 max-w-[420px] text-[15px] leading-7 text-white/45">
                                        {item.summary}
                                    </p>
                                </div>

                                {/* scope panel */}
                                <div className="feat-reveal flex flex-col justify-between border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                                    <div>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                                            Scope delivered
                                        </span>
                                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                                            {item.scope.map((s) => (
                                                <li
                                                    key={s}
                                                    className="border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[13px] font-medium text-white/60"
                                                >
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                                        <span className="text-[11px] text-white/35">
                                            {item.sector} · ELV programme
                                        </span>
                                        <Link
                                            href="/contact"
                                            className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-white transition-colors hover:text-[#f56616]"
                                        >
                                            Discuss similar
                                            <ArrowUpRight
                                                size={13}
                                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}