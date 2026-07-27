"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Eye,
    Gem,
    Handshake,
    Lightbulb,
    Scale,
    Target,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
    {
        id: "vision",
        number: "01",
        label: "Vision",
        eyebrow: "Where we are headed",
        title: "India's most trusted ELV systems integrator.",
        description:
            "Transforming every building into a secure, intelligent, and connected environment — measured by accountability, not by product catalogues.",
        icon: Eye,
        letter: "V",
    },
    {
        id: "mission",
        number: "02",
        label: "Mission",
        eyebrow: "How we deliver",
        title: "Turnkey ELV with precision, integrity, and innovation.",
        description:
            "Ensuring safety, security, and smart automation for every project — from engineered design through commissioning and lifecycle support.",
        icon: Target,
        letter: "M",
    },
    {
        id: "values",
        number: "03",
        label: "Values",
        eyebrow: "What we refuse to compromise",
        title: "Integrity. Innovation. Commitment. Excellence.",
        description:
            "Four operating principles that govern design decisions, procurement, installation quality, and post-handover service.",
        icon: Gem,
        letter: "I·N·C·E",
    },
];

const coreValues = [
    { letter: "I", title: "Integrity", detail: "Transparent and ethical operations", icon: Scale },
    { letter: "N", title: "Innovation", detail: "Cutting-edge technology solutions", icon: Lightbulb },
    { letter: "C", title: "Commitment", detail: "Client-first approach always", icon: Handshake },
    { letter: "E", title: "Excellence", detail: "Quality in every detail", icon: Gem },
];

const ORBIT_R = 175;
const NODE_COUNT = 3;

/** Active seat: upper-left (between left 180° and top 270°) */
const FOCUS_ANGLE = 210;

/** 0° = right, 90° = bottom, 180° = left, 270° = top */
function posOnOrbit(angleDeg: number, r: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

function normalizeAngle(deg: number) {
    return ((deg % 360) + 360) % 360;
}

/**
 * Weighted scroll → stage index
 * Vision  0.00 – 0.28
 * Mission 0.28 – 0.56
 * Values  0.56 – 1.00  (extra scroll time)
 */
function progressToStage(p: number) {
    if (p < 0.28) return 0;
    if (p < 0.56) return 1;
    return 2;
}

/**
 * Rotation so node `stage` sits on FOCUS_ANGLE.
 * Node i base angle = i * 120
 * We need: i * 120 + rotation ≡ FOCUS  →  rotation = FOCUS - i * 120
 */
function stageToRotation(stage: number) {
    return FOCUS_ANGLE - stage * (360 / NODE_COUNT);
}

export function AboutMissionSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeRef = useRef(0);

    useEffect(() => {
        const section = sectionRef.current;
        const journey = journeyRef.current;
        const panel = panelRef.current;
        if (!section || !journey || !panel) return;

        const mm = gsap.matchMedia();

        const placeNodes = (rotation: number) => {
            nodes.forEach((_, i) => {
                const el = nodeRefs.current[i];
                if (!el) return;
                const angle = (360 / NODE_COUNT) * i + rotation;
                const { x, y } = posOnOrbit(angle, ORBIT_R);
                gsap.set(el, { x, y });
            });
        };

        const ctx = gsap.context(() => {
            gsap.from(".mission-intro-reveal", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".mission-intro",
                    start: "top 82%",
                    once: true,
                },
            });

            // Start with Vision on the active seat (upper-left)
            placeNodes(stageToRotation(0));

            mm.add("(min-width: 1024px)", () => {
                const trigger = ScrollTrigger.create({
                    trigger: journey,
                    start: "top top+=110",
                    // Longer pin so Values gets a real hold at the end
                    end: "+=1800",
                    pin: panel,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 0.75,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const p = self.progress;
                        const stage = progressToStage(p);

                        // Smooth rotation within each segment (not discrete jumps)
                        // Map local segment progress → interpolate rotation between stages
                        let local = 0;
                        let fromStage = 0;
                        let toStage = 0;

                        if (p < 0.28) {
                            local = p / 0.28;
                            fromStage = 0;
                            toStage = 0; // hold Vision, slight drift optional
                        } else if (p < 0.56) {
                            local = (p - 0.28) / (0.56 - 0.28);
                            fromStage = 0;
                            toStage = 1;
                        } else {
                            local = (p - 0.56) / (1 - 0.56);
                            fromStage = 1;
                            toStage = 2;
                        }

                        const rotFrom = stageToRotation(fromStage);
                        const rotTo = stageToRotation(toStage);
                        // Shortest path between rotations
                        let delta = rotTo - rotFrom;
                        if (delta > 180) delta -= 360;
                        if (delta < -180) delta += 360;

                        const rotation =
                            fromStage === toStage
                                ? rotFrom
                                : rotFrom + delta * local;

                        placeNodes(rotation);

                        if (stage !== activeRef.current) {
                            activeRef.current = stage;
                            setActiveIndex(stage);
                        }

                        gsap.set(progressRef.current, {
                            scaleX: p,
                            transformOrigin: "left center",
                        });
                    },
                });

                return () => trigger.kill();
            });

            mm.add("(max-width: 1023px)", () => {
                gsap.utils
                    .toArray<HTMLElement>(".mobile-mission-card")
                    .forEach((card) => {
                        gsap.from(card, {
                            y: 32,
                            opacity: 0,
                            duration: 0.7,
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

    useEffect(() => {
        const copy = copyRef.current;
        if (!copy) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                copy.children,
                { y: 16, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.45,
                    ease: "power3.out",
                }
            );
        });
        return () => ctx.revert();
    }, [activeIndex]);

    const active = nodes[activeIndex];
    const ActiveIcon = active.icon;

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
                    backgroundSize: "88px 88px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 10%, black 92%, transparent)",
                }}
            />

            <div className="mission-intro relative mx-auto max-w-[1500px] px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pb-14 lg:pt-24 xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
                    <div className="mission-intro-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Purpose
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="mission-intro-reveal max-w-[880px] text-[clamp(2.4rem,4.4vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Driving the future of
                            <span className="block text-black/30">smart infrastructure.</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div ref={journeyRef} className="relative hidden lg:block">
                <div
                    ref={panelRef}
                    className="relative mx-auto h-[calc(100vh-110px)] min-h-[640px] max-h-[860px] max-w-[1500px] px-12 xl:px-16"
                >
                    <div className="flex h-full flex-col border-t border-black/10">
                        <div className="relative shrink-0 py-4">
                            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black/10" />
                            <div
                                ref={progressRef}
                                className="absolute left-0 right-0 top-1/2 h-px origin-left -translate-y-1/2 scale-x-0 bg-[#f56616]"
                            />
                        </div>

                        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.05fr] items-center gap-6 xl:gap-10">
                            {/* COPY */}
                            <div
                                key={`copy-${activeIndex}`}
                                ref={copyRef}
                                className="max-w-[540px] py-6"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f56616] text-white">
                                        <ActiveIcon size={16} strokeWidth={1.6} />
                                    </span>
                                    <div>
                                        <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                            {active.number} · {active.label}
                                        </span>
                                        <span className="mt-0.5 block text-[11px] text-black/40">
                                            {active.eyebrow}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="mt-8 text-[clamp(1.9rem,3vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                                    {active.title}
                                </h3>

                                <p className="mt-5 text-[15px] leading-7 text-black/50 sm:text-base sm:leading-8">
                                    {active.description}
                                </p>

                                {activeIndex === 2 && (
                                    <div className="mt-8 grid grid-cols-2 gap-2.5">
                                        {coreValues.map((v) => (
                                            <div
                                                key={v.letter}
                                                className="border border-black/[0.08] bg-white/90 px-3.5 py-3.5"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f56616]/10 text-[10px] font-bold text-[#f56616]">
                                                        {v.letter}
                                                    </span>
                                                    <span className="text-[13px] font-semibold">
                                                        {v.title}
                                                    </span>
                                                </div>
                                                <p className="mt-1.5 pl-8 text-[11px] leading-4 text-black/45">
                                                    {v.detail}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4">
                                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/30">
                                        Scroll to rotate orbit
                                    </span>
                                    <span className="font-mono text-[11px] text-black/35">
                                        {String(activeIndex + 1).padStart(2, "0")}
                                        <span className="mx-1.5 text-black/15">/</span>
                                        03
                                    </span>
                                </div>
                            </div>

                            {/* ORBIT */}
                            <div className="relative flex h-full min-h-[520px] items-center justify-center">
                                <div className="relative h-[440px] w-[440px]">
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.06]" />
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#f56616]/22" />
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.05]" />

                                    {/* Globe */}
                                    <div className="absolute left-1/2 top-1/2 z-20 flex h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#f56616]/40 bg-[#171717] text-white shadow-[0_24px_80px_rgba(23,23,23,0.3)]">
                                        <div className="pointer-events-none absolute inset-3 rounded-full border border-white/[0.06]" />
                                        <div className="pointer-events-none absolute inset-6 rounded-full border border-dashed border-[#f56616]/18" />
                                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#f56616]">
                                            {active.number}
                                        </span>
                                        <span className="mt-1 text-[16px] font-semibold tracking-[-0.02em]">
                                            {active.letter}
                                        </span>
                                        <span className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-white/35">
                                            {active.label}
                                        </span>
                                    </div>

                                    {/* Nodes */}
                                    {nodes.map((node, i) => {
                                        const Icon = node.icon;
                                        const isActive = i === activeIndex;

                                        return (
                                            <div
                                                key={node.id}
                                                ref={(el) => {
                                                    nodeRefs.current[i] = el;
                                                }}
                                                className="absolute left-1/2 top-1/2 z-30 will-change-transform"
                                            >
                                                <div
                                                    className={`flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-500 ${isActive ? "scale-110" : "scale-95 opacity-50"
                                                        }`}
                                                >
                                                    <div
                                                        className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500 ${isActive
                                                                ? "border-[#f56616] bg-[#f56616] text-white shadow-[0_0_36px_rgba(245,102,22,0.4)]"
                                                                : "border-black/12 bg-white text-black/40"
                                                            }`}
                                                    >
                                                        <Icon size={20} strokeWidth={1.5} />
                                                    </div>
                                                    <span
                                                        className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-500 ${isActive ? "text-[#f56616]" : "text-black/30"
                                                            }`}
                                                    >
                                                        {node.label}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="relative mx-auto max-w-[1500px] px-5 pb-16 sm:px-8 lg:hidden">
                {nodes.map((node) => {
                    const Icon = node.icon;
                    return (
                        <article
                            key={node.id}
                            className="mobile-mission-card border-b border-black/10 py-10 first:border-t"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f56616] text-white">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                        {node.number} · {node.label}
                                    </span>
                                    <span className="mt-0.5 block text-[11px] text-black/40">
                                        {node.eyebrow}
                                    </span>
                                </div>
                            </div>
                            <h3 className="mt-6 text-[clamp(1.65rem,6vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                                {node.title}
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-black/50">
                                {node.description}
                            </p>
                            {node.id === "values" && (
                                <div className="mt-6 grid grid-cols-2 gap-2">
                                    {coreValues.map((v) => (
                                        <div
                                            key={v.letter}
                                            className="border border-black/10 bg-white px-3 py-3"
                                        >
                                            <span className="text-[10px] font-bold text-[#f56616]">
                                                {v.letter}
                                            </span>
                                            <div className="mt-1 text-[12px] font-semibold">
                                                {v.title}
                                            </div>
                                            <div className="mt-0.5 text-[11px] text-black/45">
                                                {v.detail}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}