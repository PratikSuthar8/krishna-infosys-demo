"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    Check,
    GitBranch,
    Layers,
    Link2,
    ShieldCheck,
    X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        icon: Layers,
        title: "Single design authority",
        detail:
            "One architecture across security, voice, AV, network and automation — no conflicting drawings or orphaned interfaces.",
    },
    {
        icon: Link2,
        title: "Clean system interfaces",
        detail:
            "Cameras, access, PA, switching and control planes planned together so traffic, power and pathways share one backbone.",
    },
    {
        icon: GitBranch,
        title: "One project spine",
        detail:
            "Dedicated PM and site supervision across trades — schedule, quality and documentation under a single accountability line.",
    },
    {
        icon: ShieldCheck,
        title: "Lifecycle ownership",
        detail:
            "Commissioning, training, AMC and escalation handled by the same team that designed and installed the system.",
    },
];

const comparison = [
    {
        label: "Design ownership",
        multi: "Split across vendors",
        single: "One integrated design",
    },
    {
        label: "On-site coordination",
        multi: "Multiple supervisors",
        single: "Single PM & site lead",
    },
    {
        label: "Interface risk",
        multi: "Finger-pointing gaps",
        single: "Defined system boundaries",
    },
    {
        label: "Documentation",
        multi: "Fragmented as-builts",
        single: "Unified handover pack",
    },
    {
        label: "After support",
        multi: "Vendor-by-vendor tickets",
        single: "One SLA & AMC desk",
    },
];

export function SolutionsIntegrationSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".int-reveal", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".int-intro",
                    start: "top 78%",
                    once: true,
                },
            });

            gsap.from(".int-pillar", {
                y: 40,
                opacity: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".int-pillars",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".int-row", {
                y: 24,
                opacity: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".int-compare",
                    start: "top 84%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="int-intro grid gap-10 border-b border-black/10 pb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                    <div className="int-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Integration
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="int-reveal max-w-[900px] text-[clamp(2.4rem,4.4vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Systems fail at the seams.
                            <span className="block text-black/30">
                                We design the seams out.
                            </span>
                        </h2>
                        <p className="int-reveal mt-6 max-w-[560px] text-base leading-7 text-black/50">
                            Multi-vendor installs create gaps between drawings, networks and
                            service desks. A single ELV partner keeps design, execution and
                            support on one accountable line.
                        </p>
                    </div>
                </div>

                {/* PILLARS */}
                <div className="int-pillars mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    {pillars.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                className="int-pillar group border border-black/[0.08] bg-white/80 p-6 transition-colors duration-300 hover:border-[#f56616]/30"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#f3f1ec] text-[#f56616] transition-colors duration-300 group-hover:border-[#f56616]/40 group-hover:bg-[#f56616]/10">
                                    <Icon size={17} strokeWidth={1.5} />
                                </span>
                                <h3 className="mt-6 text-base font-semibold tracking-[-0.02em]">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-black/50">
                                    {item.detail}
                                </p>
                            </article>
                        );
                    })}
                </div>

                {/* COMPARISON */}
                <div className="int-compare mt-16 overflow-hidden border border-black/10 bg-white lg:mt-20">
                    <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr_1fr]">
                        <div className="hidden border-b border-black/10 px-5 py-4 sm:block sm:px-7">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                Decision layer
                            </span>
                        </div>
                        <div className="hidden border-b border-l border-black/10 px-5 py-4 sm:block sm:px-7">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                Multi-vendor
                            </span>
                        </div>
                        <div className="hidden border-b border-l border-black/10 bg-[#171717] px-5 py-4 sm:block sm:px-7">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
                                Krishna Infosys
                            </span>
                        </div>
                    </div>

                    {comparison.map((row, index) => (
                        <div
                            key={row.label}
                            className={`int-row grid grid-cols-1 sm:grid-cols-[1.1fr_1fr_1fr] ${index < comparison.length - 1 ? "border-b border-black/10" : ""
                                }`}
                        >
                            <div className="flex items-center px-5 py-4 sm:px-7 sm:py-5">
                                <span className="text-sm font-semibold tracking-[-0.02em]">
                                    {row.label}
                                </span>
                            </div>

                            <div className="flex items-center gap-2.5 border-black/10 px-5 py-3 sm:border-l sm:px-7 sm:py-5">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/[0.06]">
                                    <X size={11} strokeWidth={2} className="text-black/35" />
                                </span>
                                <span className="text-sm text-black/45">{row.multi}</span>
                            </div>

                            <div className="flex items-center gap-2.5 border-black/10 bg-[#171717] px-5 py-3 sm:border-l sm:px-7 sm:py-5">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f56616]/15">
                                    <Check size={11} strokeWidth={2.5} className="text-[#f56616]" />
                                </span>
                                <span className="text-sm font-medium text-white/85">
                                    {row.single}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[520px] text-sm leading-6 text-black/45">
                        Integration is not a slide — it is how drawings, BOQs, racks and
                        service tickets stay coherent after handover.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f56616]">
                        <span>Design</span>
                        <ArrowRight size={12} />
                        <span>Execute</span>
                        <ArrowRight size={12} />
                        <span>Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
}