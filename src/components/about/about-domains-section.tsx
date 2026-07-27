"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Cable,
    Cctv,
    Network,
    Radio,
    Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const domains = [
    {
        id: "security",
        number: "01",
        label: "Security",
        title: "Security & Surveillance",
        summary:
            "CCTV, intrusion detection, access control, biometrics and perimeter systems — designed as one defensive layer, not isolated products.",
        points: [
            "IP CCTV & analytics",
            "Access control & biometrics",
            "Intrusion & perimeter",
            "Video door phones",
        ],
        icon: Cctv,
        href: "/solutions/security",
    },
    {
        id: "communication",
        number: "02",
        label: "Communication",
        title: "Communication Systems",
        summary:
            "EPABX / IP PBX, intercom, public address and video conferencing built for clear operations across floors and sites.",
        points: [
            "EPABX / IP PBX",
            "Public address",
            "Intercom systems",
            "Video conferencing",
        ],
        icon: Radio,
        href: "/solutions/communication",
    },
    {
        id: "av",
        number: "03",
        label: "Audio Visual",
        title: "Audio Visual Systems",
        summary:
            "Meeting rooms, boardrooms, digital signage and video walls — engineered for clarity, control and long-term reliability.",
        points: [
            "Boardroom AV",
            "Video walls",
            "Digital signage",
            "Switching & control",
        ],
        icon: Sparkles,
        href: "/solutions/audio-visual",
    },
    {
        id: "networking",
        number: "04",
        label: "Networking",
        title: "Networking Infrastructure",
        summary:
            "Structured cabling, switching and wireless foundations that carry security, voice, AV and automation on one backbone.",
        points: [
            "Structured cabling",
            "Enterprise switching",
            "Wi-Fi design",
            "Rack & backbone",
        ],
        icon: Network,
        href: "/solutions/networking",
    },
    {
        id: "automation",
        number: "05",
        label: "Automation",
        title: "Building Automation",
        summary:
            "Smart controls for lighting, climate and integrated scenarios — residential, commercial and mixed-use environments.",
        points: [
            "Home & building automation",
            "Lighting control",
            "Climate integration",
            "Scene & schedule logic",
        ],
        icon: Cable,
        href: "/solutions/automation",
    },
];

export function AboutDomainsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const journeyRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const deckRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeRef = useRef(0);

    useEffect(() => {
        const section = sectionRef.current;
        const journey = journeyRef.current;
        const panel = panelRef.current;
        if (!section || !journey || !panel) return;

        const mm = gsap.matchMedia();
        const count = domains.length;

        const layoutDeck = (progress: number) => {
            // progress 0..1 → continuous index
            const raw = progress * (count - 1);
            const current = Math.round(raw);
            const clamped = Math.max(0, Math.min(count - 1, current));

            if (clamped !== activeRef.current) {
                activeRef.current = clamped;
                setActiveIndex(clamped);
            }

            cardRefs.current.forEach((card, i) => {
                if (!card) return;

                const offset = i - raw; // negative = past, positive = upcoming
                const abs = Math.abs(offset);

                // Shuffle stack: active centered, past slide left+back, future right+back
                const x = offset * 42;
                const y = abs * 14;
                const z = -abs * 80;
                const rot = offset * -6;
                const scale = Math.max(0.72, 1 - abs * 0.1);
                const opacity = abs > 2.2 ? 0 : Math.max(0.2, 1 - abs * 0.35);

                gsap.set(card, {
                    x,
                    y,
                    z,
                    rotate: rot,
                    scale,
                    opacity,
                    zIndex: Math.round(100 - abs * 10),
                    transformPerspective: 900,
                    force3D: true,
                });
            });
        };

        const ctx = gsap.context(() => {
            gsap.from(".domains-intro-reveal", {
                y: 36,
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".domains-intro",
                    start: "top 80%",
                    once: true,
                },
            });

            // initial stack
            layoutDeck(0);

            mm.add("(min-width: 1024px)", () => {
                const trigger = ScrollTrigger.create({
                    trigger: journey,
                    start: "top top+=110",
                    end: `+=${count * 420}`,
                    pin: panel,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        layoutDeck(self.progress);
                        gsap.set(progressRef.current, {
                            scaleX: self.progress,
                            transformOrigin: "left center",
                        });
                    },
                });

                return () => trigger.kill();
            });

            mm.add("(max-width: 1023px)", () => {
                gsap.utils
                    .toArray<HTMLElement>(".mobile-domain-card")
                    .forEach((card) => {
                        gsap.from(card, {
                            y: 36,
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
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.48,
                    ease: "power3.out",
                }
            );
        });
        return () => ctx.revert();
    }, [activeIndex]);

    const active = domains[activeIndex];
    const ActiveIcon = active.icon;

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.24]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                }}
            />

            {/* INTRO */}
            <div className="domains-intro relative mx-auto max-w-[1500px] px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pb-14 lg:pt-24 xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                    <div className="domains-intro-reveal">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Capabilities
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="domains-intro-reveal max-w-[880px] text-[clamp(2.4rem,4.4vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            Five domains.
                            <span className="block text-black/30">One integrated stack.</span>
                        </h2>
                        <p className="domains-intro-reveal mt-6 max-w-[560px] text-base leading-7 text-black/50">
                            Scroll to shuffle through the practice areas that define Krishna
                            Infosys as a full ELV systems partner.
                        </p>
                    </div>
                </div>
            </div>

            {/* DESKTOP PINNED DECK */}
            <div ref={journeyRef} className="relative hidden lg:block">
                <div
                    ref={panelRef}
                    className="relative mx-auto h-[calc(100vh-110px)] min-h-[640px] max-h-[860px] max-w-[1500px] px-12 xl:px-16"
                >
                    <div className="flex h-full flex-col border-t border-black/10">
                        {/* progress + domain ticks */}
                        <div className="relative shrink-0 py-5">
                            <div className="absolute left-0 right-0 top-[42px] h-px bg-black/10" />
                            <div
                                ref={progressRef}
                                className="absolute left-0 right-0 top-[42px] h-px origin-left scale-x-0 bg-[#f56616]"
                            />
                            <div className="relative grid grid-cols-5">
                                {domains.map((d, i) => {
                                    const on = i === activeIndex;
                                    const done = i < activeIndex;
                                    return (
                                        <div key={d.id} className="flex items-center gap-2.5">
                                            <div
                                                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-400 ${on
                                                        ? "border-[#f56616] bg-[#f56616] text-white"
                                                        : done
                                                            ? "border-[#f56616]/40 bg-white text-[#f56616]"
                                                            : "border-black/12 bg-[#f3f1ec] text-black/30"
                                                    }`}
                                            >
                                                {d.number}
                                            </div>
                                            <span
                                                className={`hidden text-[11px] font-semibold transition-colors duration-400 xl:block ${on ? "text-[#171717]" : "text-black/30"
                                                    }`}
                                            >
                                                {d.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid min-h-0 flex-1 grid-cols-[0.95fr_1.05fr] items-center gap-10 border-t border-black/10">
                            {/* COPY */}
                            <div
                                key={`domain-copy-${activeIndex}`}
                                ref={copyRef}
                                className="max-w-[560px] py-8"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f56616] text-white">
                                        <ActiveIcon size={18} strokeWidth={1.5} />
                                    </span>
                                    <div>
                                        <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                            {active.number} · {active.label}
                                        </span>
                                        <span className="mt-0.5 block text-[11px] text-black/40">
                                            Domain focus
                                        </span>
                                    </div>
                                </div>

                                <h3 className="mt-8 text-[clamp(2rem,3.2vw,3.3rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                                    {active.title}
                                </h3>

                                <p className="mt-5 text-[15px] leading-7 text-black/50 sm:text-base sm:leading-8">
                                    {active.summary}
                                </p>

                                <ul className="mt-7 grid grid-cols-2 gap-2.5">
                                    {active.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-center gap-2 border border-black/[0.07] bg-white/80 px-3 py-2.5 text-[12px] font-medium text-black/60"
                                        >
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f56616]" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                                    <Link
                                        href={active.href}
                                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#171717] transition-colors hover:text-[#f56616]"
                                    >
                                        Explore domain
                                        <ArrowUpRight
                                            size={14}
                                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        />
                                    </Link>
                                    <span className="font-mono text-[11px] text-black/35">
                                        {String(activeIndex + 1).padStart(2, "0")}
                                        <span className="mx-1.5 text-black/15">/</span>
                                        05
                                    </span>
                                </div>
                            </div>

                            {/* SHUFFLE DECK */}
                            <div className="relative flex h-full min-h-[480px] items-center justify-center">
                                <div
                                    ref={deckRef}
                                    className="relative h-[360px] w-[340px]"
                                    style={{ perspective: "1100px" }}
                                >
                                    {domains.map((domain, i) => {
                                        const Icon = domain.icon;
                                        const isActive = i === activeIndex;

                                        return (
                                            <div
                                                key={domain.id}
                                                ref={(el) => {
                                                    cardRefs.current[i] = el;
                                                }}
                                                className="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                                            >
                                                <div
                                                    className={`overflow-hidden border bg-white shadow-[0_24px_80px_rgba(23,23,23,0.12)] transition-colors duration-500 ${isActive
                                                            ? "border-[#f56616]/40"
                                                            : "border-black/10"
                                                        }`}
                                                >
                                                    {/* card header */}
                                                    <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                                                        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#f56616]">
                                                            {domain.number}
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/30">
                                                            {domain.label}
                                                        </span>
                                                    </div>

                                                    {/* card body */}
                                                    <div className="px-5 py-8">
                                                        <div
                                                            className={`flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500 ${isActive
                                                                    ? "border-[#f56616] bg-[#f56616] text-white"
                                                                    : "border-black/10 bg-[#f3f1ec] text-black/40"
                                                                }`}
                                                        >
                                                            <Icon size={22} strokeWidth={1.4} />
                                                        </div>

                                                        <h4 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                                                            {domain.title}
                                                        </h4>

                                                        <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-black/45">
                                                            {domain.summary}
                                                        </p>
                                                    </div>

                                                    {/* card footer */}
                                                    <div className="flex items-center justify-between border-t border-black/5 px-5 py-3.5">
                                                        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/25">
                                                            ELV domain
                                                        </span>
                                                        <ArrowUpRight
                                                            size={13}
                                                            className={
                                                                isActive ? "text-[#f56616]" : "text-black/20"
                                                            }
                                                        />
                                                    </div>
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

            {/* MOBILE */}
            <div className="relative mx-auto max-w-[1500px] px-5 pb-16 sm:px-8 lg:hidden">
                {domains.map((domain) => {
                    const Icon = domain.icon;
                    return (
                        <article
                            key={domain.id}
                            className="mobile-domain-card border-b border-black/10 py-10 first:border-t"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f56616] text-white">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                                        {domain.number} · {domain.label}
                                    </span>
                                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                                        {domain.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="mt-5 text-sm leading-7 text-black/50">
                                {domain.summary}
                            </p>
                            <ul className="mt-5 grid grid-cols-2 gap-2">
                                {domain.points.map((p) => (
                                    <li
                                        key={p}
                                        className="border border-black/10 bg-white px-3 py-2 text-[11px] font-medium text-black/55"
                                    >
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}