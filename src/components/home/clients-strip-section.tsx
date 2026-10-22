"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { featuredClients, clientProjects } from "@/data/clients";

gsap.registerPlugin(ScrollTrigger);

export function ClientsStripSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const names = (featuredClients.length ? featuredClients : clientProjects).slice(0, 12);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clients-strip-item", {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.04,
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

  return (
    <section
      ref={sectionRef}
      className="border-y border-black/6 bg-white text-[#171717]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
              Selected clients
            </p>
            <h2 className="mt-2 text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium tracking-[-0.03em]">
              Organisations that trusted our ELV delivery
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black/45 transition-colors hover:text-[#171717]"
          >
            View projects
            <ArrowUpRight
              size={13}
              className="text-[#f56616] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-black/8 bg-black/8 sm:grid-cols-3 lg:grid-cols-4">
          {names.map((c) => (
            <div
              key={c.id}
              className="clients-strip-item flex min-h-[72px] items-center bg-white px-4 py-4"
              title={c.name}
            >
              <span className="text-[12px] font-semibold leading-snug tracking-[-0.01em] text-[#171717]/85">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
