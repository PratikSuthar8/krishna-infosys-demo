"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  AudioLines,
  Cable,
  Camera,
  Check,
  Cpu,
  Network,
  Radio,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  {
    id: "security",
    number: "01",
    short: "SEC",
    title: "Security & Access",
    statement: "Visibility, verification and controlled movement.",
    description:
      "Integrated security architecture spanning surveillance, access and perimeter systems — engineered as one coordinated protection environment.",
    capabilities: [
      "IP / Analog CCTV",
      "Thermal Imaging",
      "ANPR Systems",
      "Access Control",
      "Intrusion Alarm",
      "Boom Barriers",
      "Video Door Phone",
    ],
    integration:
      "Security events can become actionable triggers across cameras, access systems and connected infrastructure.",
    icon: Camera,
  },
  {
    id: "communication",
    number: "02",
    short: "COM",
    title: "Communication",
    statement: "Communication infrastructure that stays connected.",
    description:
      "Voice, conferencing and public-address systems designed around clear communication, operational reach and emergency response.",
    capabilities: [
      "Intercom / EPABX",
      "Video Conferencing",
      "Public Address",
      "Emergency PA",
      "FTTH Infrastructure",
      "DTH Infrastructure",
    ],
    integration:
      "Communication systems can participate directly in security and emergency workflows instead of operating in isolation.",
    icon: Radio,
  },
  {
    id: "av",
    number: "03",
    short: "AV",
    title: "Audio Visual",
    statement: "Technology designed around how spaces are experienced.",
    description:
      "Integrated audiovisual environments for boardrooms, auditoriums, professional spaces and high-performance entertainment.",
    capabilities: [
      "Home Theatre",
      "Professional Audio",
      "Conference Rooms",
      "Auditoriums",
      "Digital Signage",
      "Projection Systems",
    ],
    integration:
      "Audio and visual infrastructure is engineered around the space, application and wider technology environment.",
    icon: AudioLines,
  },
  {
    id: "network",
    number: "04",
    short: "NET",
    title: "Networking & Data",
    statement: "The backbone behind every connected system.",
    description:
      "Structured network infrastructure designed from physical cabling through connectivity, server environments and data-centre foundations.",
    capabilities: [
      "Structured Cabling",
      "Cat6 Infrastructure",
      "Fiber Networks",
      "Wi-Fi / RF Links",
      "Server Rooms",
      "Data Centres",
      "Rack & Patch Systems",
    ],
    integration:
      "A properly engineered network becomes the common backbone connecting security, communication and intelligent systems.",
    icon: Network,
  },
  {
    id: "automation",
    number: "05",
    short: "AUT",
    title: "Automation & Safety",
    statement: "Systems that respond, not simply operate.",
    description:
      "Automation and life-safety infrastructure connecting building controls, fire detection and coordinated system responses.",
    capabilities: [
      "Home Automation",
      "Building Automation",
      "Lighting Control",
      "HVAC Control",
      "Curtain Control",
      "Fire Alarm Systems",
      "System Integration",
    ],
    integration:
      "Connected events can trigger coordinated responses across fire, access, surveillance, communication and building controls.",
    icon: SlidersHorizontal,
  },
];

const oems = [
  "CP Plus",
  "PRAMA",
  "Panasonic",
  "i-PRO",
  "Hikvision",
  "Honeywell",
  "Bosch",
  "D-Link",
  "Cisco",
  "Panasonic",
];

export function TechnologyEcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const domain = domains[active];
  const ActiveIcon = domain.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-console-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
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
      className="relative overflow-hidden bg-[#faf9f7] text-[#171717]"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24 xl:px-12">
        {/* SECTION INTRO */}
        <div className="mb-10 grid gap-7 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                Technology ecosystem
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 text-black/35">
              <Cpu size={16} strokeWidth={1.5} />
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
                Multi-system ELV capability
              </span>
            </div>
          </div>

          <div>
            <h2 className="max-w-[930px] text-[clamp(2.7rem,4.8vw,5.3rem)] font-medium leading-[0.94] tracking-[-0.058em]">
              Technology without silos.
              <span className="block text-black/27">
                Systems designed to work together.
              </span>
            </h2>
          </div>
        </div>

        {/* MOBILE SELECTOR */}
        <div className="mb-5 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {domains.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold ${isActive
                    ? "border-[#171717] bg-[#171717] text-white"
                    : "border-black/10 bg-white text-black/55"
                    }`}
                >
                  <Icon
                    size={15}
                    className={isActive ? "text-[#f56616]" : ""}
                  />
                  {item.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* UNIFIED TECHNOLOGY CONSOLE */}
        <div className="tech-console-reveal overflow-hidden rounded-[2px] border border-black/[0.12] bg-[#f7f6f3]">
          {/* TOP BAR */}
          <div className="hidden min-h-[64px] border-b border-black/10 lg:grid lg:grid-cols-[0.28fr_0.52fr_0.20fr]">
            <div className="flex items-center justify-between border-r border-black/10 px-7">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/35">
                Technology channels
              </span>

              <SlidersHorizontal
                size={15}
                strokeWidth={1.5}
                className="text-[#f56616]"
              />
            </div>

            <div className="flex items-center justify-between border-r border-black/10 px-8">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#f56616]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.21em] text-black/35">
                  Active specification / {domain.short}
                </span>
              </div>

              <span className="font-mono text-[9px] text-black/25">
                {domain.number} / 05
              </span>
            </div>

            <div className="flex items-center px-7">
              <span className="text-[9px] font-bold uppercase tracking-[0.21em] text-black/35">
                Preferred OEM ecosystem
              </span>
            </div>
          </div>

          {/* MAIN CONSOLE */}
          <div className="grid items-stretch lg:grid-cols-[0.28fr_0.52fr_0.20fr]">
            {/* LEFT CHANNEL NAVIGATION */}
            <div className="hidden border-r border-black/10 lg:flex lg:flex-col">
              {domains.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`group relative flex min-h-[115px] items-center gap-4 border-b border-black/10 px-6 py-3 text-left transition-colors duration-300 last:border-b-0 ${isActive
                      ? "bg-[#171717] text-white"
                      : "bg-[#faf9f7] hover:bg-white"
                      }`}
                  >
                    <span
                      className={`w-4 font-mono text-[12px] font-bold ${isActive ? "text-[#f56616]" : "text-black/25"
                        }`}
                    >
                      {item.number}
                    </span>

                    <span
                      className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border ${isActive
                        ? "border-[#f56616]/45 bg-white/[0.035] text-[#f56616]"
                        : "border-black/10 bg-white text-black/40"
                        }`}
                    >
                      <Icon size={25} strokeWidth={1.45} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[12px] font-bold uppercase tracking-[0.19em] ${isActive ? "text-white/35" : "text-black/27"
                          }`}
                      >
                        {item.short}
                      </span>

                      <span className="mt-0.5 block text-[15px] font-semibold tracking-[-0.025em]">
                        {item.title}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={15}
                      className={
                        isActive
                          ? "text-[#f56616]"
                          : "text-black/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      }
                    />
                  </button>
                );
              })}
            </div>

            {/* CENTER ACTIVE SPECIFICATION */}
            <div className="min-w-0 border-black/10 lg:border-r">
              {/* MOBILE ACTIVE BAR */}
              <div className="flex h-14 items-center justify-between border-b border-black/10 px-5 lg:hidden">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#f56616]" />
                  <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-black/35">
                    Active specification / {domain.short}
                  </span>
                </div>

                <span className="font-mono text-[8px] text-black/25">
                  {domain.number} / 05
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="flex h-full min-h-[570px] flex-col p-6 sm:p-8 lg:p-9 xl:p-10"
                >
                  <div className="flex items-start justify-between gap-8">
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-[0.21em] text-[#f56616]">
                        {domain.title}
                      </span>

                      <h3 className="mt-5 max-w-[720px] text-[clamp(2.4rem,3.8vw,4.15rem)] font-medium leading-[0.96] tracking-[-0.055em]">
                        {domain.statement}
                      </h3>
                    </div>

                    {/* TECHNICAL ICON */}
                    <div className="relative hidden h-[108px] w-[108px] shrink-0 items-center justify-center sm:flex">
                      <div className="absolute inset-0 rounded-full border border-[#f56616]/25" />

                      <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#f56616]" />
                      <span className="absolute right-[-3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#f56616]" />
                      <span className="absolute bottom-[-3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#f56616]" />
                      <span className="absolute left-[-3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#f56616]" />

                      <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#171717] text-[#f56616] shadow-[0_14px_35px_rgba(0,0,0,.12)]">
                        <ActiveIcon size={27} strokeWidth={1.3} />
                      </div>
                    </div>
                  </div>

                  <p className="mt-7 max-w-[760px] text-sm leading-7 text-black/48 sm:text-base sm:leading-8">
                    {domain.description}
                  </p>

                  {/* CAPABILITIES */}
                  <div className="mt-9">
                    <div className="flex items-center justify-between pb-3">
                      <span className="text-[8px] font-bold uppercase tracking-[0.21em] text-black/32">
                        Capability architecture
                      </span>

                      <Cable
                        size={15}
                        strokeWidth={1.5}
                        className="text-[#f56616]"
                      />
                    </div>

                    <div className="grid border-l border-t border-black/10 sm:grid-cols-2 xl:grid-cols-3">
                      {domain.capabilities.map((capability, index) => (
                        <motion.div
                          key={capability}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.025 }}
                          className="flex min-h-[68px] items-center gap-3 border-b border-r border-black/10 bg-white/20 px-4 py-3"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f56616]/30 text-[#f56616]">
                            <Check size={11} strokeWidth={2} />
                          </span>

                          <span className="text-[13px] font-semibold leading-5 text-black/65">
                            {capability}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* INTEGRATION PRINCIPLE */}
                  <div className="mt-auto pt-6">
                    <div className="grid gap-4 border border-black/[0.08] border-l-2 border-l-[#f56616] bg-white/75 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f56616]/10 text-[#f56616]">
                        <Cpu size={18} strokeWidth={1.5} />
                      </div>

                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-[0.21em] text-black/32">
                          Integration principle
                        </span>

                        <p className="mt-2 text-[13px] font-medium leading-6 text-black/58">
                          {domain.integration}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT OEM ECOSYSTEM */}
            <aside className="border-t border-black/10 bg-[#faf9f7] lg:border-t-0">
              <div className="border-b border-black/10 px-5 py-5 lg:hidden">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">
                  Preferred OEM ecosystem
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-4 lg:p-5">
                {oems.map((oem, index) => (
                  <div
                    key={`${oem}-${index}`}
                    className="flex min-h-[74px] items-center justify-center border border-black/[0.09] bg-white px-3 text-center transition-colors hover:bg-[#f7f6f3]"
                  >
                    <span className="text-[13px] font-bold tracking-[-0.025em] text-black/68">
                      {oem}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mx-5 border-t border-black/10 py-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={19}
                    strokeWidth={1.4}
                    className="mt-0.5 shrink-0 text-black/35"
                  />

                  <p className="text-[11px] leading-5 text-black/45">
                    Products are procured through authorized distribution
                    channels of leading OEMs with documented sourcing and
                    manufacturer-backed support.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* BOTTOM ACCOUNTABILITY BAR */}
          <div className="flex min-h-[62px] flex-col gap-4 border-t border-black/10 bg-[#faf9f7] px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-7">
            <div className="flex items-center gap-4">
              <ShieldCheck
                size={18}
                strokeWidth={1.45}
                className="shrink-0 text-[#f56616]"
              />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[8px] font-bold uppercase tracking-[0.19em] text-black/40">
                <span>Security</span>
                <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                <span>Communication</span>
                <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                <span>AV</span>
                <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                <span>Network</span>
                <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                <span>Automation</span>
                <span className="h-1 w-1 rounded-full bg-[#f56616]" />
                <span>Safety</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black/40">
                One integrated responsibility
              </span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.6}
                className="text-[#f56616]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
