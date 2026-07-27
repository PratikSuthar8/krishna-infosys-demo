"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Building2,
    Cpu,
    Network,
    Radio,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        year: "2001",
        phase: "Origin",
        title: "Founded",
        headline: "Servers & networking first.",
        description:
            "Krishna Infosys began with computer hardware, servers and networking — building the technical foundation that would later support complex ELV environments.",
        detail: "Computer hardware and peripherals",
        icon: Cpu,
    },
    {
        year: "2007",
        phase: "Pivot",
        title: "ELV start",
        headline: "From products to systems.",
        description:
            "The practice expanded into Extra Low Voltage — firewall, Wi-Fi, CCTV, video door phones and public address under one engineering approach.",
        detail: "Firewall · Wi-Fi · CCTV · VDP · PA",
        icon: ShieldCheck,
    },
    {
        year: "2012",
        phase: "Expansion",
        title: "Capability depth",
        headline: "Life safety and access joined the stack.",
        description:
            "Fire alarm, access control and EPABX extended the portfolio — moving from isolated installs toward integrated building systems.",
        detail: "Fire alarm · Access control · EPABX",
        icon: Radio,
    },
    {
        year: "2017",
        phase: "Innovation",
        title: "AV & automation",
        headline: "Experience systems entered the brief.",
        description:
            "Home automation, video walls and professional AV expanded delivery into residential, hospitality and experience-led environments.",
        detail: "Home automation · Video walls · AV",
        icon: Sparkles,
    },
    {
        year: "2019",
        phase: "Scale",
        title: "Pan-India reach",
        headline: "Multi-site execution, one standard.",
        description:
            "Delivery capability extended across India — supporting multi-city deployments while holding the same design, documentation and service discipline.",
        detail: "Pan-India project execution",
        icon: Network,
    },
    {
        year: "Today",
        phase: "Present",
        title: "Integrated partner",
        headline: "2,100+ projects. One accountable model.",
        description:
            "825+ clients and 2,100+ projects later — design-led ELV systems with genuine OEM sourcing, traceability and lifecycle support under ISO 9001:2015.",
        detail: "24+ years · <1.5% complaint ratio · ISO 9001:2015",
        icon: Building2,
    },
];

function StageIcon({
    index,
    size = 34,
}: {
    index: number;
    size?: number;
}) {
    const Icon = milestones[index].icon;
    return <Icon size={size} strokeWidth={1.35} />;
}

export function AboutStorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);
    const iconWrapRef = useRef<HTMLDivElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);

    const [activeStage, setActiveStage] = useState(0);

    /* ── pinned desktop journey ── */
    useEffect(() => {
        const section = sectionRef.current;
        const journey = journeyRef.current;
        const panel = panelRef.current;
        if (!section || !journey || !panel) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            gsap.from(".story-intro-reveal", {
                y: 42,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".story-intro",
                    start: "top 82%",
                    once: true,
                },
            });

            gsap.to(".story-orbit", {
                rotate: 360,
                duration: 48,
                repeat: -1,
                ease: "none",
                transformOrigin: "50% 50%",
            });

            mm.add("(min-width: 1024px)", () => {
                const stageCount = milestones.length;

                const updateStage = (index: number) => {
                    const next = Math.max(0, Math.min(stageCount - 1, index));
                    setActiveStage((current) =>
                        current === next ? current : next
                    );
                };

                const trigger = ScrollTrigger.create({
                    trigger: journey,
                    start: "top top+=118",
                    end: `+=${stageCount * 320}`,
                    pin: panel,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 0.65,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const raw = self.progress * stageCount;
                        const index = Math.min(
                            stageCount - 1,
                            Math.floor(raw)
                        );
                        updateStage(index);

                        gsap.set(progressRef.current, {
                            scaleX: self.progress,
                            transformOrigin: "left center",
                        });
                    },
                });

                return () => {
                    trigger.kill();
                };
            });

            mm.add("(max-width: 1023px)", () => {
                const cards =
                    gsap.utils.toArray<HTMLElement>(".mobile-story-card");

                cards.forEach((card) => {
                    gsap.from(card, {
                        y: 34,
                        opacity: 0,
                        duration: 0.75,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 86%",
                            once: true,
                        },
                    });
                });
            });
        }, section);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    /* ── stage change micro-animation ── */
    useEffect(() => {
        const number = numberRef.current;
        const icon = iconWrapRef.current;
        const copy = copyRef.current;
        if (!number || !icon || !copy) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                number,
                { y: 22, opacity: 0.12, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.55,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                icon,
                { scale: 0.82, rotate: -8, opacity: 0 },
                {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                }
            );

            gsap.fromTo(
                copy.children,
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: "power3.out",
                }
            );
        });

        return () => ctx.revert();
    }, [activeStage]);

    const active = milestones[activeStage];

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#171717] text-white"
        >
            {/* Technical grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 10%, black 92%, transparent)",
                }}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-52 top-24 hidden h-[520px] w-[520px] rounded-full border border-white/[0.04] lg:block"
            >
                <div className="story-orbit absolute inset-12 rounded-full border border-dashed border-[#f56616]/15">
                    <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f56616]" />
                </div>
                <div className="absolute inset-28 rounded-full border border-white/[0.05]" />
            </div>

            {/* INTRO */}
            <div className="story-intro relative mx-auto max-w-[1500px] px-5 pb-14 pt-20 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24 xl:px-16">
                <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
                    <div className="story-intro-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Our journey
                            </span>
                        </div>
                        <div className="mt-8 font-mono text-[11px] tracking-[0.12em] text-white/30">
                            2001 — PRESENT · 24+ YEARS
                        </div>
                    </div>

                    <div>
                        <h2 className="story-intro-reveal max-w-[900px] text-[clamp(2.6rem,4.8vw,5.1rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Built through discipline.
                            <span className="block text-white/35">
                                Not through shortcuts.
                            </span>
                        </h2>

                        <div className="story-intro-reveal mt-7 grid max-w-[850px] gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
                            <p className="text-base leading-7 text-white/55 sm:text-[17px]">
                                From servers and networking in 2001 to integrated ELV
                                infrastructure today — every stage expanded capability without
                                diluting engineering standards.
                            </p>
                            <p className="text-sm leading-7 text-white/40 sm:text-[15px]">
                                Scroll through the journey. Each milestone reflects how the
                                practice deepened — from products to systems, from Gujarat to
                                pan-India delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DESKTOP PINNED JOURNEY */}
            <div ref={journeyRef} className="relative hidden lg:block">
                <div
                    ref={panelRef}
                    className="relative mx-auto h-[calc(100vh-118px)] min-h-[610px] max-h-[790px] max-w-[1500px] px-12 xl:px-16"
                >
                    <div className="flex h-full flex-col border-t border-white/[0.08]">
                        {/* Stage nav + progress */}
                        <div className="relative shrink-0 py-6">
                            <div className="absolute left-0 right-0 top-[47px] h-px bg-white/10" />
                            <div
                                ref={progressRef}
                                className="absolute left-0 right-0 top-[47px] h-px origin-left scale-x-0 bg-[#f56616]"
                            />

                            <div className="relative grid grid-cols-6">
                                {milestones.map((stage, index) => {
                                    const Icon = stage.icon;
                                    const current = index === activeStage;
                                    const completed = index < activeStage;

                                    return (
                                        <div
                                            key={stage.year}
                                            className="group relative flex items-center gap-3 text-left"
                                        >
                                            <div
                                                className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${current
                                                        ? "border-[#f56616] bg-[#f56616] text-white shadow-[0_0_35px_rgba(245,102,22,0.18)]"
                                                        : completed
                                                            ? "border-[#f56616]/50 bg-[#251b16] text-[#f56616]"
                                                            : "border-white/15 bg-[#171717] text-white/30"
                                                    }`}
                                            >
                                                <Icon size={15} strokeWidth={1.6} />
                                            </div>

                                            <div className="hidden xl:block">
                                                <span
                                                    className={`block text-[9px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${current || completed
                                                            ? "text-[#f56616]"
                                                            : "text-white/25"
                                                        }`}
                                                >
                                                    {stage.year}
                                                </span>
                                                <span
                                                    className={`mt-0.5 block text-[12px] font-semibold transition-colors duration-500 ${current
                                                            ? "text-white"
                                                            : completed
                                                                ? "text-white/60"
                                                                : "text-white/28"
                                                        }`}
                                                >
                                                    {stage.title}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Main composition */}
                        <div className="grid min-h-0 flex-1 grid-cols-[0.72fr_1.28fr] items-center gap-14 border-t border-white/[0.06]">
                            {/* Visual */}
                            <div className="relative flex h-full min-h-[390px] items-center justify-center overflow-hidden">
                                <div className="absolute left-0 top-1/2 h-px w-[78%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

                                <div className="absolute h-[310px] w-[310px] rounded-full border border-white/[0.05]" />
                                <div className="absolute h-[235px] w-[235px] rounded-full border border-dashed border-white/[0.08]" />
                                <div className="absolute h-[155px] w-[155px] rounded-full border border-[#f56616]/15 bg-[#f56616]/[0.025]" />

                                <div
                                    key={`number-${activeStage}`}
                                    ref={numberRef}
                                    className="pointer-events-none absolute select-none text-[clamp(9rem,15vw,15rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.035]"
                                >
                                    {active.year === "Today" ? "NOW" : active.year.slice(2)}
                                </div>

                                <motion.div
                                    key={`icon-${activeStage}`}
                                    ref={iconWrapRef}
                                    whileHover={{ scale: 1.06, rotate: 3 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 240,
                                        damping: 18,
                                    }}
                                    className="relative z-10 flex h-[108px] w-[108px] items-center justify-center rounded-full border border-[#f56616]/35 bg-[#241a15] text-[#f56616] shadow-[0_20px_80px_rgba(0,0,0,0.32)]"
                                >
                                    <StageIcon index={activeStage} size={34} />
                                </motion.div>

                                <span className="absolute right-[19%] top-[25%] h-2 w-2 rounded-full bg-[#f56616]" />
                                <span className="absolute bottom-[25%] left-[18%] h-1.5 w-1.5 rounded-full bg-white/25" />

                                <div className="absolute bottom-7 left-0 flex items-center gap-3">
                                    <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/25">
                                        Journey
                                    </span>
                                    <span className="h-px w-14 bg-white/10" />
                                    <span className="text-[10px] font-semibold text-[#f56616]">
                                        {active.year}
                                    </span>
                                </div>
                            </div>

                            {/* Dynamic copy */}
                            <div
                                key={`copy-${activeStage}`}
                                ref={copyRef}
                                className="max-w-[790px] py-8"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#f56616]">
                                        {active.phase}
                                    </span>
                                    <span className="h-px flex-1 bg-white/[0.09]" />
                                    <span className="font-mono text-[11px] text-white/30">
                                        {String(activeStage + 1).padStart(2, "0")}
                                        <span className="mx-2 text-white/15">/</span>
                                        06
                                    </span>
                                </div>

                                <h3 className="mt-7 max-w-[780px] text-[clamp(2.6rem,4vw,4.2rem)] font-medium leading-[0.96] tracking-[-0.05em]">
                                    {active.headline}
                                </h3>

                                <p className="mt-6 max-w-[640px] text-[17px] leading-8 text-white/48">
                                    {active.description}
                                </p>

                                <div className="mt-8 border-t border-white/10 pt-5">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                                        Focus
                                    </span>
                                    <p className="mt-2 text-sm font-medium text-white/55">
                                        {active.detail}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
                                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
                                        {active.title} · {active.year}
                                    </span>
                                    <ArrowUpRight size={15} className="text-[#f56616]/70" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE / TABLET */}
            <div className="relative mx-auto max-w-[1500px] px-5 pb-10 sm:px-8 lg:hidden">
                <div className="mb-7 flex items-center justify-between border-y border-white/[0.08] py-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#f56616]">
                        24+ years of excellence
                    </span>
                    <span className="font-mono text-[10px] text-white/30">01 — 06</span>
                </div>

                <div>
                    {milestones.map((stage) => {
                        const Icon = stage.icon;

                        return (
                            <article
                                key={stage.year}
                                className="mobile-story-card border-b border-white/[0.08] py-9 first:pt-3 sm:py-12"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f56616]/30 bg-[#f56616]/10 text-[#f56616]">
                                            <Icon size={18} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                                {stage.year}
                                            </span>
                                            <span className="mt-0.5 block text-sm font-semibold">
                                                {stage.title}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="select-none text-5xl font-semibold tracking-[-0.08em] text-white/[0.04] sm:text-6xl">
                                        {stage.year === "Today" ? "NOW" : stage.year.slice(2)}
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <div className="flex items-center gap-3">
                                        <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                            {stage.phase}
                                        </span>
                                        <span className="h-px flex-1 bg-white/[0.08]" />
                                    </div>

                                    <h3 className="mt-5 text-[clamp(1.8rem,7vw,3rem)] font-medium leading-[1] tracking-[-0.04em]">
                                        {stage.headline}
                                    </h3>

                                    <p className="mt-5 max-w-[680px] text-sm leading-7 text-white/50 sm:text-base">
                                        {stage.description}
                                    </p>

                                    <p className="mt-5 text-xs font-medium text-white/35">
                                        {stage.detail}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            {/* Bottom proof strip */}
            <div className="relative border-t border-white/[0.08]">
                <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12 lg:py-14 xl:px-16">
                    {[
                        { value: "2,100+", label: "Projects delivered" },
                        { value: "825+", label: "Happy clients" },
                        { value: "24+", label: "Years experience" },
                        { value: "<1.5%", label: "Complaint ratio" },
                    ].map((item) => (
                        <div key={item.label} className="border-l border-white/10 pl-5">
                            <div className="text-2xl font-semibold tracking-[-0.04em] text-[#f56616]">
                                {item.value}
                            </div>
                            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}