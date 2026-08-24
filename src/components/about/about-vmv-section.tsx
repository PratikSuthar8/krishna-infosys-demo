"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Target, Gem } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "vision",
    index: "01",
    label: "Vision",
    eyebrow: "Where we are headed",
    title: "India's most trusted ELV systems integrator.",
    body: "Transforming every building into a secure, intelligent, and connected environment — measured by accountability, not by product catalogues.",
    icon: Eye,
    accent: "Trust before devices",
  },
  {
    id: "mission",
    index: "02",
    label: "Mission",
    eyebrow: "How we work",
    title: "Design-led integration with lifecycle ownership.",
    body: "We engineer, supply, install and support multi-OEM ELV programmes so security, communication, AV, networking and safety perform as one system — not a pile of devices.",
    icon: Target,
    accent: "One system, one owner",
  },
  {
    id: "values",
    index: "03",
    label: "Values",
    eyebrow: "What we stand on",
    title: "Accountability over catalogues.",
    body: "Genuine OEM sourcing, traceable delivery, transparent engineering and support that continues after handover. Trust is built on execution, not slides.",
    icon: Gem,
    accent: "Execution over claims",
  },
];

const LAST = steps.length - 1;

export function AboutVmvSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=72",
        end: () => `+=${window.innerHeight * steps.length * 0.9}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (v) => Math.round(v * LAST) / LAST,
          duration: { min: 0.1, max: 0.25 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const idx = Math.min(LAST, Math.max(0, Math.round(self.progress * LAST)));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleY: self.progress });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    gsap.fromTo(
      stage,
      { autoAlpha: 0.4, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }
    );
  }, [active]);

  const s = steps[active];
  const Icon = s.icon;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]"
      aria-label="Vision, mission and values"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 70% 50%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex h-[calc(100vh-72px)] max-w-[1500px] items-center px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16 xl:gap-24">
          {/* LEFT — same active index as card */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f56616]">
                Principles
              </p>
            </div>

            <h2 className="mt-4 max-w-[12ch] text-[clamp(1.85rem,3.2vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.045em]">
              Vision, mission &amp; values
            </h2>

            <p className="mt-3 max-w-[28ch] text-sm leading-6 text-black/45">
              Three commitments that shape how we design, deliver and support every ELV
              programme.
            </p>

            <ol className="relative mt-10">
              <div className="absolute bottom-4 left-[15px] top-4 w-px bg-black/[0.08]" />
              <div
                ref={progressRef}
                className="absolute bottom-4 left-[15px] top-4 w-px origin-top scale-y-0 bg-[#f56616]"
              />

              {steps.map((step, i) => {
                const on = i === active;
                return (
                  <li key={step.id}>
                    <div
                      className={`relative flex gap-4 py-3.5 transition-opacity duration-300 ${
                        on ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <span
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold tracking-wide transition-all duration-300 ${
                          on
                            ? "border-[#f56616] bg-[#f56616] text-white"
                            : "border-black/10 bg-[#f3f1ec] text-black/35"
                        }`}
                      >
                        {step.index}
                      </span>
                      <div className="pt-1">
                        <p className="text-[13px] font-semibold tracking-[-0.02em]">
                          {step.label}
                        </p>
                        <p className="mt-0.5 text-[11px] text-black/35">{step.eyebrow}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-8 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-black/25 lg:block">
              Scroll to advance
            </p>
          </div>

          {/* RIGHT — single card, always matches active */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white/70 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
              <div ref={stageRef} className="flex min-h-[340px] flex-col p-7 sm:min-h-[380px] sm:p-10 lg:p-12">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f56616] text-white shadow-[0_12px_30px_-12px_rgba(245,102,22,0.8)]">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                        {s.index} · {s.label}
                      </p>
                      <p className="text-[12px] text-black/40">{s.eyebrow}</p>
                    </div>
                  </div>
                  <span className="hidden rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45 sm:inline-flex">
                    {s.accent}
                  </span>
                </div>

                <div className="relative mt-8 flex flex-1 flex-col justify-center">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-4 select-none text-[clamp(4.5rem,11vw,7.5rem)] font-medium leading-none tracking-[-0.08em] text-black/[0.04]"
                  >
                    {s.index}
                  </span>
                  <h3 className="relative max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.05em]">
                    {s.title}
                  </h3>
                  <p className="relative mt-5 max-w-[34rem] text-[15px] leading-7 text-black/55 sm:text-base sm:leading-8">
                    {s.body}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-black/[0.06] px-7 py-4 sm:px-10 lg:px-12">
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <span
                      key={steps[i].id}
                      className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                        i === active ? "bg-[#f56616]" : "bg-black/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
                  {s.index} / 03
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
