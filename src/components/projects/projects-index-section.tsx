"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  clientProjects,
  type ClientSector,
  type ClientSystem,
} from "@/data/clients";

gsap.registerPlugin(ScrollTrigger);

const sectors: Array<"All" | ClientSector> = [
  "All",
  ...Array.from(new Set(clientProjects.map((p) => p.sector))).sort(),
];

export function ProjectsIndexSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [sector, setSector] = useState<"All" | ClientSector>("All");
  const [system, setSystem] = useState<"All" | ClientSystem>("All");

  const systems = useMemo(
    () =>
      Array.from(
        new Set(clientProjects.flatMap((p) => p.systems)),
      ).sort() as ClientSystem[],
    [],
  );

  const filtered = useMemo(() => {
    return clientProjects
      .filter((p) => (sector === "All" ? true : p.sector === sector))
      .filter((p) =>
        system === "All" ? true : p.systems.includes(system),
      )
      .sort((a, b) => b.year - a.year);
  }, [sector, system]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".idx-a", {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".idx-card");
    gsap.fromTo(
      cards,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "power2.out" },
    );
  }, [sector, system]);

  return (
    <section
      id="index"
      ref={sectionRef}
      className="relative bg-[#f3f1ec] text-[#171717]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
        {/* Title row */}
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="idx-a text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
              Project index
            </p>
            <h2 className="idx-a mt-3 max-w-[520px] text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.045em]">
              Selected clients across sectors and systems.
            </h2>
          </div>
          <p className="idx-a text-[13px] tabular-nums text-black/40">
            <span className="font-semibold text-[#171717]">{filtered.length}</span>
            {" "}
            of {clientProjects.length}
          </p>
        </div>

        {/* Filters — two selects only */}
        <div className="idx-a mt-8 flex flex-wrap items-center gap-3">
          <label className="relative">
            <span className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">
              Sector
            </span>
            <div className="relative">
              <select
                value={sector}
                onChange={(e) =>
                  setSector(e.target.value as "All" | ClientSector)
                }
                className="min-w-[180px] appearance-none rounded-md border border-black/10 bg-white py-2.5 pl-3.5 pr-9 text-[13px] font-medium text-[#171717] outline-none transition-colors focus:border-[#f56616]/45"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All sectors" : s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/35"
              />
            </div>
          </label>

          <label className="relative">
            <span className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">
              System
            </span>
            <div className="relative">
              <select
                value={system}
                onChange={(e) =>
                  setSystem(e.target.value as "All" | ClientSystem)
                }
                className="min-w-[180px] appearance-none rounded-md border border-black/10 bg-white py-2.5 pl-3.5 pr-9 text-[13px] font-medium text-[#171717] outline-none transition-colors focus:border-[#f56616]/45"
              >
                <option value="All">All systems</option>
                {systems.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/35"
              />
            </div>
          </label>

          {(sector !== "All" || system !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSector("All");
                setSystem("All");
              }}
              className="mt-5 text-[12px] font-semibold text-[#f56616] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Dense card grid */}
        <div
          ref={gridRef}
          className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((p) => (
            <article
              key={p.id}
              className="idx-card group relative flex flex-col overflow-hidden rounded-lg border border-black/[0.07] bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-black/12 hover:shadow-[0_12px_40px_-24px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute left-0 top-0 h-full w-[3px] bg-[#f56616] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f56616]">
                  {p.sector}
                </span>
                <span className="shrink-0 text-[11px] font-medium tabular-nums text-black/30">
                  {p.yearEnd ? `${p.year}–${p.yearEnd}` : p.year}
                </span>
              </div>

              <h3 className="mt-3 text-[16px] font-semibold leading-snug tracking-[-0.02em] text-[#171717]">
                {p.name}
              </h3>

              <p className="mt-2 flex-1 text-[13px] leading-6 text-black/45">
                {p.summary}
              </p>

              <p className="mt-4 border-t border-black/[0.06] pt-3 text-[11px] leading-5 text-black/40">
                {p.systems.join(" · ")}
              </p>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-sm text-black/40">
            No programmes match these filters.
          </p>
        ) : null}

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-[360px] text-[12px] leading-5 text-black/35">
            A selection of delivered programmes. Full BOQs and site photos remain
            internal.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#171717]! px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white! transition-colors hover:bg-[#f56616]"
          >
            Discuss a similar scope
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
