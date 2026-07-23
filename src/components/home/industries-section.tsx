"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Building2,
  Check,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Network,
  PackageCheck,
  Pill,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Industry = {
  number: string;
  short: string;
  title: string;
  environments: string;
  statement: string;
  description: string;
  focus: string[];
  icon: LucideIcon;
  pattern: "hospitality" | "health" | "factory" | "logistics" | "education" | "finance" | "network" | "pharma";
};

const industries: Industry[] = [
  {
    number: "01",
    short: "HSP",
    title: "Hospitality",
    environments: "Hotels · Resorts · Serviced Apartments",
    statement: "Connected experiences without compromising security.",
    description:
      "Integrated ELV infrastructure for hospitality environments where guest experience, communication, security and operational continuity need to work as one coordinated ecosystem.",
    focus: [
      "Guest & perimeter security",
      "Communication infrastructure",
      "Connected building environments",
    ],
    icon: Hotel,
    pattern: "hospitality",
  },
  {
    number: "02",
    short: "HLT",
    title: "Healthcare",
    environments: "Hospitals · Clinics · Diagnostic Centres",
    statement: "Infrastructure engineered around critical environments.",
    description:
      "Dependable low-voltage systems for healthcare environments where controlled access, communication, surveillance and infrastructure availability demand disciplined engineering.",
    focus: [
      "Controlled access",
      "Surveillance coverage",
      "Reliable communication",
    ],
    icon: HeartPulse,
    pattern: "health",
  },
  {
    number: "03",
    short: "MFG",
    title: "Manufacturing",
    environments: "Food · Pharma · Auto Plants",
    statement: "Visibility and control across complex operations.",
    description:
      "Coordinated ELV architecture for production environments spanning surveillance, access, networking and communication across operationally demanding facilities.",
    focus: [
      "Plant-wide surveillance",
      "Access & attendance",
      "Network backbone",
    ],
    icon: Factory,
    pattern: "factory",
  },
  {
    number: "04",
    short: "LOG",
    title: "Logistics",
    environments: "Warehouses · Distribution Centres",
    statement: "Connected infrastructure across every movement point.",
    description:
      "Integrated security, communication and network infrastructure designed for warehouses, distribution facilities and multi-site logistics operations.",
    focus: [
      "Perimeter visibility",
      "Multi-site connectivity",
      "Access management",
    ],
    icon: PackageCheck,
    pattern: "logistics",
  },
  {
    number: "05",
    short: "EDU",
    title: "Education",
    environments: "Schools · Colleges · Campuses",
    statement: "Safer, better-connected learning environments.",
    description:
      "Scalable ELV systems for educational campuses that bring surveillance, communication, networking and controlled access into one manageable environment.",
    focus: [
      "Campus surveillance",
      "Communication systems",
      "Structured networking",
    ],
    icon: GraduationCap,
    pattern: "education",
  },
  {
    number: "06",
    short: "BNK",
    title: "Banking & Finance",
    environments: "Branches · ATMs · Vaults",
    statement: "Security infrastructure where accountability is essential.",
    description:
      "Security-led ELV architecture for financial environments requiring controlled access, traceable surveillance and dependable infrastructure across sensitive spaces.",
    focus: [
      "Critical surveillance",
      "Controlled access",
      "Secure environments",
    ],
    icon: Landmark,
    pattern: "finance",
  },
  {
    number: "07",
    short: "IT",
    title: "IT / Corporate",
    environments: "Data Centres · Offices · IT Parks",
    statement: "The connected backbone behind modern workplaces.",
    description:
      "Integrated network, security, communication and access infrastructure engineered for connected workplaces, technology environments and business-critical facilities.",
    focus: [
      "Structured networks",
      "Enterprise security",
      "Unified communication",
    ],
    icon: Network,
    pattern: "network",
  },
  {
    number: "08",
    short: "PFB",
    title: "Pharma / F&B",
    environments: "Clean Rooms · Production Facilities",
    statement: "Precision infrastructure for controlled production.",
    description:
      "Engineered ELV environments supporting security, connectivity and operational visibility across controlled production and process-driven facilities.",
    focus: [
      "Controlled environments",
      "Operational visibility",
      "Reliable connectivity",
    ],
    icon: Pill,
    pattern: "pharma",
  },
];

function TechnicalPattern({
  type,
  active,
}: {
  type: Industry["pattern"];
  active: boolean;
}) {
  if (!active) return null;

  if (type === "factory") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.075]"
      >
        <div className="absolute -bottom-10 -right-10 h-[72%] w-[72%]">
          <div className="absolute bottom-0 left-[8%] h-[48%] w-[14%] border-x border-t border-black" />
          <div className="absolute bottom-0 left-[25%] h-[68%] w-[16%] border-x border-t border-black" />
          <div className="absolute bottom-0 left-[44%] h-[40%] w-[14%] border-x border-t border-black" />
          <div className="absolute bottom-0 left-[61%] h-[80%] w-[12%] border-x border-t border-black" />
          <div className="absolute bottom-0 left-[76%] h-[57%] w-[15%] border-x border-t border-black" />
          <div className="absolute bottom-[22%] left-0 h-px w-full bg-black" />
          <div className="absolute bottom-[44%] left-0 h-px w-full bg-black" />
        </div>
      </div>
    );
  }

  if (type === "network") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]"
      >
        <div
          className="absolute inset-y-0 right-0 w-[72%]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 49%, rgba(0,0,0,.9) 50%, transparent 51%)",
            backgroundSize: "46px 100%",
          }}
        />
        {[18, 34, 51, 68, 84].map((top, index) => (
          <span
            key={top}
            className="absolute right-[8%] h-2 w-2 rounded-full bg-black"
            style={{
              top: `${top}%`,
              right: `${8 + index * 11}%`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "health") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]"
      >
        <div className="absolute right-[8%] top-1/2 h-px w-[68%] bg-black" />
        <div className="absolute right-[12%] top-[calc(50%-32px)] h-16 w-px bg-black" />
        <div className="absolute right-[28%] top-[calc(50%-70px)] h-[140px] w-px bg-black" />
        <div className="absolute right-[44%] top-[calc(50%-44px)] h-[88px] w-px bg-black" />
        <div className="absolute right-[60%] top-[calc(50%-90px)] h-[180px] w-px bg-black" />
      </div>
    );
  }

  if (type === "hospitality") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,.9) 1px, transparent 1px), linear-gradient(rgba(0,0,0,.9) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage:
            "linear-gradient(to left, black, transparent 78%)",
        }}
      />
    );
  }

  if (type === "logistics") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.065]"
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="absolute h-px w-[65%] origin-right rotate-[-18deg] bg-black"
            style={{
              right: "-8%",
              top: `${22 + index * 15}%`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "education") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.9) 1px, transparent 1px)",
          backgroundSize: "100% 42px",
          maskImage:
            "linear-gradient(to left, black, transparent 75%)",
        }}
      />
    );
  }

  if (type === "finance") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]"
      >
        <div className="absolute bottom-[10%] right-[7%] flex h-[72%] w-[68%] items-end justify-between gap-4">
          {[38, 61, 48, 82, 66, 94, 73].map((height, index) => (
            <div
              key={index}
              className="flex-1 border-x border-t border-black"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.055]"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(0,0,0,.8) 1px, transparent 1px), linear-gradient(-45deg, rgba(0,0,0,.8) 1px, transparent 1px)",
        backgroundSize: "34px 34px",
        maskImage:
          "linear-gradient(to left, black, transparent 72%)",
      }}
    />
  );
}

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /*
   * active = panel currently displayed.
   * locked = panel explicitly selected by click.
   *
   * Hover can temporarily preview another panel.
   * When the pointer leaves the panorama, we return to the locked panel.
   */
  const [active, setActive] = useState(2);
  const [locked, setLocked] = useState(2);
  const [mobileActive, setMobileActive] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".industries-heading-reveal", {
        y: 44,
        opacity: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
          once: true,
        },
      });

      gsap.from(".industry-panorama", {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".industry-panorama",
          start: "top 84%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const selectDesktopIndustry = (index: number) => {
    setActive(index);
    setLocked(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111111] text-white"
    >
      {/* Quiet architectural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px)",
          backgroundSize: "100% 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 88%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        {/* HEADER */}
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          <div className="industries-heading-reveal">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                Market segments we serve
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/25">
              <Building2 size={14} strokeWidth={1.5} />

              <span>08 operating environments</span>
            </div>
          </div>

          <div>
            <h2 className="industries-heading-reveal max-w-[980px] text-[clamp(3rem,5.4vw,5.8rem)] font-medium leading-[0.93] tracking-[-0.06em]">
              Infrastructure changes
              <span className="block text-white/32">
                with the environment.
              </span>
            </h2>

            <div className="industries-heading-reveal mt-8 grid max-w-[900px] gap-6 border-t border-white/10 pt-6 sm:grid-cols-[0.85fr_1.15fr]">
              <p className="text-[clamp(1.25rem,2vw,1.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white/80">
                We engineer accordingly.
              </p>

              <p className="max-w-[600px] text-sm leading-7 text-white/42 sm:text-base">
                Every facility creates a different operational challenge.
                Our ELV architecture is shaped around the people, processes,
                risks and infrastructure of each environment.
              </p>
            </div>
          </div>
        </div>

        {/* DESKTOP PANORAMA */}
        <div
          className="industry-panorama mt-14 hidden h-[610px] overflow-hidden border border-white/10 lg:flex xl:h-[650px]"
          onMouseLeave={() => setActive(locked)}
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isActive = active === index;

            return (
              <motion.article
                key={industry.title}
                layout
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 180,
                    damping: 25,
                    mass: 0.85,
                  },
                }}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => selectDesktopIndustry(index)}
                className={`relative min-w-0 cursor-pointer overflow-hidden border-r border-white/10 last:border-r-0 ${
                  isActive
                    ? "bg-[#f2f0ea] text-[#171717]"
                    : "bg-[#161616] text-white"
                }`}
                style={{
                  flex: isActive ? "5.4 1 0%" : "0.72 1 0%",
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
              >
                <TechnicalPattern
                  type={industry.pattern}
                  active={isActive}
                />

                <AnimatePresence initial={false} mode="popLayout">
                  {isActive ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.08,
                      }}
                      className="relative z-10 flex h-full flex-col p-8 xl:p-10"
                    >
                      {/* Expanded top */}
                      <div className="flex items-start justify-between gap-8">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#f56616]">
                              {industry.number} / {industry.short}
                            </span>

                            <span className="h-px w-12 bg-[#f56616]/50" />
                          </div>

                          <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-black/35">
                            {industry.environments}
                          </div>
                        </div>

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/55 text-[#f56616]">
                          <Icon size={23} strokeWidth={1.45} />
                        </div>
                      </div>

                      {/* Expanded main */}
                      <div className="mt-auto max-w-[720px] pb-5">
                        <motion.h3
                          key={`${industry.title}-title`}
                          initial={{ y: 18, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.38,
                            delay: 0.08,
                          }}
                          className="text-[clamp(3rem,5vw,5.7rem)] font-medium leading-[0.88] tracking-[-0.065em]"
                        >
                          {industry.title}
                        </motion.h3>

                        <motion.p
                          key={`${industry.title}-statement`}
                          initial={{ y: 16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.38,
                            delay: 0.13,
                          }}
                          className="mt-6 max-w-[650px] text-[clamp(1.35rem,2vw,2rem)] font-medium leading-[1.12] tracking-[-0.035em] text-black/72"
                        >
                          {industry.statement}
                        </motion.p>

                        <motion.p
                          key={`${industry.title}-description`}
                          initial={{ y: 14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.38,
                            delay: 0.18,
                          }}
                          className="mt-5 max-w-[650px] text-sm leading-7 text-black/50 xl:text-base"
                        >
                          {industry.description}
                        </motion.p>
                      </div>

                      {/* Expanded focus */}
                      <div className="grid grid-cols-3 border-t border-black/10">
                        {industry.focus.map((item, focusIndex) => (
                          <motion.div
                            key={item}
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay: 0.2 + focusIndex * 0.055,
                            }}
                            className="border-r border-black/10 px-4 py-5 first:pl-0 last:border-r-0"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#f56616]/30 text-[#f56616]">
                                <Check size={10} strokeWidth={2.2} />
                              </span>

                              <span className="text-xs font-semibold leading-5 text-black/58">
                                {item}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: 0.1,
                      }}
                      className="relative z-10 flex h-full flex-col items-center py-7"
                    >
                      <span className="text-[9px] font-bold tracking-[0.2em] text-white/22">
                        {industry.number}
                      </span>

                      <div className="mt-7 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/35 transition-colors duration-300 hover:border-[#f56616]/35 hover:text-[#f56616]">
                        <Icon size={17} strokeWidth={1.5} />
                      </div>

                      <div className="flex flex-1 items-center justify-center">
                        <span
                          className="whitespace-nowrap text-[13px] font-semibold tracking-[0.02em] text-white/48"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          {industry.title}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={14}
                        className="text-white/20"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* DESKTOP INTERACTION NOTE */}
        <div className="industries-heading-reveal mt-4 hidden items-center justify-between lg:flex">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/22">
            Hover to preview · Click to hold
          </span>

          <div className="flex items-center gap-2">
            {industries.map((industry, index) => (
              <button
                key={industry.short}
                type="button"
                onClick={() => selectDesktopIndustry(index)}
                aria-label={`Open ${industry.title}`}
                className={`h-1 transition-all duration-300 ${
                  active === index
                    ? "w-8 bg-[#f56616]"
                    : "w-3 bg-white/15 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>

        {/* MOBILE / TABLET */}
        <div className="industry-panorama mt-12 border-t border-white/10 lg:hidden">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isOpen = mobileActive === index;

            return (
              <div
                key={industry.title}
                className="border-b border-white/10"
              >
                <button
                  type="button"
                  onClick={() =>
                    setMobileActive((current) =>
                      current === index ? null : index
                    )
                  }
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`w-7 text-[9px] font-bold tracking-[0.18em] ${
                      isOpen ? "text-[#f56616]" : "text-white/22"
                    }`}
                  >
                    {industry.number}
                  </span>

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-[#f56616]/40 bg-[#f56616]/10 text-[#f56616]"
                        : "border-white/10 text-white/35"
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-[17px] font-semibold tracking-[-0.025em] ${
                        isOpen ? "text-white" : "text-white/60"
                      }`}
                    >
                      {industry.title}
                    </div>

                    <div className="mt-1 truncate text-[9px] font-medium uppercase tracking-[0.12em] text-white/25">
                      {industry.environments}
                    </div>
                  </div>

                  <motion.span
                    animate={{
                      rotate: isOpen ? 45 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`text-xl font-light ${
                      isOpen ? "text-[#f56616]" : "text-white/30"
                    }`}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="relative mb-5 overflow-hidden bg-[#f2f0ea] p-6 text-[#171717] sm:p-8">
                        <TechnicalPattern
                          type={industry.pattern}
                          active
                        />

                        <div className="relative z-10">
                          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
                            {industry.short} / Environment profile
                          </span>

                          <h3 className="mt-7 max-w-[600px] text-[clamp(2.3rem,8vw,4rem)] font-medium leading-[0.94] tracking-[-0.055em]">
                            {industry.statement}
                          </h3>

                          <p className="mt-5 max-w-[650px] text-sm leading-7 text-black/52 sm:text-base">
                            {industry.description}
                          </p>

                          <div className="mt-8 grid gap-0 border-t border-black/10 sm:grid-cols-3">
                            {industry.focus.map((item) => (
                              <div
                                key={item}
                                className="flex items-start gap-2.5 border-b border-black/10 py-4 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                              >
                                <Check
                                  size={14}
                                  strokeWidth={2}
                                  className="mt-0.5 shrink-0 text-[#f56616]"
                                />

                                <span className="text-xs font-semibold leading-5 text-black/58">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* FOOTER LINE */}
        <div className="industries-heading-reveal mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#f56616]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/32">
              Engineered around the environment — never a one-size-fits-all specification
            </span>
          </div>

          <button
            type="button"
            className="group flex w-fit items-center gap-2 text-xs font-semibold text-white/55 transition-colors hover:text-white"
          >
            Explore industry solutions

            <ArrowUpRight
              size={15}
              className="text-[#f56616] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
