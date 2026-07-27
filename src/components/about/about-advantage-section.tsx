"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    BadgeCheck,
    Boxes,
    ClipboardList,
    Headphones,
    PencilRuler,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const advantages = [
    {
        id: "turnkey",
        code: "T",
        title: "Turnkey Solutions",
        description:
            "End-to-end project delivery from design and BOQ through commissioning and structured AMC — one accountable partner.",
        icon: ClipboardList,
        span: "normal",
    },
    {
        id: "certified",
        code: "C",
        title: "Certified Experts",
        description:
            "Engineers certified by Honeywell, Bosch, Cisco and leading OEMs — technical depth before execution begins.",
        icon: BadgeCheck,
        span: "normal",
    },
    {
        id: "multibrand",
        code: "M",
        title: "Multi-Brand Expertise",
        description:
            "Best-in-class products from 25+ global technology partners, selected for the environment — not forced by a single catalogue.",
        icon: Boxes,
        span: "normal",
    },
    {
        id: "design",
        code: "D",
        title: "Custom Design",
        description:
            "Parametric BOQ and AutoCAD-based architecture engineered around site conditions, operations and scale.",
        icon: PencilRuler,
        span: "normal",
    },
    {
        id: "track",
        code: "P",
        title: "Proven Track Record",
        description:
            "2,100+ projects delivered with a service complaint ratio under 1.5% — discipline measured after handover.",
        icon: ShieldCheck,
        span: "featured",
        stats: [
            { value: "2,100+", label: "Projects" },
            { value: "<1.5%", label: "Complaint ratio" },
            { value: "825+", label: "Clients" },
        ],
    },
    {
        id: "support",
        code: "S",
        title: "24/7 Support & AMC",
        description:
            "Preventive maintenance, 24-hour corrective SLA and manufacturer-backed escalation when critical systems need it.",
        icon: Headphones,
        span: "normal",
    },
];

const principles = [
    {
        title: "Solution design",
        detail: "Parametric BOQ + AutoCAD heatmaps before a single cable is laid.",
    },
    {
        title: "Execution mastery",
        detail: "Dedicated Project Manager and Site Supervisor on every job.",
    },
    {
        title: "Full compliance",
        detail: "Device-level traceability — serial, install date, service log.",
    },
    {
        title: "Post-install support",
        detail: "4 preventive + 6 corrective visits per year under AMC.",
    },
];

export function AboutAdvantageSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".adv-intro-reveal", {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".adv-intro",
                    start: "top 78%",
                    once: true,
                },
            });

            gsap.from(".adv-card", {
                y: 48,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".adv-lattice",
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".adv-principle", {
                y: 28,
                opacity: 0,
                duration: 0.7,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".adv-principles",
                    start: "top 85%",
                    once: true,
                },
            });

            gsap.fromTo(
                ".adv-line",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: ".adv-principles",
                        start: "top 88%",
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#171717] text-white"
        >
            {/* technical grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.13]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO */}
                <div className="adv-intro grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-18">
                    <div className="adv-intro-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Why Krishna Infosys
                            </span>
                        </div>

                        <div className="mt-8 flex items-center gap-3 text-white/30">
                            <Sparkles size={15} strokeWidth={1.5} className="text-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                                The advantage lattice
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="adv-intro-reveal max-w-[900px] text-[clamp(2.5rem,4.6vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Not a vendor checklist.
                            <span className="block text-white/35">
                                An engineered advantage.
                            </span>
                        </h2>

                        <p className="adv-intro-reveal mt-7 max-w-[640px] text-base leading-7 text-white/48 sm:text-[17px]">
                            Six capabilities that compound — design depth, certified delivery,
                            multi-brand freedom, and service accountability measured after
                            commissioning.
                        </p>
                    </div>
                </div>

                {/* LATTICE */}
                <div className="adv-lattice mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-4">
                    {advantages.map((item) => {
                        const Icon = item.icon;
                        const featured = item.span === "featured";

                        return (
                            <motion.article
                                key={item.id}
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                                className={`adv-card group relative overflow-hidden border border-white/[0.08] transition-colors duration-300 hover:border-[#f56616]/35 ${featured
                                        ? "bg-[#1f1c19] sm:col-span-2 lg:col-span-1 lg:row-span-2"
                                        : "bg-white/[0.02]"
                                    }`}
                            >
                                {/* top accent on hover */}
                                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-[#f56616] transition-transform duration-500 group-hover:scale-x-100" />

                                <div
                                    className={`flex h-full flex-col p-6 sm:p-7 ${featured ? "lg:p-8" : ""
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#f56616] transition-colors duration-300 group-hover:border-[#f56616]/40 group-hover:bg-[#f56616]/10">
                                                <Icon size={16} strokeWidth={1.5} />
                                            </span>
                                            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#f56616]">
                                                {item.code}
                                            </span>
                                        </div>

                                        <ArrowUpRight
                                            size={15}
                                            className="text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f56616]"
                                        />
                                    </div>

                                    <h3
                                        className={`mt-8 font-semibold tracking-[-0.03em] ${featured
                                                ? "text-[clamp(1.5rem,2.2vw,2rem)]"
                                                : "text-lg sm:text-xl"
                                            }`}
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className={`mt-4 leading-7 text-white/42 ${featured ? "text-[15px]" : "text-sm"
                                            }`}
                                    >
                                        {item.description}
                                    </p>

                                    {featured && item.stats && (
                                        <div className="mt-auto grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                                            {item.stats.map((stat) => (
                                                <div key={stat.label}>
                                                    <div className="text-xl font-semibold tracking-[-0.04em] text-[#f56616] sm:text-2xl">
                                                        {stat.value}
                                                    </div>
                                                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {!featured && <div className="mt-auto pt-6" />}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* TECHNocratic principles strip */}
                <div className="adv-principles mt-16 border border-white/10 lg:mt-20">
                    <div className="adv-line h-[2px] origin-left bg-[#f56616]" />

                    <div className="grid lg:grid-cols-[0.55fr_1.45fr]">
                        <div className="border-b border-white/10 px-6 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                                Technocratic advantage
                            </span>
                            <p className="mt-4 max-w-[280px] text-lg font-medium leading-snug tracking-[-0.03em] text-white/80">
                                How the work is actually controlled on every project.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2">
                            {principles.map((item, index) => (
                                <div
                                    key={item.title}
                                    className={`adv-principle border-white/10 px-6 py-6 sm:px-7 ${index % 2 === 1 ? "sm:border-l" : ""
                                        } ${index >= 2 ? "border-t" : ""} ${index === 1 ? "border-t sm:border-t-0" : ""
                                        } ${index === 0 ? "border-t sm:border-t-0" : ""}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[9px] text-[#f56616]">
                                            0{index + 1}
                                        </span>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/35">
                                            {item.title}
                                        </span>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-white/50">
                                        {item.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}