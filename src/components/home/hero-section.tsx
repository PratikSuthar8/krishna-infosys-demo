"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowUpRight,
  Camera,
  Flame,
  Fingerprint,
  Network,
  Radio,
  Volume2,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const systems = [
  {
    label: "Surveillance",
    short: "CCTV",
    icon: Camera,
    position: "left-[4%] top-[13%]",
    delay: 0,
  },
  {
    label: "Fire & Safety",
    short: "FAS",
    icon: Flame,
    position: "right-[2%] top-[17%]",
    delay: 0.4,
  },
  {
    label: "Access Control",
    short: "ACS",
    icon: Fingerprint,
    position: "left-[0%] bottom-[23%]",
    delay: 0.8,
  },
  {
    label: "Networking",
    short: "LAN",
    icon: Network,
    position: "right-[0%] bottom-[25%]",
    delay: 1.2,
  },
  {
    label: "Communication",
    short: "COM",
    icon: Radio,
    position: "left-[37%] bottom-[2%]",
    delay: 1.6,
  },
];

const stats = [
  { value: "24+", label: "Years of experience" },
  { value: "825+", label: "Clients served" },
  { value: "2,100+", label: "Projects delivered" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-eyebrow", {
          y: 20,
          opacity: 0,
          duration: 0.65,
        })
        .from(
          ".hero-line",
          {
            y: 80,
            opacity: 0,
            rotateX: -12,
            stagger: 0.1,
            duration: 1,
          },
          "-=0.35"
        )
        .from(
          ".hero-copy",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.55"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.45"
        )
        .from(
          ".hero-stat",
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".system-visual",
          {
            scale: 0.88,
            opacity: 0,
            duration: 1.2,
          },
          "-=1.1"
        )
        .from(
          ".system-node",
          {
            scale: 0.7,
            opacity: 0,
            stagger: 0.09,
            duration: 0.55,
          },
          "-=0.75"
        );

      gsap.to(".orbit-one", {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".orbit-two", {
        rotate: -360,
        duration: 46,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".pulse-ring", {
        scale: 1.16,
        opacity: 0,
        duration: 2.8,
        repeat: -1,
        ease: "power1.out",
        transformOrigin: "50% 50%",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current || window.innerWidth < 1024) return;

    const rect = visualRef.current.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(".visual-inner", {
      x: x * 10,
      y: y * 10,
      rotateY: x * 2,
      rotateX: y * -2,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".visual-inner", {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[88svh] overflow-hidden bg-[#fbfbfa]"
    >
      {/* Background technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,20,20,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,20,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 88%)",
        }}
      />

      {/* Orange ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[5%] h-[38rem] w-[38rem] rounded-full bg-[#f56616]/[0.055] blur-[90px]"
      />

      <div className="relative mx-auto grid min-h-[88svh] w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:px-12 lg:pb-20 lg:pt-24 xl:px-16 xl:pt-28">
        {/* LEFT */}
        <div className="relative z-10 max-w-[830px]">
          <div className="hero-eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#f56616]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f56616] sm:text-xs">
              Design · Consult · Execute
            </span>
          </div>

          <h1 className="max-w-[820px] text-[clamp(3.3rem,5.9vw,6.6rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[#171717]">
            <span className="hero-line block">
              Infrastructure
            </span>

            <span className="hero-line block">
              that thinks
            </span>

            <span className="hero-line block text-[#f56616]">
              ahead.
            </span>
          </h1>

          <p className="hero-copy mt-8 max-w-[660px] text-base leading-7 text-[#626262] sm:text-lg sm:leading-8">
            Integrated ELV solutions engineered around your environment —
            bringing security, communication, automation and connectivity
            together as one intelligent ecosystem.
          </p>

          <div className="hero-actions mt-8 flex flex-wrap items-center gap-3">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center justify-center gap-4 rounded-full border border-[#171717] !bg-[#171717] px-7 !text-sm !font-semibold !text-white transition-all duration-300 hover:!border-[#f56616] hover:!bg-[#f56616] hover:!text-white"
              >
                Discuss your project

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/solutions"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-black/10 !bg-white/70 px-7 !text-sm !font-semibold !text-[#171717] backdrop-blur transition-all duration-300 hover:!border-[#f56616]/30 hover:!bg-[#f56616]/[0.06] hover:!text-[#f56616]"
              >
                Explore solutions
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 grid max-w-[680px] grid-cols-3 border-t border-black/[0.08] pt-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`hero-stat ${
                  index !== 0
                    ? "border-l border-black/[0.08] pl-4 sm:pl-7"
                    : ""
                }`}
              >
                <div className="text-2xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-3xl">
                  {stat.value}
                </div>

                <div className="mt-1 max-w-[110px] text-[10px] font-medium leading-4 text-[#7a7a7a] sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="system-visual relative mx-auto hidden aspect-square w-full max-w-[520px] xl:max-w-[560px] lg:block"
          style={{ perspective: "1200px" }}
        >
          <div className="visual-inner absolute inset-[8%]">
            {/* Outer technical circles */}
            <div className="absolute inset-[8%] rounded-full border border-dashed border-black/[0.12]" />

            <div className="orbit-one absolute inset-[17%] rounded-full border border-black/[0.08]">
              <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#f56616]" />
            </div>

            <div className="orbit-two absolute inset-[27%] rounded-full border border-dashed border-[#f56616]/25">
              <span className="absolute bottom-[12%] right-[5%] h-2 w-2 rounded-full bg-[#171717]" />
            </div>

            {/* Cross hairs */}
            <div className="absolute left-1/2 top-[7%] h-[86%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-black/[0.07] to-transparent" />

            <div className="absolute left-[7%] top-1/2 h-px w-[86%] -translate-y-1/2 bg-gradient-to-r from-transparent via-black/[0.07] to-transparent" />

            {/* Central system */}
            <div className="absolute left-1/2 top-1/2 flex h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="pulse-ring absolute inset-[-14px] rounded-full border border-[#f56616]/20" />

              <div className="absolute inset-4 rounded-full border border-dashed border-black/[0.08]" />

              <div className="relative flex h-[94px] w-[94px] flex-col items-center justify-center rounded-full bg-[#171717] text-white shadow-xl">
                <Cpu
                  size={27}
                  strokeWidth={1.6}
                  className="text-[#f56616]"
                />

                <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Integrated
                </span>

                <span className="text-sm font-semibold">
                  ELV Core
                </span>
              </div>
            </div>

            {/* Connection lines */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
            >
              <path
                d="M300 300 C220 245 165 175 100 125"
                stroke="rgba(245,102,22,.28)"
                strokeWidth="1.2"
                strokeDasharray="5 7"
              />

              <path
                d="M300 300 C380 245 435 175 505 135"
                stroke="rgba(23,23,23,.16)"
                strokeWidth="1.2"
                strokeDasharray="5 7"
              />

              <path
                d="M300 300 C215 350 155 415 95 465"
                stroke="rgba(23,23,23,.16)"
                strokeWidth="1.2"
                strokeDasharray="5 7"
              />

              <path
                d="M300 300 C385 350 445 415 510 460"
                stroke="rgba(245,102,22,.28)"
                strokeWidth="1.2"
                strokeDasharray="5 7"
              />

              <path
                d="M300 300 C300 390 300 460 300 535"
                stroke="rgba(23,23,23,.16)"
                strokeWidth="1.2"
                strokeDasharray="5 7"
              />
            </svg>

            {/* Nodes */}
            {systems.map((system) => {
              const Icon = system.icon;

              return (
                <div
                  key={system.label}
                  className={`system-node absolute ${system.position}`}
                >
                  <div className="group flex min-w-[120px] items-center gap-2.5 rounded-2xl border border-black/[0.08] bg-white/90 p-3 shadow-[0_14px_40px_rgba(0,0,0,0.055)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f56616]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f56616]/10 text-[#f56616] transition-colors duration-300 group-hover:bg-[#f56616] group-hover:text-white">
                      <Icon size={19} strokeWidth={1.7} />
                    </div>

                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#9a9a9a]">
                        {system.short}
                      </div>

                      <div className="mt-0.5 whitespace-nowrap text-xs font-semibold text-[#171717]">
                        {system.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Floating micro elements */}
            <div className="absolute right-[12%] top-[47%] flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-2 shadow-sm">
              <ShieldCheck
                size={13}
                className="text-[#f56616]"
              />
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#555]">
                Secure
              </span>
            </div>

            <div className="absolute bottom-[10%] left-[14%] flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-sm">
              <Volume2
                size={15}
                strokeWidth={1.6}
                className="text-[#171717]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom detail */}
      <div className="pointer-events-none absolute bottom-0 left-0 hidden w-full items-center justify-between border-t border-black/[0.06] px-12 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#999] xl:flex">
        <span>Integrated ELV Solutions</span>

        <span>
          Security · Communication · Automation · Connectivity
        </span>
      </div>
    </section>
  );
}
