"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: 850,
    suffix: "+",
    label: "Clients",
    note: "Relationships built across sectors and operating environments.",
    icon: Building2,
  },
  {
    value: 2100,
    suffix: "+",
    label: "Projects completed",
    note: "ELV projects delivered across diverse infrastructure requirements.",
    icon: CheckCircle2,
  },
  {
    value: 1.5,
    prefix: "<",
    suffix: "%",
    label: "Complaint ratio",
    note: "A service benchmark shaped by engineering discipline and support.",
    icon: ShieldCheck,
    decimals: 1,
  },
];

const journey = [
  {
    year: "2001",
    title: "Founded",
    description: "Servers & Networking",
  },
  {
    year: "2007",
    title: "ELV evolution",
    description: "Pivoted to ELV Projects",
  },
  {
    year: "2019",
    title: "Expanded reach",
    description: "Pan-India Expansion",
  },
  {
    year: "Today",
    title: "Built at scale",
    description: "850+ Clients · 2,100+ Projects",
  },
];

export function ProvenScaleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proof-reveal", {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".proof-intro",
          start: "top 78%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".proof-metric").forEach((metric) => {
        const number = metric.querySelector<HTMLElement>("[data-count]");
        if (!number) return;

        const target = Number(number.dataset.count ?? 0);
        const decimals = Number(number.dataset.decimals ?? 0);
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: metric,
            start: "top 84%",
            once: true,
          },
          onUpdate: () => {
            number.textContent =
              decimals > 0
                ? counter.value.toFixed(decimals)
                : Math.round(counter.value).toLocaleString("en-IN");
          },
        });

        gsap.from(metric, {
          y: 35,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: metric,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.from(".journey-line-progress", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".proof-journey",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".journey-item", {
        y: 24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".proof-journey",
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(".proof-orbit", {
        rotate: 360,
        duration: 55,
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
      className="relative overflow-hidden bg-white text-[#171717]"
    >
      {/* Technical background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,20,20,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,20,.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
        }}
      />

      {/* Decorative engineering vector */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-12 hidden h-[460px] w-[460px] rounded-full border border-black/[0.04] lg:block"
      >
        <div className="proof-orbit absolute inset-12 rounded-full border border-dashed border-[#f56616]/15">
          <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f56616]" />
        </div>

        <div className="absolute inset-28 rounded-full border border-black/[0.05]" />

        <div className="absolute left-1/2 top-1/2 h-px w-[75%] -translate-x-1/2 bg-black/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[75%] w-px -translate-y-1/2 bg-black/[0.04]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        {/* INTRO */}
        <div className="proof-intro grid gap-12 border-b border-black/10 pb-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:pb-20">
          <div className="proof-reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                Proven at scale
              </span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-[#f7f6f3] text-[#f56616]">
                <Award size={20} strokeWidth={1.5} />
              </span>

              <div>
                <div className="text-sm font-semibold">
                  ISO 9001:2015
                </div>
                <div className="mt-1 text-xs text-black/40">
                  Certified processes
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="proof-reveal max-w-[930px] text-[clamp(3rem,5.4vw,5.9rem)] font-medium leading-[0.93] tracking-[-0.06em]">
              Trust isn&apos;t claimed.
              <span className="block text-black/30">
                It&apos;s accumulated.
              </span>
            </h2>

            <div className="proof-reveal mt-8 grid max-w-[900px] gap-6 border-t border-black/10 pt-7 sm:grid-cols-2">
              <p className="text-base leading-7 text-black/60 sm:text-lg sm:leading-8">
                Since 2001, Krishna Infosys has evolved from servers and
                networking into an end-to-end ELV turnkey solutions partner.
              </p>

              <div className="flex items-start gap-3 text-sm leading-7 text-black/45 sm:text-base">
                <MapPinned
                  size={18}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-[#f56616]"
                />

                <p>
                  Delivering across India — from Gujarat metros to the
                  Lakshadweep Islands.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid border-b border-black/10 lg:grid-cols-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.label}
                whileHover={{ y: -4 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className={`proof-metric group relative min-h-[310px] py-10 lg:px-9 lg:py-12 ${
                  index !== 0
                    ? "border-t border-black/10 lg:border-l lg:border-t-0"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/30">
                    Evidence / 0{index + 1}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/35 transition-all duration-300 group-hover:border-[#f56616]/30 group-hover:bg-[#f56616] group-hover:text-white">
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                </div>

                <div className="mt-14 flex items-start tracking-[-0.07em]">
                  {metric.prefix && (
                    <span className="mr-1 mt-2 text-[clamp(2rem,3vw,3.2rem)] font-medium text-[#f56616]">
                      {metric.prefix}
                    </span>
                  )}

                  <span
                    data-count={metric.value}
                    data-decimals={metric.decimals ?? 0}
                    className="text-[clamp(4rem,6.5vw,7rem)] font-medium leading-[0.82]"
                  >
                    0
                  </span>

                  <span className="ml-1 text-[clamp(2.3rem,3.5vw,4rem)] font-medium leading-none text-[#f56616]">
                    {metric.suffix}
                  </span>
                </div>

                <div className="mt-7 border-t border-black/10 pt-5">
                  <h3 className="text-lg font-semibold tracking-[-0.025em]">
                    {metric.label}
                  </h3>

                  <p className="mt-2 max-w-[330px] text-sm leading-6 text-black/45">
                    {metric.note}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SUPPORTING PROOF STRIP */}
        <div className="grid border-b border-black/10 sm:grid-cols-2">
          <div className="flex min-h-[125px] items-center justify-between gap-8 py-7 sm:pr-8">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
                Team capability
              </span>

              <div className="mt-2 flex items-baseline gap-2">
                <strong className="text-3xl font-semibold tracking-[-0.05em]">
                  22
                </strong>

                <span className="text-sm font-medium text-black/45">
                  Expert staff
                </span>
              </div>
            </div>

            <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#f7f6f3] text-[#f56616] sm:flex">
              <Building2 size={17} strokeWidth={1.5} />
            </span>
          </div>

          <div className="flex min-h-[125px] items-center justify-between gap-8 border-t border-black/10 py-7 sm:border-l sm:border-t-0 sm:pl-8">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
                Established
              </span>

              <div className="mt-2 flex items-baseline gap-2">
                <strong className="text-3xl font-semibold tracking-[-0.05em]">
                  Since 2001
                </strong>
              </div>
            </div>

            <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-[#f56616] sm:flex">
              <Award size={17} strokeWidth={1.5} />
            </span>
          </div>
        </div>

        {/* JOURNEY */}
        <div className="proof-journey pt-16 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <div className="journey-item flex items-center gap-3">
                <span className="h-px w-8 bg-[#f56616]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
                  The journey
                </span>
              </div>

              <p className="journey-item mt-5 max-w-[390px] text-[clamp(1.7rem,2.6vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.045em]">
                Built through evolution,
                <span className="text-black/30">
                  {" "}
                  not overnight.
                </span>
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[5px] top-[8px] bottom-[8px] w-px bg-black/10 lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto" />

              <div className="journey-line-progress absolute left-[5px] top-[8px] hidden h-px bg-[#f56616] lg:block lg:left-0 lg:right-0" />

              <div className="relative grid gap-0 lg:grid-cols-4">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    whileHover={{ y: -3 }}
                    className="journey-item relative grid grid-cols-[28px_1fr] gap-4 pb-8 last:pb-0 lg:block lg:pb-0 lg:pr-6"
                  >
                    <div className="relative z-10 mt-[2px] h-[11px] w-[11px] rounded-full border-[3px] border-white bg-[#f56616] shadow-[0_0_0_1px_rgba(245,102,22,.25)] lg:mt-[2px]" />

                    <div className="lg:mt-7">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
                        {item.year}
                      </span>

                      <h3 className="mt-2 text-base font-semibold tracking-[-0.025em]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-black/40">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* END CAP */}
        <div className="mt-16 flex flex-col gap-5 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={17}
              strokeWidth={1.5}
              className="text-[#f56616]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
              Experience · Scale · Accountability
            </span>
          </div>

          <motion.div
            whileHover={{ x: 3 }}
            className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40"
          >
            <span>Engineering trust since 2001</span>
            <ArrowUpRight size={15} className="text-[#f56616]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
