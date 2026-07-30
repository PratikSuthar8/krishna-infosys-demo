"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Building2,
    Factory,
    GraduationCap,
    HeartPulse,
    Home,
    Hotel,
    Landmark,
    Store,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const industries = [
    {
        id: "corporate",
        label: "Corporate",
        title: "Offices & campuses",
        detail:
            "Access, CCTV, meeting AV and structured networks for HQ, IT parks and multi-tower campuses.",
        focus: ["Access control", "Meeting room AV", "IP CCTV", "Wi-Fi"],
        icon: Building2,
    },
    {
        id: "healthcare",
        label: "Healthcare",
        title: "Hospitals & clinics",
        detail:
            "Life-safety aligned surveillance, nurse call, access zones and reliable backbone for critical floors.",
        focus: ["Nurse call", "Zone access", "CCTV", "PA"],
        icon: HeartPulse,
    },
    {
        id: "education",
        label: "Education",
        title: "Campuses & institutes",
        detail:
            "Campus security, classroom AV, PA and networking scaled for hostels, labs and lecture halls.",
        focus: ["Campus CCTV", "Classroom AV", "PA"],
        icon: GraduationCap,
    },
    {
        id: "hospitality",
        label: "Hospitality",
        title: "Hotels & resorts",
        detail:
            "Guest experience systems — access, surveillance, banquet AV and back-of-house communication.",
        focus: ["Guest access", "Surveillance", "AV"],
        icon: Hotel,
    },
    {
        id: "industrial",
        label: "Industrial",
        title: "Plants & logistics",
        detail:
            "Perimeter, plant-floor monitoring, gates and rugged communication for warehouses and factories.",
        focus: ["Perimeter", "Gates", "Plant CCTV"],
        icon: Factory,
    },
    {
        id: "government",
        label: "Government",
        title: "Public facilities",
        detail:
            "Compliant security, PA and networking for civic buildings, offices and regulated sites.",
        focus: ["Compliance", "CCTV", "Access"],
        icon: Landmark,
    },
    {
        id: "residential",
        label: "Residential",
        title: "Homes & communities",
        detail:
            "Video door phones, community surveillance, automation and shared amenities networks.",
        focus: ["VDP", "Automation", "Community CCTV"],
        icon: Home,
    },
    {
        id: "retail",
        label: "Retail",
        title: "Stores & malls",
        detail:
            "Loss-prevention CCTV, store access, digital signage and backbone for multi-outlet brands.",
        focus: ["LP CCTV", "Signage", "Access"],
        icon: Store,
    },
];

export function IndustriesMosaicSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".mosaic-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".mosaic-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".mosaic-cell", {
                y: 36,
                opacity: 0,
                duration: 0.7,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".mosaic-grid",
                    start: "top 78%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="mosaic"
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
                {/* INTRO — tighter */}
                <div className="mosaic-intro-wrap grid gap-6 border-b border-white/10 pb-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:gap-16 lg:pb-12">
                    <div className="mosaic-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Verticals
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="mosaic-intro max-w-[800px] text-[clamp(2rem,3.8vw,3.8rem)] font-medium leading-[0.96] tracking-[-0.055em]">
                            One engineering standard.
                            <span className="block text-white/35">
                                Eight operating contexts.
                            </span>
                        </h2>
                        <p className="mosaic-intro mt-4 max-w-[480px] text-[15px] leading-7 text-white/45">
                            Each cell is a sector we design for — hover for focus systems,
                            then scroll for deeper spotlights.
                        </p>
                    </div>
                </div>

                {/* EQUAL 4×2 GRID — no giant empty featured cell */}
                <div className="mosaic-grid mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-3">
                    {industries.map((item, index) => {
                        const Icon = item.icon;
                        const isLead = index === 0;

                        return (
                            <motion.article
                                key={item.id}
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                                className={`mosaic-cell group relative flex flex-col border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#f56616]/40 sm:p-6 ${isLead ? "sm:col-span-2 lg:col-span-2" : ""
                                    }`}
                            >
                                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-[#f56616] transition-transform duration-500 group-hover:scale-x-100" />

                                <div className="flex items-start justify-between gap-3">
                                    <span
                                        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ${isLead
                                                ? "border-[#f56616] bg-[#f56616] text-white"
                                                : "border-white/10 bg-white/[0.03] text-[#f56616] group-hover:border-[#f56616]/40"
                                            }`}
                                    >
                                        <Icon size={18} strokeWidth={1.45} />
                                    </span>
                                    <ArrowUpRight
                                        size={15}
                                        className="text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f56616]"
                                    />
                                </div>

                                <span className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
                                    {item.label}
                                </span>

                                <h3
                                    className={`mt-2 font-semibold tracking-[-0.03em] ${isLead ? "text-xl sm:text-2xl" : "text-lg"
                                        }`}
                                >
                                    {item.title}
                                </h3>

                                <p className="mt-3 flex-1 text-sm leading-6 text-white/45">
                                    {item.detail}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {item.focus.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/45"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[420px] text-sm text-white/40">
                        Need a vertical we have not listed? Most ELV briefs still map to
                        these operating patterns.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors hover:text-[#f56616]"
                    >
                        Describe your environment
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