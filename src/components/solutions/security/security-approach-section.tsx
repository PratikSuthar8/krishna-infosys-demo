"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Eye,
    FileStack,
    Network,
    ShieldCheck,
    Workflow,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
    {
        icon: Eye,
        title: "Coverage before catalogue",
        detail:
            "Camera and sensor placement starts from risk zones, sightlines and operations — not from a product list.",
    },
    {
        icon: Network,
        title: "Shared backbone",
        detail:
            "CCTV, access and alarms planned on one network/power strategy so pathways and racks stay coherent.",
    },
    {
        icon: Workflow,
        title: "Response-ready design",
        detail:
            "Monitoring, alerts and door logic designed for how guards and admins actually work on site.",
    },
    {
        icon: FileStack,
        title: "Documented handover",
        detail:
            "As-built views, credential matrices and device records so service is not tribal knowledge.",
    },
];

const phases = [
    {
        number: "01",
        title: "Survey & risk map",
        detail: "Entries, perimeters, high-value zones and workflow constraints.",
    },
    {
        number: "02",
        title: "Architecture & BOQ",
        detail: "Camera schedule, access points, storage sizing, power and network.",
    },
    {
        number: "03",
        title: "Install & commission",
        detail: "Staged installation, testing, user training and live cutover.",
    },
    {
        number: "04",
        title: "Operate & maintain",
        detail: "AMC visits, corrective SLA and OEM escalation when needed.",
    },
];

export function SecurityApproachSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".apr-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".apr-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".apr-card", {
                y: 32,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".apr-principles",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".apr-phase", {
                y: 28,
                opacity: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".apr-phases",
                    start: "top 85%",
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
                        "linear-gradient(to bottom, transparent, black 8%, black 94%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="apr-intro-wrap grid gap-8 border-b border-black/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="apr-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Approach
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="apr-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Security engineered
                            <span className="block text-black/30">as infrastructure.</span>
                        </h2>
                        <p className="apr-intro mt-5 max-w-[520px] text-base leading-7 text-black/50">
                            Not a pile of cameras and readers — a designed system with clear
                            coverage logic, network discipline and service continuity.
                        </p>
                    </div>
                </div>

                {/* PRINCIPLES */}
                <div className="apr-principles mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    {principles.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                className="apr-card border border-black/[0.08] bg-white p-6"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                                    <Icon size={17} strokeWidth={1.5} />
                                </span>
                                <h3 className="mt-5 text-base font-semibold tracking-[-0.02em]">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-black/50">
                                    {item.detail}
                                </p>
                            </article>
                        );
                    })}
                </div>

                {/* PHASES */}
                <div className="apr-phases mt-16 border border-black/10 bg-white lg:mt-20">
                    <div className="border-b border-black/10 px-6 py-5 sm:px-8">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-[#f56616]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                                Delivery sequence
                            </span>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                        {phases.map((phase, index) => (
                            <div
                                key={phase.number}
                                className={`apr-phase border-black/10 px-6 py-7 sm:px-7 ${index % 2 === 1 ? "sm:border-l" : ""
                                    } ${index >= 2 ? "border-t" : ""} ${index === 1 ? "border-t sm:border-t-0" : ""
                                    } ${index === 0 ? "" : ""} lg:border-t-0 lg:border-l lg:first:border-l-0`}
                            >
                                <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#f56616]">
                                    {phase.number}
                                </span>
                                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">
                                    {phase.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-black/50">
                                    {phase.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}