"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  FileCheck2,
  Headphones,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    label: "Technically Sound",
    statement: "No guesswork.",
    description:
      "Experienced technical teams translate requirements into documented system architecture before execution begins.",
    proofs: ["Experienced technical team", "AutoCAD designs", "Parametric BOQ"],
    icon: BrainCircuit,
  },
  {
    number: "02",
    label: "Advanced Security",
    statement: "Built beyond the conventional.",
    description:
      "Modern surveillance capabilities extend beyond conventional monitoring into intelligent, proactive security environments.",
    proofs: ["AI-enabled CCTV", "Thermal imaging", "ANPR systems"],
    icon: ScanLine,
  },
  {
    number: "03",
    label: "Purity & Surety",
    statement: "What is specified is what gets delivered.",
    description:
      "Material integrity and documentation protect the technical intent of every system from specification through installation.",
    proofs: [
      "100% genuine OEM materials",
      "Every device documented",
      "Zero substitute components",
    ],
    icon: FileCheck2,
  },
  {
    number: "04",
    label: "True Commitment",
    statement: "Accountability continues after handover.",
    description:
      "Long-term relationships are built through availability, responsive support and measurable service accountability.",
    proofs: ["24/7 availability", "<1.5% complaint ratio", "10+ year client relationships"],
    icon: Headphones,
  },
];

export function WhyKrishnaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-equation-reveal", {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
          once: true,
        },
      });

      gsap.from(".trust-principle", {
        y: 55,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-principles",
          start: "top 78%",
          once: true,
        },
      });

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: ".trust-result",
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      gsap.from(".trust-letter", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.055,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".trust-result",
          start: "top 76%",
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
      {/* restrained architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 88%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        {/* HEADER */}
        <div className="grid gap-10 border-b border-black/10 pb-14 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20 lg:pb-20">
          <div className="trust-equation-reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                The Krishna Infosys Trust Equation
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3 text-black/35">
              <ShieldCheck size={17} strokeWidth={1.5} />

              <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
                Engineering trust since 2001
              </span>
            </div>
          </div>

          <div>
            <h2 className="trust-equation-reveal max-w-[950px] text-[clamp(2.9rem,5.4vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em]">
              Trust is not a claim.
              <span className="block text-black/30">
                It is an equation.
              </span>
            </h2>

            <div className="trust-equation-reveal mt-8 grid max-w-[900px] gap-5 border-t border-black/10 pt-6 sm:grid-cols-[1.15fr_0.85fr]">
              <p className="text-base leading-7 text-black/58 sm:text-lg sm:leading-8">
                Reliable infrastructure depends on more than products.
                Technical depth, advanced capability, supply integrity and
                long-term commitment have to work together.
              </p>

              <p className="text-sm leading-7 text-black/38">
                Four principles define how Krishna Infosys approaches the
                systems it designs, delivers and supports.
              </p>
            </div>
          </div>
        </div>

        {/* EQUATION LABELS */}
        <div className="trust-equation-reveal hidden border-b border-black/10 py-5 lg:grid lg:grid-cols-4">
          {["Technical depth", "Advanced capability", "Supply integrity", "Commitment"].map(
            (item, index) => (
              <div
                key={item}
                className={`flex items-center ${
                  index !== 0 ? "border-l border-black/10 pl-6" : ""
                }`}
              >
                <span className="mr-3 font-mono text-[9px] text-[#f56616]">
                  0{index + 1}
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                  {item}
                </span>

                {index < 3 && (
                  <span className="ml-auto pr-6 text-lg font-light text-black/20">
                    +
                  </span>
                )}
              </div>
            )
          )}
        </div>

        {/* PRINCIPLES */}
        <div className="trust-principles grid border-black/10 lg:grid-cols-2 lg:border-b">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <article
                key={principle.number}
                className={`trust-principle group relative border-b border-black/10 py-10 sm:py-12 lg:min-h-[440px] lg:border-b-0 lg:p-12 xl:min-h-[470px] xl:p-14 ${
                  index % 2 === 1 ? "lg:border-l" : ""
                } ${index >= 2 ? "lg:border-t" : ""}`}
              >
                <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-[#f56616] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div className="flex items-start justify-between gap-8">
                  <div>
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[#f56616]">
                      {principle.number}
                    </span>

                    <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black/35">
                      {principle.label}
                    </div>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 text-[#f56616] transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:scale-[1.03] sm:h-16 sm:w-16">
                    <Icon size={25} strokeWidth={1.35} />
                  </div>
                </div>

                <div className="mt-12 max-w-[570px]">
                  <h3 className="text-[clamp(2rem,3.4vw,3.8rem)] font-medium leading-[0.96] tracking-[-0.05em]">
                    {principle.statement}
                  </h3>

                  <p className="mt-6 max-w-[540px] text-sm leading-7 text-black/48 sm:text-base">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-10 grid gap-0 border-t border-black/10 sm:grid-cols-3 lg:mt-12">
                  {principle.proofs.map((proof, proofIndex) => (
                    <div
                      key={proof}
                      className={`flex items-start gap-2.5 py-4 sm:pr-4 ${
                        proofIndex > 0
                          ? "border-t border-black/10 sm:border-l sm:border-t-0 sm:pl-4"
                          : ""
                      }`}
                    >
                      <BadgeCheck
                        size={15}
                        strokeWidth={1.6}
                        className="mt-0.5 shrink-0 text-[#f56616]"
                      />

                      <span className="text-xs font-semibold leading-5 text-black/55">
                        {proof}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* RESULT */}
        <div className="trust-result relative mt-16 overflow-hidden bg-[#171717] text-white lg:mt-24">
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-0 h-[3px] origin-left bg-[#f56616]"
          />

          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-16">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                  The result
                </span>

                <span className="h-px w-12 bg-[#f56616]/50" />
              </div>

              <div className="mt-8 overflow-hidden">
                <div
                  aria-label="Trust"
                  className="flex text-[clamp(4.8rem,11vw,10rem)] font-semibold leading-[0.78] tracking-[-0.085em]"
                >
                  {"TRUST".split("").map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      className="trust-letter inline-block"
                    >
                      {letter}
                    </span>
                  ))}
                  <span className="trust-letter inline-block text-[#f56616]">
                    .
                  </span>
                </div>
              </div>

              <p className="mt-9 max-w-[650px] text-[clamp(1.25rem,2vw,1.8rem)] font-medium leading-[1.25] tracking-[-0.025em] text-white/72">
                Securing your world. Simplifying your business.
                <span className="text-white/35">
                  {" "}
                  For 24+ years and counting.
                </span>
              </p>
            </div>

            <div className="flex flex-col justify-between border-t border-white/10 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  Trust equation
                </div>

                <div className="mt-7 space-y-4">
                  {[
                    "Technical depth",
                    "Advanced security",
                    "Purity & surety",
                    "True commitment",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 border-b border-white/10 pb-4"
                    >
                      <span className="font-mono text-[9px] text-[#f56616]">
                        0{index + 1}
                      </span>

                      <span className="text-sm font-medium text-white/60">
                        {item}
                      </span>

                      <span className="ml-auto text-white/20">
                        {index < 3 ? "+" : "="}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.a
                href="/about"
                whileHover={{ x: 4 }}
                className="group mt-12 flex items-center justify-between border-t border-white/10 pt-5"
              >
                <span className="text-sm font-semibold">
                  Discover Krishna Infosys
                </span>

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f56616] text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
