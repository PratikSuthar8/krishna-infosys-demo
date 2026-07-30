"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Sector =
    | "All"
    | "Corporate"
    | "Healthcare"
    | "Industrial"
    | "Logistics"
    | "Hospitality"
    | "Education";

const filters: Sector[] = [
    "All",
    "Corporate",
    "Healthcare",
    "Industrial",
    "Logistics",
    "Hospitality",
    "Education",
];

const projects = [
    {
        id: "p1",
        name: "Nippon Express",
        sector: "Logistics" as Sector,
        location: "Multi-site",
        scope: "CCTV · Access · VMS",
    },
    {
        id: "p2",
        name: "Sterling Hospital",
        sector: "Healthcare" as Sector,
        location: "Gujarat",
        scope: "Access · CCTV · Communication",
    },
    {
        id: "p3",
        name: "Ramdev Namkeen",
        sector: "Industrial" as Sector,
        location: "Gujarat",
        scope: "Perimeter · Plant CCTV",
    },
    {
        id: "p4",
        name: "Intas Pharmaceuticals",
        sector: "Healthcare" as Sector,
        location: "Ahmedabad",
        scope: "Security · Access · Network",
    },
    {
        id: "p5",
        name: "Zydus group site",
        sector: "Healthcare" as Sector,
        location: "Gujarat",
        scope: "CCTV · Access control",
    },
    {
        id: "p6",
        name: "IT park campus",
        sector: "Corporate" as Sector,
        location: "Ahmedabad",
        scope: "Access · AV · Cabling",
    },
    {
        id: "p7",
        name: "Warehouse & logistics hub",
        sector: "Logistics" as Sector,
        location: "Gujarat",
        scope: "Gates · Yard CCTV · PA",
    },
    {
        id: "p8",
        name: "Hotel & banquet facility",
        sector: "Hospitality" as Sector,
        location: "Gujarat",
        scope: "Guest access · AV · CCTV",
    },
    {
        id: "p9",
        name: "Manufacturing plant",
        sector: "Industrial" as Sector,
        location: "Pan-India",
        scope: "Perimeter · Plant monitoring",
    },
    {
        id: "p10",
        name: "Education campus",
        sector: "Education" as Sector,
        location: "Gujarat",
        scope: "Campus CCTV · Classroom AV",
    },
    {
        id: "p11",
        name: "Corporate HQ",
        sector: "Corporate" as Sector,
        location: "Ahmedabad",
        scope: "Access · Meeting AV · Wi-Fi",
    },
    {
        id: "p12",
        name: "Multi-outlet retail brand",
        sector: "Corporate" as Sector,
        location: "Multi-city",
        scope: "LP CCTV · Access · Signage",
    },
];

export function ProjectsIndexSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<Sector>("All");

    const filtered = useMemo(() => {
        if (active === "All") return projects;
        return projects.filter((p) => p.sector === active);
    }, [active]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".index-intro", {
                y: 32,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".index-intro-wrap",
                    start: "top 80%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // re-animate rows when filter changes
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const rows = list.querySelectorAll(".index-row");
        gsap.fromTo(
            rows,
            { y: 16, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.035,
                ease: "power3.out",
            }
        );
    }, [active]);

    return (
        <section
            id="index"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.2]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 8%, black 94%, transparent)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
                {/* INTRO + FILTERS */}
                <div className="index-intro-wrap grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:pb-12">
                    <div className="index-intro">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Index
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="index-intro max-w-[720px] text-[clamp(2rem,3.6vw,3.6rem)] font-medium leading-[0.96] tracking-[-0.05em]">
                            Broader delivery footprint.
                        </h2>
                        <p className="index-intro mt-4 max-w-[480px] text-[15px] leading-7 text-black/50">
                            Filter by sector. A sample of programmes across the practice —
                            representative of the 2,100+ projects delivered.
                        </p>
                    </div>
                </div>

                {/* FILTER CHIPS */}
                <div className="mt-8 flex flex-wrap gap-2">
                    {filters.map((f) => {
                        const on = active === f;
                        return (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setActive(f)}
                                className={`border px-3.5 py-2 text-[12px] font-semibold transition-all duration-300 ${on
                                        ? "border-[#f56616] bg-[#f56616] text-white"
                                        : "border-black/10 bg-white text-black/55 hover:border-black/25"
                                    }`}
                            >
                                {f}
                            </button>
                        );
                    })}
                </div>

                {/* TABLE HEADER */}
                <div className="mt-10 hidden border-b border-black/10 pb-3 text-[9px] font-bold uppercase tracking-[0.16em] text-black/30 sm:grid sm:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr_40px] sm:gap-4">
                    <span>Client / programme</span>
                    <span>Sector</span>
                    <span>Location</span>
                    <span>Scope</span>
                    <span />
                </div>

                {/* ROWS */}
                <div ref={listRef} className="mt-2">
                    {filtered.map((project, i) => (
                        <Link
                            key={project.id}
                            href="/contact"
                            className="index-row group grid grid-cols-1 items-center gap-2 border-b border-black/[0.07] py-5 transition-colors duration-300 hover:bg-white/60 sm:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr_40px] sm:gap-4 sm:px-2"
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-[10px] text-black/25">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-[15px] font-semibold tracking-[-0.02em] text-black/80 transition-colors group-hover:text-[#171717]">
                                    {project.name}
                                </span>
                            </div>

                            <span className="text-[12px] font-medium text-[#f56616] sm:text-[13px]">
                                {project.sector}
                            </span>

                            <span className="text-[13px] text-black/45">{project.location}</span>

                            <span className="text-[13px] text-black/50">{project.scope}</span>

                            <span className="flex justify-end">
                                <ArrowUpRight
                                    size={15}
                                    className="text-black/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f56616]"
                                />
                            </span>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="py-12 text-sm text-black/40">
                        No programmes in this filter — try another sector.
                    </p>
                )}

                <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-black/40">
                        Showing {filtered.length} of {projects.length} sample entries · Full
                        portfolio on request
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#171717] transition-colors hover:text-[#f56616]"
                    >
                        Request relevant case studies
                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}