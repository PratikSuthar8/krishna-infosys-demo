"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Compass,
  DraftingCompass,
  HardHat,
  Headphones,
  Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: "01",
    label: "Design",
    eyebrow: "Engineer before execution",
    title: "Every reliable system starts on paper.",
    description:
      "We translate site conditions, operational needs and technical requirements into engineered ELV architecture before execution begins.",
    details: [
      "Requirement & site assessment",
      "System architecture planning",
      "AutoCAD-based design approach",
    ],
    icon: DraftingCompass,
  },
  {
    number: "02",
    label: "Consult",
    eyebrow: "Clarity before commitment",
    title: "Specifications built around the requirement.",
    description:
      "Technology selection, system integration and BOQ planning are aligned to the environment — helping create solutions that are practical, scalable and accountable.",
    details: [
      "Parametric BOQ planning",
      "Technology & OEM evaluation",
      "Integration-led consultation",
    ],
    icon: Compass,
  },
  {
    number: "03",
    label: "Execute",
    eyebrow: "Precision on the ground",
    title: "One coordinated team. One accountable outcome.",
    description:
      "Dedicated project management connects design intent with disciplined implementation, documentation, testing and handover.",
    details: [
      "Dedicated project management",
      "Genuine OEM sourcing",
      "Testing, documentation & traceability",
    ],
    icon: HardHat,
  },
  {
    number: "04",
    label: "Support",
    eyebrow: "Beyond commissioning",
    title: "Infrastructure needs a lifecycle, not a handover.",
    description:
      "Our service approach extends beyond installation through structured AMC, preventive maintenance and SLA-driven technical support.",
    details: [
      "Preventive maintenance",
      "SLA-driven service response",
      "Long-term lifecycle support",
    ],
    icon: Headphones,
  },
];

export function TrustEngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-intro-reveal", {
        y: 55,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-intro",
          start: "top 78%",
          once: true,
        },
      });

      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".engineering-journey",
            start: "top 72%",
            end: "bottom 68%",
            scrub: 0.7,
          },
        }
      );

      const stageElements = gsap.utils.toArray<HTMLElement>(
        ".engineering-stage"
      );

      stageElements.forEach((stage, index) => {
        ScrollTrigger.create({
          trigger: stage,
          start: "top 62%",
          end: "bottom 42%",
          onEnter: () => setActiveStage(index),
          onEnterBack: () => setActiveStage(index),
        });

        gsap.from(stage.querySelectorAll(".stage-reveal"), {
          y: 35,
          opacity: 0,
          stagger: 0.09,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 78%",
            once: true,
          },
        });
      });

      gsap.to(".trust-orbit", {
        rotate: 360,
        duration: 45,
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
      {/* subtle technical background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-32 h-[520px] w-[520px] rounded-full border border-white/[0.04]"
      >
        <div className="trust-orbit absolute inset-12 rounded-full border border-dashed border-[#f56616]/15">
          <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f56616]" />
        </div>

        <div className="absolute inset-28 rounded-full border border-white/[0.05]" />
      </div>

      {/* INTRO */}
      <div className="trust-intro relative mx-auto max-w-[1500px] px-5 pb-20 pt-24 sm:px-8 lg:px-12 lg:pb-28 lg:pt-32 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="trust-intro-reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                The Krishna Infosys approach
              </span>
            </div>
          </div>

          <div>
            <h2 className="trust-intro-reveal max-w-[920px] text-[clamp(2.8rem,5.3vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.055em]">
              Not just a vendor.
              <span className="block text-white/40">
                An engineering partner.
              </span>
            </h2>

            <div className="trust-intro-reveal mt-8 grid max-w-[850px] gap-6 border-t border-white/10 pt-7 sm:grid-cols-2">
              <p className="text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                ELV infrastructure performs best when every system is planned
                as part of one connected environment — not purchased as
                isolated products.
              </p>

              <p className="text-sm leading-7 text-white/40 sm:text-base">
                Our approach connects engineering, consultation, execution
                and lifecycle support under one accountable delivery model.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* JOURNEY NAVIGATION */}
      <div className="engineering-journey relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="sticky top-[80px] z-20 hidden bg-[#171717]/90 py-5 backdrop-blur-xl lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[22px] h-px bg-white/10" />

            <div
              ref={progressRef}
              className="absolute left-0 right-0 top-[22px] h-px origin-left bg-[#f56616]"
            />

            <div className="relative grid grid-cols-4">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const active = index <= activeStage;

                return (
                  <div
                    key={stage.number}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        active
                          ? "border-[#f56616] bg-[#f56616] text-white"
                          : "border-white/15 bg-[#171717] text-white/35"
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.7} />
                    </div>

                    <div className="pt-1">
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                          active ? "text-[#f56616]" : "text-white/25"
                        }`}
                      >
                        {stage.number}
                      </span>

                      <div
                        className={`mt-0.5 text-sm font-semibold transition-colors duration-500 ${
                          active ? "text-white" : "text-white/35"
                        }`}
                      >
                        {stage.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* STAGES */}
        <div className="relative">
          {stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <article
                key={stage.number}
                className="engineering-stage relative grid min-h-[72vh] items-center border-t border-white/[0.08] py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-28"
              >
                {/* Number / visual */}
                <div className="relative mb-12 lg:mb-0">
                  <span className="stage-reveal block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f56616] lg:hidden">
                    {stage.number} / {stage.label}
                  </span>

                  <div className="stage-reveal relative mt-6 flex aspect-square max-w-[340px] items-center justify-center lg:mt-0">
                    <span className="select-none text-[clamp(9rem,18vw,17rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.035]">
                      {stage.number}
                    </span>

                    <motion.div
                      whileHover={{ scale: 1.06, rotate: 3 }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 18,
                      }}
                      className="absolute flex h-24 w-24 items-center justify-center rounded-full border border-[#f56616]/30 bg-[#f56616]/10 text-[#f56616] backdrop-blur sm:h-28 sm:w-28"
                    >
                      <Icon size={34} strokeWidth={1.35} />
                    </motion.div>

                    <div className="absolute inset-[16%] rounded-full border border-dashed border-white/[0.08]" />

                    <span className="absolute right-[12%] top-[20%] h-2 w-2 rounded-full bg-[#f56616]" />
                  </div>
                </div>

                {/* Copy */}
                <div className="relative max-w-[780px]">
                  <div className="stage-reveal flex items-center gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
                      {stage.eyebrow}
                    </span>

                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <h3 className="stage-reveal mt-7 text-[clamp(2.4rem,4.3vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.05em]">
                    {stage.title}
                  </h3>

                  <p className="stage-reveal mt-7 max-w-[690px] text-base leading-8 text-white/50 sm:text-lg">
                    {stage.description}
                  </p>

                  <div className="stage-reveal mt-9 grid gap-3 sm:grid-cols-3">
                    {stage.details.map((detail) => (
                      <div
                        key={detail}
                        className="group flex min-h-[92px] items-start gap-3 border-t border-white/10 pt-4 transition-colors duration-300 hover:border-[#f56616]/50"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#f56616]/25 text-[#f56616]">
                          <Check size={11} strokeWidth={2} />
                        </span>

                        <span className="text-xs font-medium leading-5 text-white/55 transition-colors duration-300 group-hover:text-white/85">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* TRUST PROOF */}
      <div className="relative border-t border-white/[0.08]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-24 xl:px-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
                Built around accountability
              </span>
            </div>

            <p className="mt-6 max-w-[850px] text-[clamp(1.7rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.04em] text-white/85">
              Engineering discipline before installation.
              <span className="text-white/35">
                {" "}
                Traceability after commissioning.
              </span>
            </p>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="flex min-w-[245px] items-center justify-between gap-8 rounded-full border border-white/10 px-6 py-4"
          >
            <div>
              <div className="text-2xl font-semibold tracking-[-0.04em] text-[#f56616]">
                &lt;1.5%
              </div>

              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
                Complaint ratio
              </div>
            </div>

            <ArrowUpRight
              size={18}
              className="text-white/50"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
