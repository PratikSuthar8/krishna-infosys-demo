"use client";

import { contact } from "@/lib/contact";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".con-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 })
                .from(
                    ".con-hero-line",
                    { y: 56, opacity: 0, stagger: 0.08, duration: 0.9 },
                    "-=0.25"
                )
                .from(".con-hero-copy", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(
                    ".con-hero-chip",
                    { y: 14, opacity: 0, stagger: 0.06, duration: 0.5 },
                    "-=0.25"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f3f1ec] pt-[88px] text-[#171717]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.26]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.04) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, black 55%, transparent 100%)",
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 pb-14 pt-16 sm:px-8 lg:px-12 lg:pb-20 lg:pt-20 xl:px-16">
                <div className="max-w-[860px]">
                    <div className="con-hero-eyebrow flex items-center gap-3">
                        <span className="h-px w-8 bg-[#f56616]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                            Contact
                        </span>
                    </div>

                    <h1 className="mt-7">
                        <span className="con-hero-line block overflow-hidden">
                            <span className="block text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                                Tell us about
                            </span>
                        </span>
                        <span className="con-hero-line block overflow-hidden">
                            <span className="block text-[clamp(2.6rem,5.6vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-black/30">
                                the environment.
                            </span>
                        </span>
                    </h1>

                    <p className="con-hero-copy mt-8 max-w-[520px] text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
                        Project scope, AMC coverage or a site walkthrough — share the
                        essentials and the engineering team will respond with a clear next
                        step.
                    </p>
                </div>

                <div className="mt-12 flex flex-wrap gap-3">
                    <a
                        href={contact.phone.href}
                        className="con-hero-chip inline-flex items-center gap-2.5 border border-black/[0.08] bg-white/85 px-4 py-3 text-[13px] font-semibold text-black/70 transition-colors hover:border-[#f56616]/40"
                    >
                        <Phone size={15} className="text-[#f56616]" />
                        {contact.phone.display}
                    </a>
                    <a
                        href="mailto:info@krishnainfosys.com"
                        className="con-hero-chip inline-flex items-center gap-2.5 border border-black/[0.08] bg-white/85 px-4 py-3 text-[13px] font-semibold text-black/70 transition-colors hover:border-[#f56616]/40"
                    >
                        <Mail size={15} className="text-[#f56616]" />
                        info@krishnainfosys.com
                    </a>
                    <div className="con-hero-chip inline-flex items-center gap-2.5 border border-black/[0.08] bg-white/85 px-4 py-3 text-[13px] font-semibold text-black/70">
                        <MapPin size={15} className="text-[#f56616]" />
                        Ahmedabad · Pan-India
                    </div>
                </div>
            </div>
        </section>
    );
}