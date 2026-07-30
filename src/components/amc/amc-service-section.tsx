"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ClipboardList,
    MessageSquareWarning,
    Search,
    CheckCircle2,
    FileCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "Report",
        detail:
            "Issue logged through a single service desk — phone, email or portal — with site, system and severity captured up front.",
        icon: MessageSquareWarning,
    },
    {
        number: "02",
        title: "Triage",
        detail:
            "Ticket classified by criticality. Critical ELV faults enter the 24-hour corrective window; routine items join the planned queue.",
        icon: ClipboardList,
    },
    {
        number: "03",
        title: "Diagnose",
        detail:
            "Remote checks where possible, then on-site engineering for hardware, cabling, configuration or integration faults.",
        icon: Search,
    },
    {
        number: "04",
        title: "Restore",
        detail:
            "Repair or replace with genuine materials, re-test the zone, and confirm the system path is operational again.",
        icon: CheckCircle2,
    },
    {
        number: "05",
        title: "Record",
        detail:
            "Service log updated against device history — serial, action taken, parts used — so the next visit starts with full context.",
        icon: FileCheck,
    },
];

const sla = [
    { label: "Critical response", value: "24 hours" },
    { label: "Preventive visits", value: "As per AMC plan" },
    { label: "Corrective visits", value: "SLA-bound" },
    { label: "Escalation", value: "OEM-backed" },
];

export function AmcServiceSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".svc-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".svc-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".svc-step", {
                y: 40,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".svc-steps",
                    start: "top 78%",
                    once: true,
                },
            });

            gsap.from(".svc-sla", {
                y: 24,
                opacity: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".svc-sla-grid",
                    start: "top 88%",
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
                <div className="svc-intro-wrap grid gap-8 border-b border-black/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="svc-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Service model
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="svc-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            From ticket to
                            <span className="block text-black/30">restored system.</span>
                        </h2>
                        <p className="svc-intro mt-5 max-w-[520px] text-base leading-7 text-black/50">
                            A clear path every time — so operations teams know what happens
                            after they raise an issue, and what gets written back into the
                            asset record.
                        </p>
                    </div>
                </div>

                {/* STEPS */}
                <div className="svc-steps relative mt-12 lg:mt-16">
                    {/* vertical line desktop */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 left-[27px] top-0 hidden w-px bg-black/10 lg:block"
                    />

                    <div className="space-y-0">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.number}
                                    className={`svc-step relative grid gap-6 border-b border-black/10 py-10 lg:grid-cols-[56px_1fr_1.2fr] lg:gap-10 lg:py-12 ${index === steps.length - 1 ? "border-b-0" : ""
                                        }`}
                                >
                                    {/* node */}
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#f56616]/40 bg-[#f3f1ec] text-[#f56616]">
                                        <Icon size={20} strokeWidth={1.5} />
                                    </div>

                                    <div>
                                        <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#f56616]">
                                            {step.number}
                                        </span>
                                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                                            {step.title}
                                        </h3>
                                    </div>

                                    <p className="text-[15px] leading-7 text-black/50 lg:pt-6">
                                        {step.detail}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* SLA strip */}
                <div className="svc-sla-grid mt-6 grid grid-cols-2 gap-3 border border-black/10 bg-white lg:mt-10 lg:grid-cols-4">
                    {sla.map((item) => (
                        <div
                            key={item.label}
                            className="svc-sla border-black/10 px-5 py-5 even:border-l lg:border-l lg:first:border-l-0"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                                {item.label}
                            </div>
                            <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[#171717]">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}