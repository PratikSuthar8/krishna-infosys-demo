"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Building2,
  Headphones,
  MessagesSquare,
  RefreshCw,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const intents = [
  {
    id: "new-project",
    number: "01",
    label: "New Project",
    short: "NEW",
    icon: Building2,
    statement:
      "Plan the ELV architecture before execution begins — coordinated around your site, operations and long-term requirements.",
  },
  {
    id: "upgrade",
    number: "02",
    label: "Upgrade / Expansion",
    short: "UPG",
    icon: RefreshCw,
    statement:
      "Modernize or expand existing infrastructure while accounting for live systems, compatibility and operational continuity.",
  },
  {
    id: "amc",
    number: "03",
    label: "AMC & Support",
    short: "AMC",
    icon: Headphones,
    statement:
      "Build a structured support approach around system reliability, preventive maintenance and responsive technical assistance.",
  },
  {
    id: "consultation",
    number: "04",
    label: "Technical Consultation",
    short: "CON",
    icon: MessagesSquare,
    statement:
      "Bring us the requirement, constraint or technical question. We’ll help define the right engineering direction.",
  },
];

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const activeIntent = intents[active];
  const ActiveIcon = activeIntent.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".final-cta-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".final-cta-intent", {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".final-cta-intents",
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(".final-orbit", {
        rotate: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#171717] text-white"
    >
      {/* TECHNICAL BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to right, black, black 72%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12vw] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-white/[0.05] lg:block"
      >
        <div className="final-orbit absolute inset-[14%] rounded-full border border-dashed border-[#f56616]/25">
          <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f56616]" />
        </div>

        <div className="absolute inset-[29%] rounded-full border border-white/[0.06]" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.04]" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.04]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
        {/* TOP IDENTIFIER */}
        <div className="final-cta-reveal flex items-center justify-between gap-6 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#f56616]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
              Start a conversation
            </span>
          </div>

          <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/25 sm:block">
            Project brief / Engineering dialogue
          </span>
        </div>

        <div className="grid gap-12 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-24">
          {/* MESSAGE */}
          <div className="flex flex-col">
            <h2 className="final-cta-reveal max-w-[720px] text-[clamp(3.1rem,5.4vw,6rem)] font-medium leading-[0.9] tracking-[-0.065em]">
              Bring us the
              <span className="block text-[#f56616]">requirement.</span>
            </h2>

            <p className="final-cta-reveal mt-6 max-w-[570px] text-[clamp(1.25rem,2vw,1.8rem)] font-medium leading-[1.15] tracking-[-0.035em] text-white/72">
              We&apos;ll engineer what comes next.
            </p>

            <p className="final-cta-reveal mt-5 max-w-[570px] text-sm leading-7 text-white/42 sm:text-[15px]">
              Whether you&apos;re planning new infrastructure, upgrading an
              existing environment or looking for dependable lifecycle support,
              start with the requirement.
            </p>

            <div className="final-cta-reveal mt-8">
              <Link
                href="/contact"
                className="group inline-flex min-h-14 items-center gap-5 rounded-full bg-[#f56616] py-2 pl-7 pr-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#171717]"
              >
                Discuss your requirement

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-[#171717] group-hover:text-white">
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* INTENT WORKSPACE */}
          <div className="final-cta-intents border-t border-white/10 lg:border-l lg:border-t-0 lg:pl-10 xl:pl-14">
            <div className="grid sm:grid-cols-2">
              {intents.map((intent, index) => {
                const Icon = intent.icon;
                const isActive = active === index;

                return (
                  <button
                    key={intent.id}
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`final-cta-intent group relative min-h-[105px] border-b border-white/10 px-1 py-5 text-left transition-colors duration-300 sm:px-5 ${
                      index % 2 === 0 ? "sm:border-r" : ""
                    } ${
                      isActive
                        ? "bg-white/[0.055]"
                        : "hover:bg-white/[0.025]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-[#f56616]/50 bg-[#f56616] text-white"
                            : "border-white/10 text-white/35 group-hover:border-white/20 group-hover:text-white/65"
                        }`}
                      >
                        <Icon size={15} strokeWidth={1.5} />
                      </span>

                      <div className="min-w-0">
                        <span
                          className={`block font-mono text-[7px] font-bold uppercase tracking-[0.18em] ${
                            isActive ? "text-[#f56616]" : "text-white/20"
                          }`}
                        >
                          {intent.number} / {intent.short}
                        </span>

                        <span
                          className={`mt-1.5 block text-sm font-semibold tracking-[-0.02em] transition-colors ${
                            isActive ? "text-white" : "text-white/55"
                          }`}
                        >
                          {intent.label}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#f56616] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* ACTIVE RESPONSE */}
            <div className="relative min-h-[190px] overflow-hidden border-b border-white/10 py-7 sm:px-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIntent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between gap-5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
                      Your starting point
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f56616]/35 text-[#f56616]">
                      <ActiveIcon size={15} strokeWidth={1.5} />
                    </span>
                  </div>

                  <p className="mt-6 max-w-[650px] text-[clamp(1.1rem,1.7vw,1.45rem)] font-medium leading-[1.35] tracking-[-0.025em] text-white/72">
                    {activeIntent.statement}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-5 pt-5 sm:px-5">
              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/22">
                Select a requirement to begin
              </span>

              <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-[#f56616]">
                Design · Consult · Execute
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
