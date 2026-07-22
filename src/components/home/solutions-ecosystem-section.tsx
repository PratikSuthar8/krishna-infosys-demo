"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Camera,
  ShieldCheck,
  Radio,
  Network,
  Flame,
  HousePlug,
  Cable,
  ScanFace,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: "security",
    number: "01",
    short: "SEC",
    title: "Security & Surveillance",
    description:
      "Integrated electronic security architecture designed around visibility, controlled access and proactive protection.",
    items: [
      "CCTV Surveillance",
      "Intrusion Alarm",
      "Access Control",
      "Time & Attendance",
      "Digital Locks",
    ],
    icon: Camera,
    position: "left-[0%] top-[7%]",
  },
  {
    id: "communication",
    number: "02",
    short: "COM",
    title: "Communication Systems",
    description:
      "Connected communication infrastructure engineered for clear, dependable communication across facilities.",
    items: [
      "Public Address",
      "Intercom / EPABX",
      "Video Conference",
      "Video Door Phone",
    ],
    icon: Radio,
    position: "right-[0%] top-[7%]",
  },
  {
    id: "network",
    number: "03",
    short: "NET",
    title: "Network Infrastructure",
    description:
      "The digital backbone connecting people, systems and infrastructure through structured high-performance networks.",
    items: [
      "IT Network Solutions",
      "Fiber Solutions",
      "Wi-Fi / RF",
      "Structured Cabling",
    ],
    icon: Network,
    position: "right-[-1%] top-[43%]",
  },
  {
    id: "fire",
    number: "04",
    short: "FAS",
    title: "Fire & Life Safety",
    description:
      "Detection and alert infrastructure designed to strengthen response readiness and protect occupied environments.",
    items: [
      "Fire Alarm Systems",
      "Integrated Alert Architecture",
    ],
    icon: Flame,
    position: "right-[5%] bottom-[2%]",
  },
  {
    id: "automation",
    number: "05",
    short: "AUT",
    title: "Automation & Experience",
    description:
      "Intelligent automation and audiovisual environments that bring control, convenience and experience together.",
    items: [
      "Home Automation",
      "Home Theatre",
      "Audio Video Solutions",
      "Multi-room Integration",
    ],
    icon: HousePlug,
    position: "left-[5%] bottom-[2%]",
  },
  {
    id: "perimeter",
    number: "06",
    short: "ACC",
    title: "Entrance & Perimeter",
    description:
      "Controlled vehicle and pedestrian movement integrated into the wider security ecosystem.",
    items: [
      "Boom Barriers",
      "Gate Automation",
      "Entrance Control",
    ],
    icon: ScanFace,
    position: "left-[-1%] top-[43%]",
  },
];

const connectorLines = [
  [260, 260, 82, 82],
  [260, 260, 438, 82],
  [260, 260, 493, 260],
  [260, 260, 418, 444],
  [260, 260, 102, 444],
  [260, 260, 28, 260],
];

export function SolutionsEcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopExperienceRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const isClickSyncingRef = useRef(false);
  const [active, setActive] = useState(0);

  const solution = solutions[active];

  const activateStage = (index: number) => {
    const safeIndex = Math.max(0, Math.min(solutions.length - 1, index));

    if (activeRef.current === safeIndex) return;

    activeRef.current = safeIndex;
    setActive(safeIndex);
  };

  const handleDesktopNodeClick = (index: number) => {
    activateStage(index);

    const trigger = scrollTriggerRef.current;

    if (!trigger) return;

    const targetProgress =
      solutions.length > 1 ? index / (solutions.length - 1) : 0;

    const targetScroll =
      trigger.start + (trigger.end - trigger.start) * targetProgress;

    isClickSyncingRef.current = true;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      isClickSyncingRef.current = false;
    }, 700);
  };

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".solutions-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 74%",
          once: true,
        },
      });

      gsap.to(".ecosystem-orbit-a", {
        rotate: 360,
        duration: 55,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".ecosystem-orbit-b", {
        rotate: -360,
        duration: 72,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as {
            desktop?: boolean;
            reduceMotion?: boolean;
          };

          if (
            !conditions.desktop ||
            conditions.reduceMotion ||
            !desktopExperienceRef.current
          ) {
            return;
          }

          const trigger = ScrollTrigger.create({
            trigger: desktopExperienceRef.current,
            start: "top top+=96",
            end: () =>
              `+=${Math.max(
                window.innerHeight * 2.15,
                solutions.length * 260
              )}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              if (isClickSyncingRef.current) return;

              const rawIndex = Math.round(
                self.progress * (solutions.length - 1)
              );

              activateStage(rawIndex);
            },

            onEnterBack: (self) => {
              if (isClickSyncingRef.current) return;

              const rawIndex = Math.round(
                self.progress * (solutions.length - 1)
              );

              activateStage(rawIndex);
            },
          });

          scrollTriggerRef.current = trigger;

          return () => {
            if (scrollTriggerRef.current === trigger) {
              scrollTriggerRef.current = null;
            }

            trigger.kill();
          };
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f6f3] text-[#171717]"
    >
      {/* TECHNICAL GRID */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,20,20,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,20,.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
        {/* SECTION INTRO */}
        <div className="solutions-reveal mb-12 flex flex-col gap-6 border-b border-black/10 pb-8 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                Integrated solutions ecosystem
              </span>
            </div>

            <h2 className="mt-5 max-w-[850px] text-[clamp(2.8rem,4.7vw,5.2rem)] font-medium leading-[0.93] tracking-[-0.055em]">
              One infrastructure.
              <span className="ml-[0.18em] text-black/30">
                Every system connected.
              </span>
            </h2>
          </div>

          <p className="max-w-[420px] text-sm leading-6 text-black/50 lg:pb-1 lg:text-base lg:leading-7">
            Six integrated ELV disciplines engineered as one coordinated
            environment — from design and supply through integration,
            commissioning and lifecycle support.
          </p>
        </div>

        {/* DESKTOP UNIFIED EXPERIENCE */}
        <div
          ref={desktopExperienceRef}
          className="hidden min-h-[650px] grid-cols-[0.78fr_1.22fr] items-center gap-12 lg:grid xl:gap-20"
        >
          {/* ACTIVE INFORMATION */}
          <div className="solutions-reveal relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#f56616]">
                    {solution.number}
                  </span>

                  <span className="h-px w-10 bg-[#f56616]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/35">
                    {solution.short} / Active system
                  </span>
                </div>

                <h3 className="mt-6 max-w-[560px] text-[clamp(2.7rem,4vw,4.7rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                  {solution.title}
                </h3>

                <p className="mt-6 max-w-[510px] text-base leading-7 text-black/50 xl:text-lg xl:leading-8">
                  {solution.description}
                </p>

                <div className="mt-8 max-w-[540px] border-t border-black/10">
                  {solution.items.map((item, index) => (
                    <motion.button
                      key={`${solution.id}-${item}`}
                      type="button"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.045,
                        duration: 0.28,
                      }}
                      className="group flex w-full items-center justify-between border-b border-black/10 py-3.5 text-left"
                    >
                      <span className="text-sm font-medium text-black/60 transition-colors duration-300 group-hover:text-black">
                        {item}
                      </span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-[#f56616]/40 group-hover:bg-[#f56616] group-hover:text-white">
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f56616]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    Select any system from the ecosystem
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* INTERACTIVE ECOSYSTEM */}
          <div className="solutions-reveal relative mx-auto h-[610px] w-full max-w-[760px]">
            {/* ORBIT SYSTEM */}
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2">
              <div className="ecosystem-orbit-a absolute inset-0 rounded-full border border-black/[0.07]">
                <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f56616]" />
              </div>

              <div className="ecosystem-orbit-b absolute inset-[12%] rounded-full border border-dashed border-[#f56616]/25">
                <span className="absolute bottom-[18%] right-[2%] h-1.5 w-1.5 rounded-full bg-[#171717]" />
              </div>

              <div className="absolute inset-[25%] rounded-full border border-black/[0.08]" />

              <div className="absolute inset-[37%] rounded-full border border-dashed border-black/[0.07]" />

              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 520 520"
                fill="none"
              >
                {connectorLines.map((line, index) => (
                  <motion.line
                    key={index}
                    x1={line[0]}
                    y1={line[1]}
                    x2={line[2]}
                    y2={line[3]}
                    stroke={
                      active === index
                        ? "#f56616"
                        : "rgba(23,23,23,.11)"
                    }
                    strokeWidth={active === index ? 1.6 : 1}
                    strokeDasharray={
                      active === index ? "6 7" : "3 9"
                    }
                    animate={{
                      opacity: active === index ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </svg>

              {/* CORE */}
              <motion.div
                animate={{ scale: [1, 1.018, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 z-10 flex h-[158px] w-[158px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[11px] border-white bg-[#171717] text-center shadow-[0_30px_70px_rgba(0,0,0,.16)]"
              >
                <Cable
                  size={24}
                  strokeWidth={1.4}
                  className="text-[#f56616]"
                />

                <span className="mt-3 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Integrated
                </span>

                <strong className="mt-1 text-lg tracking-[-0.04em] text-white">
                  ELV Core
                </strong>
              </motion.div>
            </div>

            {/* CLICKABLE NODES */}
            {solutions.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === index;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`View ${item.title}`}
                  onClick={() => handleDesktopNodeClick(index)}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className={`absolute ${item.position} z-20 w-[205px] rounded-[20px] border p-3.5 text-left outline-none transition-[border-color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#f56616]/50 ${
                    isActive
                      ? "border-[#f56616]/50 bg-white shadow-[0_22px_55px_rgba(0,0,0,.11)]"
                      : "border-black/[0.08] bg-white/80 shadow-[0_12px_32px_rgba(0,0,0,.045)] backdrop-blur-md hover:border-black/15 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{
                        backgroundColor: isActive
                          ? "#f56616"
                          : "rgba(245,102,22,.10)",
                        color: isActive
                          ? "#ffffff"
                          : "#f56616",
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </motion.span>

                    <span className="min-w-0">
                      <span
                        className={`block text-[8px] font-bold uppercase tracking-[0.2em] transition-colors ${
                          isActive
                            ? "text-[#f56616]"
                            : "text-black/30"
                        }`}
                      >
                        {item.number} / {item.short}
                      </span>

                      <span className="mt-1 block text-[13px] font-semibold leading-[1.1] tracking-[-0.02em]">
                        {item.title}
                      </span>
                    </span>
                  </div>

                  {isActive && (
                    <motion.span
                      layoutId="active-node-line"
                      className="absolute bottom-[-1px] left-5 right-5 h-px bg-[#f56616]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* MOBILE / TABLET EXPERIENCE */}
        <div className="lg:hidden">
          <div className="solutions-reveal flex gap-2 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {solutions.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(index)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-black/10 bg-white/70 text-black/60"
                  }`}
                >
                  <Icon
                    size={16}
                    className={
                      isActive
                        ? "text-[#f56616]"
                        : "text-black/40"
                    }
                  />

                  {item.short}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-5 rounded-[28px] border border-black/[0.08] bg-white/65 p-6 backdrop-blur sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#f56616]">
                  {solution.number}
                </span>

                <span className="h-px w-8 bg-[#f56616]/60" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
                  {solution.short}
                </span>
              </div>

              <h3 className="mt-5 text-[clamp(2rem,8vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.05em]">
                {solution.title}
              </h3>

              <p className="mt-5 max-w-[600px] text-sm leading-6 text-black/50 sm:text-base sm:leading-7">
                {solution.description}
              </p>

              <div className="mt-7 border-t border-black/10">
                {solution.items.map((item, index) => (
                  <motion.button
                    key={item}
                    type="button"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="group flex w-full items-center justify-between border-b border-black/10 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-black/65">
                      {item}
                    </span>

                    <ArrowUpRight
                      size={15}
                      className="text-black/30"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SYSTEM STRIP */}
        <div className="solutions-reveal mt-12 flex flex-col gap-5 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-6">
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={17}
              strokeWidth={1.5}
              className="text-[#f56616]"
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40 sm:text-[10px]">
              Design · Supply · Install · Integrate · Maintain
            </span>
          </div>

          <div className="flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35 sm:text-[10px]">
            <span>Turnkey ELV</span>
            <span className="h-1 w-1 rounded-full bg-[#f56616]" />
            <span>One accountable partner</span>
          </div>
        </div>
      </div>
    </section>
  );
}
