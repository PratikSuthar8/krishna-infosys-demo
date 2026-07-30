"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Cctv,
    DoorOpen,
    Shield,
    Siren,
    SquareStack,
    Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
    {
        id: "cctv",
        title: "CCTV Surveillance",
        summary:
            "IP camera architecture with the right mix of fixed, PTZ and analytic-ready views — designed for coverage, retention and usable evidence.",
        points: [
            "IP CCTV design & BOQ",
            "Indoor / outdoor coverage plans",
            "NVR / VMS recording strategy",
            "Remote monitoring readiness",
            "Analytics-ready camera selection",
            "Storage & retention sizing",
        ],
        icon: Cctv,
    },
    {
        id: "access",
        title: "Access Control",
        summary:
            "Door, turnstile and zone control for staff, visitors and restricted areas — with clear anti-passback and audit trails where required.",
        points: [
            "Card / biometric readers",
            "Controller & door hardware",
            "Visitor vs staff zoning",
            "Time-based access rules",
            "Elevator / wing control",
            "Event logs & reports",
        ],
        icon: DoorOpen,
    },
    {
        id: "intrusion",
        title: "Intrusion Alarm",
        summary:
            "Detection layers for perimeter and interiors — integrated with response procedures, not isolated siren boxes.",
        points: [
            "PIR / magnetic contacts",
            "Perimeter detection options",
            "Zone programming",
            "Alarm panel integration",
            "Armed / disarmed schedules",
            "Notification paths",
        ],
        icon: Siren,
    },
    {
        id: "barrier",
        title: "Boom Barrier",
        summary:
            "Vehicle entry control for campuses, plants and parking — coordinated with access credentials and guard workflows.",
        points: [
            "Barrier & loop design",
            "RFID / ANPR options",
            "Guard booth integration",
            "Safety edges & sensors",
            "Entry / exit logic",
            "Service access planning",
        ],
        icon: SquareStack,
    },
    {
        id: "vdp",
        title: "Video Door Phone",
        summary:
            "Visitor verification at residences, lobbies and gated entries — with indoor stations and optional mobile connectivity.",
        points: [
            "Villa / apartment VDP",
            "Lobby & gate stations",
            "Indoor monitor layout",
            "Door release integration",
            "Multi-unit wiring plans",
            "Upgrade paths to IP",
        ],
        icon: Shield,
    },
];

export function SecurityCapabilitiesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cap-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cap-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".cap-card", {
                y: 40,
                opacity: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cap-grid",
                    start: "top 78%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="capabilities"
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
                <div className="cap-intro-wrap grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="cap-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Capabilities
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="cap-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Five systems.
                            <span className="block text-white/35">
                                One security layer.
                            </span>
                        </h2>
                        <p className="cap-intro mt-5 max-w-[520px] text-base leading-7 text-white/45">
                            Each capability can stand alone — or combine into a site-wide
                            security architecture with shared monitoring and service.
                        </p>
                    </div>
                </div>

                <div className="cap-grid mt-12 space-y-4 lg:mt-16">
                    {capabilities.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.id}
                                id={item.id}
                                className="cap-card grid gap-8 border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#f56616]/30 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
                            >
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f56616]/35 bg-[#f56616]/10 text-[#f56616]">
                                            <Icon size={20} strokeWidth={1.45} />
                                        </span>
                                        <div>
                                            <span className="block font-mono text-[10px] tracking-[0.14em] text-[#f56616]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="mt-5 max-w-[420px] text-[15px] leading-7 text-white/45">
                                        {item.summary}
                                    </p>
                                </div>

                                <ul className="grid gap-2 sm:grid-cols-2">
                                    {item.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-center gap-2.5 border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[13px] font-medium text-white/60"
                                        >
                                            <Check
                                                size={13}
                                                strokeWidth={2.5}
                                                className="shrink-0 text-[#f56616]"
                                            />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}