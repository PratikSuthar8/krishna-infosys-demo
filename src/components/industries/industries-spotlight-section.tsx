"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Building2,
    Check,
    Factory,
    HeartPulse,
    Hotel,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const spotlights = [
    {
        id: "corporate",
        number: "01",
        label: "Corporate",
        title: "Campuses that stay secure and meeting-ready.",
        summary:
            "From lobby access to boardroom AV and floor-wise CCTV — one design for HQ, IT parks and multi-building campuses.",
        points: [
            "Visitor & staff access zones",
            "Meeting room & huddle AV",
            "IP CCTV with central VMS",
            "Structured cabling & Wi-Fi",
        ],
        systems: "Security · AV · Networking · Access",
        icon: Building2,
    },
    {
        id: "healthcare",
        number: "02",
        label: "Healthcare",
        title: "Clinical floors with clear zones and call paths.",
        summary:
            "Surveillance, restricted access, nurse call and PA aligned to clinical workflows — not bolted on as afterthoughts.",
        points: [
            "Department access control",
            "Nurse call integration",
            "Critical-area CCTV",
            "Corridor & ward PA",
        ],
        systems: "Security · Communication · Life safety links",
        icon: HeartPulse,
    },
    {
        id: "hospitality",
        number: "03",
        label: "Hospitality",
        title: "Guest journey systems, back-of-house discipline.",
        summary:
            "Room access, public-area surveillance, banquet AV and staff communication under one accountable install.",
        points: [
            "Guest door access",
            "Public area CCTV",
            "Banquet & lobby AV",
            "Staff PA / intercom",
        ],
        systems: "Access · Surveillance · AV · Communication",
        icon: Hotel,
    },
    {
        id: "industrial",
        number: "04",
        label: "Industrial",
        title: "Perimeter, gates and plant visibility.",
        summary:
            "Rugged outdoor surveillance, boom barriers, plant-floor monitoring and shift communication for factories and logistics hubs.",
        points: [
            "Perimeter & gate control",
            "Plant / yard CCTV",
            "Boom barriers",
            "Shift PA & intercom",
        ],
        systems: "Perimeter · Access · CCTV · Communication",
        icon: Factory,
    },
];

export function IndustriesSpotlightSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".spot-intro", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".spot-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.utils.toArray<HTMLElement>(".spot-chapter").forEach((chapter) => {
                gsap.from(chapter.querySelectorAll(".spot-reveal"), {
                    y: 36,
                    opacity: 0,
                    duration: 0.75,
                    stagger: 0.07,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: chapter,
                        start: "top 75%",
                        once: true,
                    },
                });

                const watermark = chapter.querySelector(".spot-watermark");
                if (watermark) {
                    gsap.fromTo(
                        watermark,
                        { y: 40, opacity: 0.02 },
                        {
                            y: -20,
                            opacity: 0.05,
                            ease: "none",
                            scrollTrigger: {
                                trigger: chapter,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                }
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
                        "linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="spot-intro-wrap grid gap-8 border-b border-black/10 pb-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-16">
                    <div className="spot-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Spotlights
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="spot-intro max-w-[820px] text-[clamp(2.2rem,4vw,4.2rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            How the stack flexes
                            <span className="block text-black/30">by vertical.</span>
                        </h2>
                        <p className="spot-intro mt-5 max-w-[520px] text-base leading-7 text-black/50">
                            Four high-frequency environments — each with a distinct pressure
                            on security, communication and experience systems.
                        </p>
                    </div>
                </div>

                {/* CHAPTERS */}
                <div className="mt-6">
                    {spotlights.map((item, index) => {
                        const Icon = item.icon;
                        const reverse = index % 2 === 1;

                        return (
                            <article
                                key={item.id}
                                className="spot-chapter relative border-b border-black/10 py-16 lg:py-24"
                            >
                                <span
                                    aria-hidden="true"
                                    className="spot-watermark pointer-events-none absolute right-0 top-8 select-none text-[clamp(6rem,14vw,11rem)] font-semibold leading-none tracking-[-0.08em] text-black/[0.04]"
                                >
                                    {item.number}
                                </span>

                                <div
                                    className={`relative grid items-center gap-10 lg:gap-16 ${reverse
                                            ? "lg:grid-cols-[1fr_1.05fr]"
                                            : "lg:grid-cols-[1.05fr_1fr]"
                                        }`}
                                >
                                    {/* Copy block */}
                                    <div className={reverse ? "lg:order-2" : ""}>
                                        <div className="spot-reveal flex items-center gap-3">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f56616] text-white">
                                                <Icon size={20} strokeWidth={1.45} />
                                            </span>
                                            <div>
                                                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                                    {item.number} · {item.label}
                                                </span>
                                                <span className="mt-0.5 block text-[11px] text-black/40">
                                                    {item.systems}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="spot-reveal mt-8 max-w-[520px] text-[clamp(1.7rem,2.8vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.04em]">
                                            {item.title}
                                        </h3>

                                        <p className="spot-reveal mt-5 max-w-[480px] text-[15px] leading-7 text-black/50">
                                            {item.summary}
                                        </p>

                                        <div className="spot-reveal mt-8">
                                            <Link
                                                href="/contact"
                                                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#171717] transition-colors hover:text-[#f56616]"
                                            >
                                                Scope this vertical
                                                <ArrowUpRight
                                                    size={14}
                                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Points panel */}
                                    <div className={reverse ? "lg:order-1" : ""}>
                                        <div className="spot-reveal border border-black/[0.08] bg-white p-6 sm:p-8">
                                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                                Typical scope
                                            </span>
                                            <ul className="mt-5 space-y-3">
                                                {item.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-center gap-3 border-b border-black/[0.06] pb-3 last:border-0 last:pb-0"
                                                    >
                                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f56616]/10">
                                                            <Check
                                                                size={12}
                                                                strokeWidth={2.5}
                                                                className="text-[#f56616]"
                                                            />
                                                        </span>
                                                        <span className="text-[14px] font-medium text-black/70">
                                                            {point}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}