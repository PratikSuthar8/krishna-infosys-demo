"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ClipboardCheck,
    FileText,
    Headphones,
    Package,
    RefreshCw,
    Shield,
    Timer,
    Wrench,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const modules = [
    {
        title: "Preventive maintenance",
        detail:
            "Scheduled health checks on cameras, access panels, recorders, PA and network nodes before faults become downtime.",
        icon: ClipboardCheck,
    },
    {
        title: "Corrective response",
        detail:
            "Priority ticket handling with defined response windows — including 24-hour corrective action on critical systems.",
        icon: Timer,
    },
    {
        title: "On-site engineering",
        detail:
            "Trained technicians for diagnosis, replacement and re-commissioning — not remote-only ticket ping-pong.",
        icon: Wrench,
    },
    {
        title: "Spares & continuity",
        detail:
            "Genuine OEM materials and planned spares strategy so repairs do not wait on ad-hoc procurement.",
        icon: Package,
    },
    {
        title: "Device traceability",
        detail:
            "Serial-level logs, install dates and service history so every asset stays accountable across its life.",
        icon: FileText,
    },
    {
        title: "OEM escalation",
        detail:
            "Manufacturer-backed escalation paths when warranty or complex module-level support is required.",
        icon: Shield,
    },
    {
        title: "System health reviews",
        detail:
            "Periodic reviews of recording retention, access rules, firmware posture and backup readiness.",
        icon: RefreshCw,
    },
    {
        title: "Single service desk",
        detail:
            "One accountable channel across security, communication, AV and networking — not vendor-by-vendor chasing.",
        icon: Headphones,
    },
];

export function AmcCoverageSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cov-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cov-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".cov-card", {
                y: 36,
                opacity: 0,
                duration: 0.7,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cov-grid",
                    start: "top 78%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="coverage"
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
                <div className="cov-intro-wrap grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="cov-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Coverage
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="cov-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            What stays under
                            <span className="block text-white/35">active care.</span>
                        </h2>
                        <p className="cov-intro mt-5 max-w-[520px] text-base leading-7 text-white/45">
                            AMC is not a spare-parts promise alone — it is preventive rhythm,
                            corrective speed and documentation that survives staff turnover.
                        </p>
                    </div>
                </div>

                <div className="cov-grid mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    {modules.map((item) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.title}
                                className="cov-card group border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#f56616]/35"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#f56616] transition-colors duration-300 group-hover:border-[#f56616]/40 group-hover:bg-[#f56616]/10">
                                    <Icon size={18} strokeWidth={1.5} />
                                </span>
                                <h3 className="mt-6 text-base font-semibold tracking-[-0.02em]">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-white/45">
                                    {item.detail}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}