"use client";

import { useEffect, useRef } from "react";
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

export function AboutVmvSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".vmv-panel");
      const marks = gsap.utils.toArray<HTMLElement>(".vmv-mark");
      const pills = gsap.utils.toArray<HTMLElement>(".vmv-pill");
      const progress = section.querySelector<HTMLElement>(".vmv-progress-fill");
      const indexEl = indexRef.current;

      if (panels.length < 2) return;

      // Hard reset: only first panel visible
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 32,
          zIndex: i === 0 ? 3 : 1,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      const setActive = (active: number) => {
        marks.forEach((m, i) => {
          m.dataset.active = i === active ? "true" : "false";
        });
        pills.forEach((p, i) => {
          p.dataset.active = i === active ? "true" : "false";
        });
        if (indexEl) {
          indexEl.textContent = `${String(active + 1).padStart(2, "0")} / 03`;
        }
      };
      setActive(0);

      const distance = () => window.innerHeight * (panels.length * 0.85);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progress) {
        tl.fromTo(
          progress,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: panels.length - 1 },
          0
        );
      }

      // One clean handoff per step — no overlapping visible panels
      for (let i = 1; i < panels.length; i++) {
        const prev = panels[i - 1];
        const next = panels[i];
        const at = i - 1;

        tl.to(
          prev,
          {
            autoAlpha: 0,
            y: -24,
            zIndex: 1,
            pointerEvents: "none",
            duration: 0.45,
          },
          at
        );
        tl.fromTo(
          next,
          { autoAlpha: 0, y: 32, zIndex: 3, pointerEvents: "none" },
          {
            autoAlpha: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.45,
          },
          at + 0.08
        );
        tl.call(() => setActive(i), undefined, at + 0.2);
      }
    }, section);

    return () => ctx.revert();
  }, []);

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

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center px-5 py-24 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16 xl:gap-24">
          {/* LEFT */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f56616]">
                Principles
              </p>
            </div>

            <h2 className="mt-5 max-w-[12ch] text-[clamp(2rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.045em]">
              Vision, mission &amp; values
            </h2>

            <p className="mt-4 max-w-[28ch] text-sm leading-6 text-black/45">
              Three commitments that shape how we design, deliver and support every ELV
              programme.
            </p>

            <ol className="relative mt-12">
              <div className="absolute bottom-4 left-[15px] top-4 w-px bg-black/[0.08]" />
              <div className="vmv-progress-fill absolute bottom-4 left-[15px] top-4 w-px origin-top bg-[#f56616]" />

              {steps.map((s, i) => (
                <li key={s.id}>
                  <div
                    className="vmv-mark group relative flex gap-4 py-4 transition-opacity duration-300 data-[active=false]:opacity-40"
                    data-active={i === 0 ? "true" : "false"}
                  >
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#f3f1ec] text-[10px] font-bold tracking-wide text-black/35 transition-all duration-300 group-data-[active=true]:border-[#f56616] group-data-[active=true]:bg-[#f56616] group-data-[active=true]:text-white">
                      {s.index}
                    </span>
                    <div className="pt-1">
                      <p className="text-[13px] font-semibold tracking-[-0.02em]">
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-black/35">{s.eyebrow}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-black/25 lg:block">
              Scroll to advance
            </p>
          </div>

          {/* RIGHT — single chrome, content-only panels */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white/70 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
              <div className="relative min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <article
                      key={s.id}
                      className="vmv-panel absolute inset-0 flex flex-col p-7 sm:p-10 lg:p-12"
                    >
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

                      <div className="relative mt-10 flex flex-1 flex-col justify-center">
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -right-1 -top-6 select-none text-[clamp(5rem,12vw,8rem)] font-medium leading-none tracking-[-0.08em] text-black/[0.04]"
                        >
                          {s.index}
                        </span>
                        <h3 className="relative max-w-[16ch] text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.05em]">
                          {s.title}
                        </h3>
                        <p className="relative mt-5 max-w-[34rem] text-[15px] leading-8 text-black/55 sm:text-base">
                          {s.body}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Shared footer — never stacks */}
              <div className="relative z-10 flex items-center justify-between border-t border-black/[0.06] px-7 py-4 sm:px-10 lg:px-12">
                <div className="flex gap-1.5">
                  {steps.map((s, i) => (
                    <span
                      key={s.id}
                      className="vmv-pill h-1 w-6 rounded-full bg-black/10 transition-colors duration-300 data-[active=true]:bg-[#f56616]"
                      data-active={i === 0 ? "true" : "false"}
                    />
                  ))}
                </div>
                <span
                  ref={indexRef}
                  className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30"
                >
                  01 / 03
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
