"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  Compass,
  DraftingCompass,
  HardHat,
  Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BRAND = "#f56616";

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

function StageIcon({
  index,
  size = 32,
}: {
  index: number;
  size?: number;
}) {
  const Icon = stages[index].icon;
  return <Icon size={size} strokeWidth={1.35} />;
}

export function TrustEngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopJourneyRef = useRef<HTMLDivElement>(null);
  const desktopPanelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const journey = desktopJourneyRef.current;
    const panel = desktopPanelRef.current;

    if (!section || !journey || !panel) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.from(".trust-intro-reveal", {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-intro",
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(".trust-orbit", {
        rotate: 360,
        duration: 48,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      mm.add("(min-width: 1024px)", () => {
        const stageCount = stages.length;

        const updateStage = (index: number) => {
          const nextIndex = Math.max(0, Math.min(stageCount - 1, index));

          setActiveStage((current) => {
            if (current === nextIndex) return current;
            return nextIndex;
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: journey,
          start: "top top+=118",
          end: "+=1450",
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
        const mobileCards =
          gsap.utils.toArray<HTMLElement>(".mobile-stage-card");

        mobileCards.forEach((card) => {
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

  useEffect(() => {
    const number = numberRef.current;
    const icon = iconWrapRef.current;
    const copy = copyRef.current;

    if (!number || !icon || !copy) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        number,
        {
          y: 22,
          opacity: 0.15,
          scale: 0.96,
        },
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
        {
          scale: 0.82,
          rotate: -8,
          opacity: 0,
        },
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
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.055,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    });

    return () => ctx.revert();
  }, [activeStage]);

  const active = stages[activeStage];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#171717] text-white"
    >
      {/* Technical background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
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
        <div className="trust-orbit absolute inset-12 rounded-full border border-dashed border-[#f56616]/15">
          <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f56616]" />
        </div>

        <div className="absolute inset-28 rounded-full border border-white/[0.05]" />
      </div>

      {/* INTRO */}
      <div className="trust-intro relative mx-auto max-w-[1500px] px-5 pb-14 pt-20 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24 xl:px-16">
        <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="trust-intro-reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                The Krishna Infosys approach
              </span>
            </div>
          </div>

          <div>
            <h2 className="trust-intro-reveal max-w-[900px] text-[clamp(2.7rem,4.8vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.055em]">
              Not just a vendor.
              <span className="block text-white/35">
                An engineering partner.
              </span>
            </h2>

            <div className="trust-intro-reveal mt-7 grid max-w-[850px] gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
              <p className="text-base leading-7 text-white/55 sm:text-[17px]">
                ELV infrastructure performs best when every system is planned
                as part of one connected environment — not purchased as
                isolated products.
              </p>

              <p className="text-sm leading-7 text-white/40 sm:text-[15px]">
                Our approach connects engineering, consultation, execution
                and lifecycle support under one accountable delivery model.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP PINNED JOURNEY */}
      <div
        ref={desktopJourneyRef}
        className="relative hidden lg:block"
      >
        <div
          ref={desktopPanelRef}
          className="relative mx-auto h-[calc(100vh-118px)] min-h-[610px] max-h-[790px] max-w-[1500px] px-12 xl:px-16"
        >
          <div className="flex h-full flex-col border-t border-white/[0.08]">
            {/* Stage navigation */}
            <div className="relative shrink-0 py-6">
              <div className="absolute left-0 right-0 top-[47px] h-px bg-white/10" />

              <div
                ref={progressRef}
                className="absolute left-0 right-0 top-[47px] h-px origin-left scale-x-0 bg-[#f56616]"
              />

              <div className="relative grid grid-cols-4">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const current = index === activeStage;
                  const completed = index < activeStage;

                  return (
                    <button
                      key={stage.number}
                      type="button"
                      aria-label={`${stage.number} ${stage.label}`}
                      className="group relative flex items-center gap-4 text-left"
                    >
                      <div
                        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                          current
                            ? "border-[#f56616] bg-[#f56616] text-white shadow-[0_0_35px_rgba(245,102,22,0.18)]"
                            : completed
                              ? "border-[#f56616]/50 bg-[#251b16] text-[#f56616]"
                              : "border-white/15 bg-[#171717] text-white/30"
                        }`}
                      >
                        <Icon size={17} strokeWidth={1.6} />
                      </div>

                      <div>
                        <span
                          className={`block text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                            current || completed
                              ? "text-[#f56616]"
                              : "text-white/25"
                          }`}
                        >
                          {stage.number}
                        </span>

                        <span
                          className={`mt-0.5 block text-sm font-semibold transition-colors duration-500 ${
                            current
                              ? "text-white"
                              : completed
                                ? "text-white/65"
                                : "text-white/30"
                          }`}
                        >
                          {stage.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main changing composition */}
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
                  className="pointer-events-none absolute select-none text-[clamp(11rem,18vw,18rem)] font-semibold leading-none tracking-[-0.105em] text-white/[0.035]"
                >
                  {active.number}
                </div>

                <motion.div
                  key={`icon-${activeStage}`}
                  ref={iconWrapRef}
                  whileHover={{
                    scale: 1.06,
                    rotate: 3,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 18,
                  }}
                  className="relative z-10 flex h-[112px] w-[112px] items-center justify-center rounded-full border border-[#f56616]/35 bg-[#241a15] text-[#f56616] shadow-[0_20px_80px_rgba(0,0,0,0.32)]"
                >
                  <StageIcon index={activeStage} size={36} />
                </motion.div>

                <span className="absolute right-[19%] top-[25%] h-2 w-2 rounded-full bg-[#f56616]" />

                <span className="absolute bottom-[25%] left-[18%] h-1.5 w-1.5 rounded-full bg-white/25" />

                <div className="absolute bottom-7 left-0 flex items-center gap-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/25">
                    Process
                  </span>

                  <span className="h-px w-16 bg-white/10" />

                  <span className="text-[10px] font-semibold text-[#f56616]">
                    {active.number}
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
                    {active.eyebrow}
                  </span>

                  <span className="h-px flex-1 bg-white/[0.09]" />
                </div>

                <h3 className="mt-7 max-w-[780px] text-[clamp(3rem,4.25vw,4.65rem)] font-medium leading-[0.96] tracking-[-0.052em]">
                  {active.title}
                </h3>

                <p className="mt-6 max-w-[690px] text-[17px] leading-8 text-white/48">
                  {active.description}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {active.details.map((detail, index) => (
                    <div
                      key={detail}
                      className={`group min-h-[86px] border-t pt-4 transition-colors duration-300 ${
                        index === 0
                          ? "border-[#f56616]/65"
                          : "border-white/10 hover:border-[#f56616]/40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#f56616]/30 text-[#f56616]">
                          <Check size={10} strokeWidth={2.2} />
                        </span>

                        <span className="text-xs font-medium leading-5 text-white/55 transition-colors duration-300 group-hover:text-white/85">
                          {detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
                  <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/25">
                    Design · Consult · Execute · Support
                  </span>

                  <span className="font-mono text-[11px] text-white/30">
                    {String(activeStage + 1).padStart(2, "0")}
                    <span className="mx-2 text-white/15">/</span>
                    04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* MOBILE / TABLET JOURNEY */}
      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 sm:px-8 lg:hidden">
        <div className="mb-7 flex items-center justify-between border-y border-white/[0.08] py-4">
          <span className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#f56616]">
            Our delivery model
          </span>

          <span className="font-mono text-[10px] text-white/30">
            01 — 04
          </span>
        </div>

        <div>
          {stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <article
                key={stage.number}
                className="mobile-stage-card border-b border-white/[0.08] py-9 first:pt-3 sm:py-12"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f56616]/30 bg-[#f56616]/10 text-[#f56616]">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                        {stage.number}
                      </span>

                      <span className="mt-0.5 block text-sm font-semibold">
                        {stage.label}
                      </span>
                    </div>
                  </div>

                  <span className="select-none text-5xl font-semibold tracking-[-0.08em] text-white/[0.04] sm:text-6xl">
                    {stage.number}
                  </span>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f56616]">
                      {stage.eyebrow}
                    </span>

                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <h3 className="mt-5 text-[clamp(2rem,8vw,3.5rem)] font-medium leading-[1] tracking-[-0.045em]">
                    {stage.title}
                  </h3>

                  <p className="mt-5 max-w-[680px] text-sm leading-7 text-white/50 sm:text-base">
                    {stage.description}
                  </p>

                  <div className="mt-7 grid gap-0 sm:grid-cols-3 sm:gap-4">
                    {stage.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-start gap-3 border-t border-white/10 py-4 sm:min-h-[82px]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#f56616]/25 text-[#f56616]">
                          <Check size={10} strokeWidth={2} />
                        </span>

                        <span className="text-xs font-medium leading-5 text-white/55">
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
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-16 xl:px-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
                Built around accountability
              </span>
            </div>

            <p className="mt-5 max-w-[900px] text-[clamp(1.7rem,2.8vw,2.8rem)] font-medium leading-[1.06] tracking-[-0.04em] text-white/85">
              Engineering discipline before installation.
              <span className="text-white/32">
                {" "}
                Traceability after commissioning.
              </span>
            </p>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
            }}
            className="flex min-w-[245px] items-center justify-between gap-8 rounded-full border border-white/10 px-6 py-4"
          >
            <div>
              <div className="text-2xl font-semibold tracking-[-0.04em] text-[#f56616]">
                &lt;1.5%
              </div>

              <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white/35">
                Complaint ratio
              </div>
            </div>

            <ArrowUpRight
              size={17}
              className="text-white/45"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
