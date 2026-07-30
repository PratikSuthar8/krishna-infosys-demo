"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Mic, Phone, Radio, Video } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
    {
        id: "epabx",
        title: "Intercom / EPABX",
        summary:
            "Voice infrastructure for offices, plants and campuses — IP or hybrid PBX with extensions, trunking and intercom paths that match how teams actually call.",
        points: [
            "EPABX / IP PBX design",
            "Extension & trunk planning",
            "Analog / IP intercom",
            "Operator console options",
            "Call routing & groups",
            "Integration with PA where needed",
        ],
        icon: Phone,
    },
    {
        id: "vc",
        title: "Video Conferencing",
        summary:
            "Meeting-room and boardroom VC that stays reliable — displays, codecs, cameras and network readiness sized for daily use, not demo day only.",
        points: [
            "Room size & layout design",
            "Camera & mic placement",
            "Codec / platform readiness",
            "Display & switching path",
            "Network QoS guidance",
            "User control simplicity",
        ],
        icon: Video,
    },
    {
        id: "pa",
        title: "Public Address",
        summary:
            "Zoned announcement systems for campuses, hospitals, factories and public buildings — clear speech coverage with emergency paging paths.",
        points: [
            "Zone mapping",
            "Speaker layout & SPL targets",
            "Amplifier & rack design",
            "Emergency paging inputs",
            "Background music options",
            "Integration with fire / EVAC",
        ],
        icon: Mic,
    },
    {
        id: "ftth",
        title: "FTTH / DTH",
        summary:
            "Distribution links for residential and multi-dwelling environments — fibre and DTH pathways planned with building risers and unit terminations.",
        points: [
            "FTTH pathway design",
            "DTH dish & multi-switch",
            "Riser & shaft planning",
            "Unit termination points",
            "Active equipment placement",
            "Service provider coordination",
        ],
        icon: Radio,
    },
];

export function CommunicationCapabilitiesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".com-cap-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".com-cap-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".com-cap-card", {
                y: 40,
                opacity: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".com-cap-grid",
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
                <div className="com-cap-intro-wrap grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="com-cap-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Capabilities
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="com-cap-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Voice, paging and
                            <span className="block text-white/35">meeting systems.</span>
                        </h2>
                        <p className="com-cap-intro mt-5 max-w-[520px] text-base leading-7 text-white/45">
                            Four communication pillars from the Solutions menu — each
                            designed to connect cleanly with networking and security where
                            the brief requires it.
                        </p>
                    </div>
                </div>

                <div className="com-cap-grid mt-12 space-y-4 lg:mt-16">
                    {capabilities.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.id}
                                id={item.id}
                                className="com-cap-card grid gap-8 border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#f56616]/30 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
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