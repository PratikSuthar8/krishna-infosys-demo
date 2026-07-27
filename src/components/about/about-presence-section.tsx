"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    MapPin,
    Phone,
    Mail,
    Building2,
    Globe2,
    ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { value: "24+", label: "Years of excellence", note: "Since 2001" },
    { value: "825+", label: "Satisfied clients", note: "Across verticals" },
    { value: "2,100+", label: "Projects delivered", note: "Pan-India" },
    { value: "<1.5%", label: "Complaint ratio", note: "Service discipline" },
];

const presence = [
    {
        icon: Building2,
        title: "Headquarters",
        detail: "Ahmedabad, Gujarat",
        sub: "Design · Engineering · Delivery hub",
    },
    {
        icon: Globe2,
        title: "Delivery footprint",
        detail: "Pan-India execution",
        sub: "Multi-site · Multi-city standards",
    },
    {
        icon: ShieldCheck,
        title: "Quality system",
        detail: "ISO 9001:2015",
        sub: "Process-controlled delivery",
    },
];

export function AboutPresenceSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".presence-reveal", {
                y: 40,
                opacity: 0,
                duration: 0.85,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            gsap.from(".presence-metric", {
                y: 28,
                opacity: 0,
                duration: 0.7,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".presence-metrics",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.from(".presence-card", {
                y: 32,
                opacity: 0,
                duration: 0.75,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".presence-grid",
                    start: "top 84%",
                    once: true,
                },
            });

            gsap.from(".presence-cta", {
                y: 36,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".presence-cta",
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
                        "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="grid gap-10 border-b border-black/10 pb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                    <div className="presence-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Presence
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="presence-reveal max-w-[900px] text-[clamp(2.4rem,4.4vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Built in Ahmedabad.
                            <span className="block text-black/30">
                                Delivered across India.
                            </span>
                        </h2>
                        <p className="presence-reveal mt-6 max-w-[560px] text-base leading-7 text-black/50">
                            A Gujarat-rooted engineering practice with pan-India project
                            capability — same design standards, documentation, and service
                            discipline on every site.
                        </p>
                    </div>
                </div>

                {/* METRICS */}
                <div className="presence-metrics mt-12 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    {metrics.map((item) => (
                        <div
                            key={item.label}
                            className="presence-metric border border-black/[0.08] bg-white/70 px-5 py-6 backdrop-blur-sm"
                        >
                            <div className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.05em] text-[#171717]">
                                {item.value}
                            </div>
                            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black/45">
                                {item.label}
                            </div>
                            <div className="mt-1 text-[12px] text-black/35">{item.note}</div>
                        </div>
                    ))}
                </div>

                {/* PRESENCE CARDS */}
                <div className="presence-grid mt-4 grid gap-3 lg:grid-cols-3 lg:gap-4">
                    {presence.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="presence-card group border border-black/[0.08] bg-white px-6 py-7 transition-colors duration-300 hover:border-[#f56616]/30"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#f3f1ec] text-[#f56616] transition-colors duration-300 group-hover:border-[#f56616]/40 group-hover:bg-[#f56616]/10">
                                        <Icon size={17} strokeWidth={1.5} />
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/30">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                                    {item.detail}
                                </div>
                                <p className="mt-2 text-sm text-black/45">{item.sub}</p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA BLOCK */}
                <div className="presence-cta relative mt-16 overflow-hidden border border-black/10 bg-[#171717] text-white lg:mt-20">
                    {/* subtle grid inside CTA */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.12]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />

                    <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16 lg:px-14 lg:py-16">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#f56616]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                    Start a project
                                </span>
                            </div>

                            <h3 className="mt-6 max-w-[640px] text-[clamp(2rem,3.6vw,3.6rem)] font-medium leading-[1] tracking-[-0.05em]">
                                Tell us about the environment.
                                <span className="block text-white/35">
                                    We’ll engineer the system.
                                </span>
                            </h3>

                            <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-white/45">
                                Security, communication, AV, networking or automation — one
                                design-led conversation to scope the right ELV stack for your
                                site.
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#f56616] px-7 py-3.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#171717]"
                                >
                                    Request consultation
                                    <ArrowUpRight
                                        size={15}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </Link>

                                <Link
                                    href="/solutions"
                                    className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/50 transition-colors hover:text-white"
                                >
                                    View solutions
                                    <ArrowUpRight
                                        size={14}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* contact strip */}
                        <div className="border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                                Direct contact
                            </span>

                            <div className="mt-5 space-y-4">
                                <a
                                    href="tel:+917940309999"
                                    className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    <Phone size={15} strokeWidth={1.5} className="text-[#f56616]" />
                                    <span>+91 79 4030 9999</span>
                                </a>

                                <a
                                    href="mailto:info@krishnainfosys.com"
                                    className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    <Mail size={15} strokeWidth={1.5} className="text-[#f56616]" />
                                    <span>info@krishnainfosys.com</span>
                                </a>

                                <div className="flex items-start gap-3 text-sm text-white/45">
                                    <MapPin
                                        size={15}
                                        strokeWidth={1.5}
                                        className="mt-0.5 shrink-0 text-[#f56616]"
                                    />
                                    <span className="leading-6">
                                        Ahmedabad, Gujarat
                                        <span className="mt-1 block text-[12px] text-white/30">
                                            Pan-India project delivery
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}