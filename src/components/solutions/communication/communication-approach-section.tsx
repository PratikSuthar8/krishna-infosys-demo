"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    AudioLines,
    Cable,
    MapPinned,
    Radio,
    Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
    {
        icon: MapPinned,
        title: "Zones before speakers",
        detail:
            "PA and intercom coverage starts from operational zones — wards, floors, yards, lobbies — not from device count.",
    },
    {
        icon: AudioLines,
        title: "Speech clarity first",
        detail:
            "Paging and room audio sized for intelligibility. Loud is not the same as clear.",
    },
    {
        icon: Cable,
        title: "Pathway discipline",
        detail:
            "Voice, video and distribution links share planned risers and racks with the wider ELV backbone.",
    },
    {
        icon: Users,
        title: "Operator-simple controls",
        detail:
            "Consoles, room panels and paging stations designed so staff can run them without a specialist on call.",
    },
];

const phases = [
    {
        number: "01",
        title: "Use-case mapping",
        detail: "Who calls whom, which zones need paging, which rooms need VC.",
    },
    {
        number: "02",
        title: "System architecture",
        detail: "PBX/intercom topology, PA zones, VC rooms, FTTH/DTH paths.",
    },
    {
        number: "03",
        title: "Install & tune",
        detail: "Hardware, cabling, acoustic checks and operator training.",
    },
    {
        number: "04",
        title: "Support continuity",
        detail: "AMC coverage, spares logic and escalation for critical voice systems.",
    },
];

export function CommunicationApproachSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".com-apr-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".com-apr-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".com-apr-card", {
                y: 32,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".com-apr-principles",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".com-apr-phase", {
                y: 28,
                opacity: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".com-apr-phases",
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
                <div className="com-apr-intro-wrap grid gap-8 border-b border-black/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="com-apr-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Approach
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="com-apr-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Communication designed
                            <span className="block text-black/30">for daily operations.</span>
                        </h2>
                        <p className="com-apr-intro mt-5 max-w-[520px] text-base leading-7 text-black/50">
                            Every extension, zone and meeting room should match how the site
                            runs — shift changes, emergencies, guest flows and management
                            calls included.
                        </p>
                    </div>
                </div>

                <div className="com-apr-principles mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    {principles.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                className="com-apr-card border border-black/[0.08] bg-white p-6"
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

                <div className="com-apr-phases mt-16 border border-black/10 bg-white lg:mt-20">
                    <div className="border-b border-black/10 px-6 py-5 sm:px-8">
                        <div className="flex items-center gap-2">
                            <Radio size={16} className="text-[#f56616]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                                Delivery sequence
                            </span>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                        {phases.map((phase, index) => (
                            <div
                                key={phase.number}
                                className={`com-apr-phase border-black/10 px-6 py-7 sm:px-7 ${index % 2 === 1 ? "sm:border-l" : ""
                                    } ${index >= 2 ? "border-t lg:border-t-0" : ""} lg:border-l lg:first:border-l-0`}
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