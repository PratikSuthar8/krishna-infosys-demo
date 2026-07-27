"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    BadgeCheck,
    BrainCircuit,
    FileCheck2,
    Headphones,
    ScanLine,
    ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        number: "01",
        title: "Technical depth",
        statement: "No guesswork on critical infrastructure.",
        description:
            "Experienced teams translate site conditions and operational needs into documented system architecture before execution begins.",
        proofs: ["AutoCAD-based design", "Parametric BOQ", "Integration planning"],
        icon: BrainCircuit,
    },
    {
        number: "02",
        title: "Supply integrity",
        statement: "What is specified is what gets delivered.",
        description:
            "Material integrity and documentation protect technical intent from specification through installation — with zero substitute components.",
        proofs: ["Genuine OEM only", "Documented devices", "Authorized channels"],
        icon: FileCheck2,
    },
    {
        number: "03",
        title: "Advanced capability",
        statement: "Built beyond the conventional.",
        description:
            "Modern surveillance and control systems extend into intelligent environments — AI-enabled, thermal, ANPR and integrated life-safety.",
        proofs: ["AI-enabled CCTV", "Thermal imaging", "ANPR systems"],
        icon: ScanLine,
    },
    {
        number: "04",
        title: "Service accountability",
        statement: "Responsibility continues after handover.",
        description:
            "Structured AMC, preventive maintenance and SLA-driven response keep systems reliable across their operational lifecycle.",
        proofs: ["Preventive maintenance", "SLA response", "Long-term support"],
        icon: Headphones,
    },
];

export function AboutValuesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".values-reveal", {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 76%",
                    once: true,
                },
            });

            gsap.from(".values-card", {
                y: 52,
                opacity: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".values-grid",
                    start: "top 80%",
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
                className="pointer-events-none absolute inset-0 opacity-[0.3]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px)",
                    backgroundSize: "96px 96px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 12%, black 90%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* Header */}
                <div className="grid gap-10 border-b border-black/10 pb-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:pb-18">
                    <div className="values-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Operating principles
                            </span>
                        </div>

                        <div className="mt-7 flex items-center gap-3 text-black/35">
                            <ShieldCheck size={16} strokeWidth={1.5} />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                                How work gets done
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="values-reveal max-w-[900px] text-[clamp(2.5rem,4.8vw,5rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Four principles.
                            <span className="block text-black/30">
                                One standard of delivery.
                            </span>
                        </h2>

                        <p className="values-reveal mt-7 max-w-[620px] text-base leading-7 text-black/50 sm:text-[17px]">
                            These are not marketing claims. They are the practical constraints
                            that shape design decisions, procurement, installation quality and
                            post-commissioning support.
                        </p>
                    </div>
                </div>

                {/* Values grid */}
                <div className="values-grid mt-0 grid border-black/10 lg:grid-cols-2">
                    {values.map((value, index) => {
                        const Icon = value.icon;

                        return (
                            <article
                                key={value.number}
                                className={`values-card group relative border-b border-black/10 py-10 sm:py-12 lg:min-h-[400px] lg:border-b-0 lg:p-12 xl:p-14 ${index % 2 === 1 ? "lg:border-l" : ""
                                    } ${index >= 2 ? "lg:border-t" : ""}`}
                            >
                                <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-[#f56616] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#f56616]">
                                            {value.number}
                                        </span>
                                        <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                                            {value.title}
                                        </div>
                                    </div>

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#f56616] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-[1.04]">
                                        <Icon size={24} strokeWidth={1.35} />
                                    </div>
                                </div>

                                <h3 className="mt-10 max-w-[480px] text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                                    {value.statement}
                                </h3>

                                <p className="mt-5 max-w-[480px] text-sm leading-7 text-black/48">
                                    {value.description}
                                </p>

                                <div className="mt-8 grid gap-0 border-t border-black/10 sm:grid-cols-3">
                                    {value.proofs.map((proof, proofIndex) => (
                                        <div
                                            key={proof}
                                            className={`flex items-start gap-2.5 py-4 ${proofIndex > 0
                                                    ? "border-t border-black/10 sm:border-l sm:border-t-0 sm:pl-4"
                                                    : ""
                                                } ${proofIndex > 0 ? "sm:pr-2" : "sm:pr-4"}`}
                                        >
                                            <BadgeCheck
                                                size={14}
                                                strokeWidth={1.6}
                                                className="mt-0.5 shrink-0 text-[#f56616]"
                                            />
                                            <span className="text-xs font-semibold leading-5 text-black/55">
                                                {proof}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}