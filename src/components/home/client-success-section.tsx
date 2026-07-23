"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Building2,
  Camera,
  KeyRound,
  MessageSquareMore,
  Network,
  Radio,
  Wifi,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  { label: "CCTV", icon: Camera },
  { label: "EPABX", icon: MessageSquareMore },
  { label: "Public Address", icon: Radio },
  { label: "Access Control", icon: KeyRound },
  { label: "Networking", icon: Network },
  { label: "Wi-Fi", icon: Wifi },
];

export function ClientSuccessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".success-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".success-system", {
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".success-case",
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
      className="relative overflow-hidden bg-[#f3f0ea] text-[#171717]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.045) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">

        {/* HEADER */}
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <div className="success-reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                Client success
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 text-black/35">
              <Building2 size={16} strokeWidth={1.5} />

              <span className="text-[9px] font-semibold uppercase tracking-[0.17em]">
                Selected project outcome
              </span>
            </div>
          </div>

          <div>
            <h2 className="success-reveal max-w-[920px] text-[clamp(2.7rem,4.8vw,5.2rem)] font-medium leading-[0.93] tracking-[-0.058em]">
              The real test begins
              <span className="block text-black/27">
                after handover.
              </span>
            </h2>

            <p className="success-reveal mt-5 max-w-[680px] text-base leading-7 text-black/48">
              One selected engagement showing how engineering decisions,
              integration discipline and execution quality translate into
              long-term operational results.
            </p>
          </div>
        </div>

        {/* COMPACT CASE STUDY */}
        <div className="success-case mt-10 overflow-hidden border border-black/10 bg-white">
          <div className="grid lg:grid-cols-[0.27fr_0.47fr_0.26fr]">

            {/* CLIENT IDENTITY */}
            <div className="flex flex-col justify-between border-b border-black/10 bg-[#171717] p-6 text-white sm:p-8 lg:min-h-[430px] lg:border-b-0 lg:border-r">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                    Case / 01
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f56616]">
                    <Building2 size={15} strokeWidth={1.5} />
                  </span>
                </div>

                <div className="mt-12">
                  <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/28">
                    Featured client
                  </span>

                  <h3 className="mt-4 text-[clamp(2.5rem,3.8vw,4.3rem)] font-medium leading-[0.88] tracking-[-0.06em]">
                    Ramdev
                    <span className="block text-[#f56616]">
                      Namkeen.
                    </span>
                  </h3>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#f56616]" />

                    <span className="text-[11px] text-white/45">
                      Chiyada Plant · Gujarat
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-5">
                <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                  Engagement
                </span>

                <span className="mt-2 block text-xs font-semibold text-white/65">
                  Multi-system ELV
                </span>
              </div>
            </div>

            {/* PROJECT STORY */}
            <div className="p-6 sm:p-8 lg:min-h-[430px] lg:p-9 xl:p-10">
              <div className="flex items-center justify-between gap-5 border-b border-black/10 pb-5">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                  Engineering challenge
                </span>

                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/25">
                  Manufacturing
                </span>
              </div>

              <h4 className="mt-7 max-w-[600px] text-[clamp(1.8rem,2.7vw,3rem)] font-medium leading-[0.98] tracking-[-0.045em]">
                Engineering around a live-site constraint.
              </h4>

              <p className="mt-5 max-w-[620px] text-sm leading-7 text-black/48">
                With structural work already complete and no existing ELV
                drawings, Krishna Infosys engineered the ELV environment
                around actual site conditions and coordinated multiple
                technology systems into one integrated infrastructure.
              </p>

              <div className="mt-7 border-l-2 border-[#f56616] pl-5">
                <span className="block text-[8px] font-bold uppercase tracking-[0.18em] text-black/28">
                  Engineering response
                </span>

                <p className="mt-2 max-w-[560px] text-sm font-medium leading-6 text-black/58">
                  A complete ELV environment designed from scratch and
                  coordinated around real construction conditions.
                </p>
              </div>

              {/* SYSTEM SCOPE */}
              <div className="mt-8 border-t border-black/10 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/28">
                    Integrated scope
                  </span>

                  <span className="font-mono text-[8px] text-black/20">
                    06 SYSTEMS
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                  {systems.map((system) => {
                    const Icon = system.icon;

                    return (
                      <motion.div
                        key={system.label}
                        whileHover={{ x: 2 }}
                        className="success-system flex items-center gap-2"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f3f0ea] text-[#f56616]">
                          <Icon size={12} strokeWidth={1.6} />
                        </span>

                        <span className="text-[10px] font-semibold leading-4 text-black/48">
                          {system.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* OUTCOME */}
            <div className="flex flex-col justify-between border-t border-black/10 bg-[#faf9f7] p-6 sm:p-8 lg:min-h-[430px] lg:border-l lg:border-t-0 lg:p-9">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black/28">
                  Reported outcome / 2025
                </span>

                <div className="mt-10 border-l-2 border-[#f56616] pl-5">
                  <div className="text-[clamp(4.5rem,7vw,7rem)] font-medium leading-[0.72] tracking-[-0.075em]">
                    10%
                  </div>

                  <div className="mt-6 max-w-[230px] text-[10px] font-bold uppercase leading-5 tracking-[0.14em] text-black/38">
                    complaint rate compared with their other plant
                  </div>
                </div>

                <p className="mt-7 max-w-[330px] text-xs leading-6 text-black/42">
                  The case study reports significantly lower complaint
                  incidence alongside one of the cleanest ELV installations
                  in the client&apos;s portfolio.
                </p>
              </div>

              <div className="mt-9 border-t border-black/10 pt-5">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/25">
                  What this demonstrates
                </span>

                <p className="mt-2 text-sm font-semibold leading-6 text-black/62">
                  Engineering quality measured in operation, not presentation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PORTFOLIO PATH */}
        <div className="success-reveal mt-7 flex flex-col gap-5 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/32">
              This is one selected project story
            </span>

            <p className="mt-1.5 text-sm text-black/42">
              Explore the wider portfolio for projects across industries,
              technologies and operating environments.
            </p>
          </div>

          <Link
            href="/projects"
            className="group flex w-fit shrink-0 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#171717]"
          >
            Explore projects

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#f56616] transition-all duration-300 group-hover:border-[#f56616]/35 group-hover:bg-[#f56616] group-hover:text-white">
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
