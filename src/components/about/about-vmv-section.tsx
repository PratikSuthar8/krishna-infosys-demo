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
    points: ["Pan-India delivery", "Multi-OEM engineering", "Lifecycle accountability"],
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
    points: ["Design before devices", "Commissioned as one stack", "AMC that continues"],
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
    points: ["Traceable sourcing", "Transparent engineering", "Support after handover"],
  },
];

const LAST = steps.length - 1;

export function AboutVmvSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /* Desktop: pinned step-through. Same breakpoint + reduced-motion rule as the home page. */
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

          if (!conditions.desktop || conditions.reduceMotion) return;

          const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top top+=72",
            end: () =>
              `+=${Math.round(window.innerHeight * steps.length * 0.85)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (v) => Math.round(v * LAST) / LAST,
              duration: { min: 0.08, max: 0.22 },
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              const idx = Math.min(
                LAST,
                Math.max(0, Math.round(self.progress * LAST)),
              );
              if (idx !== activeRef.current) {
                activeRef.current = idx;
                setActive(idx);
              }
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleY: Math.max(0.04, self.progress),
                });
              }
            },
          });

          triggerRef.current = trigger;

          return () => {
            trigger.kill();
            triggerRef.current = null;
          };
        },
      );
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  /* Step-change micro-animation (desktop panel), like the home page stages. */
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      panel,
      { y: 18, opacity: 0.35 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  /* Step buttons: with the pin active, scroll to that step; otherwise just select it. */
  const goTo = (i: number) => {
    const trigger = triggerRef.current;
    if (trigger) {
      const y = trigger.start + (trigger.end - trigger.start) * (i / LAST);
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    activeRef.current = i;
    setActive(i);
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleY: Math.max(0.04, i / LAST) });
    }
  };

  const step = steps[active];
  const Icon = step.icon;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#f3f1ec] text-[#171717]"
    >
      {/* DESKTOP — pinned step-through */}
      <div className="mx-auto hidden min-h-[calc(100svh-72px)] max-w-[1500px] flex-col justify-center px-12 py-14 lg:flex xl:px-16">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-20">
          {/* LEFT — editorial + steps */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
                Principles
              </span>
            </div>

            <h2 className="mt-5 max-w-[14ch] text-[clamp(2rem,4.2vw,3.35rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Vision, mission &amp; values
            </h2>

            <p className="mt-4 max-w-[36ch] text-[15px] leading-7 text-black/45">
              Three commitments that shape how we design, deliver and support
              every ELV programme.
            </p>

            <div className="mt-10 flex gap-6">
              {/* progress rail */}
              <div className="relative hidden w-[2px] shrink-0 self-stretch overflow-hidden rounded-full bg-black/[0.08] sm:block">
                <div
                  ref={progressRef}
                  className="absolute inset-x-0 top-0 origin-top bg-[#f56616]"
                  style={{ height: "100%", transform: "scaleY(0.04)" }}
                />
              </div>

              <ol className="flex flex-1 flex-col gap-1">
                {steps.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        className={`group flex w-full items-start gap-4 rounded-2xl px-3 py-3.5 text-left transition-colors duration-300 ${
                          on ? "bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]" : "hover:bg-black/[0.03]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wide transition-colors ${
                            on
                              ? "bg-[#f56616] text-white"
                              : "border border-black/10 bg-transparent text-black/30"
                          }`}
                        >
                          {s.index}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block text-[15px] font-semibold tracking-[-0.02em] transition-colors ${
                              on ? "text-[#171717]" : "text-black/40"
                            }`}
                          >
                            {s.label}
                          </span>
                          <span
                            className={`mt-0.5 block text-[12px] transition-colors ${
                              on ? "text-black/45" : "text-black/25"
                            }`}
                          >
                            {s.eyebrow}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/25">
              Scroll to advance
            </p>
          </div>

          {/* RIGHT — stage panel */}
          <div className="relative flex min-h-[420px] items-center lg:min-h-[520px]">
            <div
              ref={panelRef}
              key={step.id}
              className="vmv-panel relative w-full overflow-hidden rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.07)] sm:p-9 lg:p-11"
            >
              {/* watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 bottom-[-0.15em] select-none text-[clamp(7rem,18vw,11rem)] font-semibold leading-none tracking-[-0.06em] text-black/[0.04]"
              >
                {step.index}
              </span>

              <div className="relative z-[1]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f56616] text-white shadow-[0_10px_28px_rgba(245,102,22,0.35)]">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                        {step.index} · {step.label}
                      </p>
                      <p className="mt-0.5 text-[12px] text-black/40">
                        {step.eyebrow}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-black/[0.08] bg-[#f3f1ec] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-black/45">
                    {step.accent}
                  </span>
                </div>

                <h3 className="mt-8 max-w-[16ch] text-[clamp(1.65rem,3.2vw,2.55rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-[#171717]">
                  {step.title}
                </h3>

                <p className="mt-5 max-w-[42ch] text-[15px] leading-7 text-black/50 sm:text-[16px] sm:leading-8">
                  {step.body}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {step.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-black/[0.08] bg-[#faf9f7] px-3.5 py-2 text-[11px] font-semibold tracking-[-0.01em] text-black/55"
                    >
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex items-center justify-between border-t border-black/[0.06] pt-5">
                  <div className="flex items-center gap-1.5">
                    {steps.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === active
                            ? "w-7 bg-[#f56616]"
                            : "w-3 bg-black/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold tabular-nums tracking-[0.12em] text-black/30">
                    {step.index} / 03
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET — plain stacked cards: no pin, no scroll animation */}
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-20 lg:hidden">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#f56616]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f56616]">
              Principles
            </span>
          </div>

          <h2 className="mt-5 max-w-[14ch] text-[clamp(2rem,7vw,3.35rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Vision, mission &amp; values
          </h2>

          <p className="mt-4 max-w-[44ch] text-[15px] leading-7 text-black/50">
            Three commitments that shape how we design, deliver and support
            every ELV programme.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5">
          {steps.map((s) => {
            const SIcon = s.icon;
            return (
              <article
                key={s.id}
                className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_18px_56px_rgba(0,0,0,0.06)] sm:rounded-[28px] sm:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 bottom-[-0.15em] select-none text-[clamp(6rem,30vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-black/[0.04]"
                >
                  {s.index}
                </span>

                <div className="relative z-[1]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f56616] text-white shadow-[0_10px_28px_rgba(245,102,22,0.35)]">
                      <SIcon size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
                        {s.index} · {s.label}
                      </p>
                      <p className="mt-0.5 text-[12px] text-black/45">
                        {s.eyebrow}
                      </p>
                    </div>
                  </div>

                  <span className="mt-5 inline-block rounded-full border border-black/[0.08] bg-[#f3f1ec] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-black/50">
                    {s.accent}
                  </span>

                  <h3 className="mt-5 max-w-[20ch] text-[clamp(1.5rem,6vw,2.2rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-[#171717]">
                    {s.title}
                  </h3>

                  <p className="mt-4 max-w-[52ch] text-[15px] leading-7 text-black/55">
                    {s.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-black/[0.08] bg-[#faf9f7] px-3.5 py-2 text-[12px] font-semibold tracking-[-0.01em] text-black/55"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
