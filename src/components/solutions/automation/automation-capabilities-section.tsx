"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Check, Flame, Home } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
    {
        id: "home-automation",
        title: "Home Automation",
        summary:
            "Lighting, climate, shades and scenes for residences — control that feels simple day-to-day and integrates cleanly with security and AV where needed.",
        points: [
            "Lighting control & scenes",
            "Climate integration",
            "Shade / curtain control",
            "Touch / app interfaces",
            "Schedule & occupancy logic",
            "Security / AV handshakes",
        ],
        icon: Home,
    },
    {
        id: "building-automation",
        title: "Building Automation",
        summary:
            "Centralised control for commercial and multi-zone properties — lighting, HVAC interfaces and operational schedules under one logic layer.",
        points: [
            "Zone lighting control",
            "HVAC interface points",
            "Schedule & scene engines",
            "Central dashboards",
            "Energy-aware logic",
            "Multi-floor coordination",
        ],
        icon: Building2,
    },
    {
        id: "fire-alarm",
        title: "Fire Alarm System",
        summary:
            "Detection and notification infrastructure aligned to life-safety practice — panels, detectors, sounders and integration paths with PA / access where the brief requires.",
        points: [
            "Detection layout design",
            "Panel & loop architecture",
            "Sounder / strobe coverage",
            "Cause & effect logic",
            "PA / EVAC interfaces",
            "Access release interfaces",
        ],
        icon: Flame,
    },
];

export function AutomationCapabilitiesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".auto-cap-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".auto-cap-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".auto-cap-card", {
                y: 40,
                opacity: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".auto-cap-grid",
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
                <div className="auto-cap-intro-wrap grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="auto-cap-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Capabilities
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="auto-cap-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Control and safety
                            <span className="block text-white/35">as one practice.</span>
                        </h2>
                        <p className="auto-cap-intro mt-5 max-w-[520px] text-base leading-7 text-white/45">
                            Comfort automation and life-safety systems planned with the same
                            pathway discipline as the rest of the ELV stack.
                        </p>
                    </div>
                </div>

                <div className="auto-cap-grid mt-12 space-y-4 lg:mt-16">
                    {capabilities.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.id}
                                id={item.id}
                                className="auto-cap-card grid gap-8 border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#f56616]/30 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
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