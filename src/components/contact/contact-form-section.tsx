"use client";

import { contact } from "@/lib/contact";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    Building2,
    Clock,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const interests = [
    "New project / ELV design",
    "Security & surveillance",
    "Communication systems",
    "Audio visual",
    "Networking",
    "Automation",
    "AMC & support",
    "General enquiry",
];

export function ContactFormSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".form-reveal", {
                y: 32,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Wire to API / Formspree / server action later
        setSubmitted(true);
    };

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f3f1ec] text-[#171717]"
        >
            <div className="relative mx-auto max-w-[1500px] px-5 pb-20 pt-4 sm:px-8 lg:px-12 lg:pb-28 xl:px-16">
                <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16">
                    {/* FORM */}
                    <div className="form-reveal border border-black/10 bg-[#171717] p-6 text-white sm:p-8 lg:p-10">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#f56616]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                                Enquiry form
                            </span>
                        </div>

                        <h2 className="mt-5 text-[clamp(1.6rem,2.5vw,2.2rem)] font-medium tracking-[-0.04em]">
                            Send a brief.
                        </h2>
                        <p className="mt-3 max-w-[420px] text-sm leading-6 text-white/45">
                            Site type, priority systems and timeline are enough. We’ll come
                            back with the right engineering next step.
                        </p>

                        {submitted ? (
                            <div className="mt-10 border border-[#f56616]/40 bg-[#f56616]/10 px-5 py-8">
                                <p className="text-lg font-semibold tracking-[-0.03em]">
                                    Message received.
                                </p>
                                <p className="mt-2 text-sm leading-6 text-white/55">
                                    Thank you — the team will review your enquiry and respond
                                    shortly. For urgent matters, call {contact.phone.display}.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={onSubmit} className="mt-8 space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                            Full name *
                                        </span>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            className="mt-2 w-full border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#f56616]"
                                            placeholder="Your name"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                            Organisation
                                        </span>
                                        <input
                                            name="organisation"
                                            type="text"
                                            className="mt-2 w-full border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#f56616]"
                                            placeholder="Company / site"
                                        />
                                    </label>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                            Email *
                                        </span>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            className="mt-2 w-full border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#f56616]"
                                            placeholder="you@company.com"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                            Phone *
                                        </span>
                                        <input
                                            required
                                            name="phone"
                                            type="tel"
                                            className="mt-2 w-full border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#f56616]"
                                            placeholder="+91"
                                        />
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                        Interest *
                                    </span>
                                    <select
                                        required
                                        name="interest"
                                        defaultValue=""
                                        className="mt-2 w-full border border-white/15 bg-[#171717] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#f56616]"
                                    >
                                        <option value="" disabled>
                                            Select a topic
                                        </option>
                                        {interests.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                        Project / message *
                                    </span>
                                    <textarea
                                        required
                                        name="message"
                                        rows={5}
                                        className="mt-2 w-full resize-y border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#f56616]"
                                        placeholder="Site type, location, systems needed, timeline…"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#f56616] px-7 py-3.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#171717]"
                                >
                                    <span>Submit enquiry</span>
                                    <ArrowUpRight
                                        size={15}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* DETAILS */}
                    <div className="form-reveal space-y-4">
                        <div className="border border-black/10 bg-white p-6 sm:p-7">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                Direct lines
                            </span>

                            <div className="mt-6 space-y-5">
                                <a
                                    href={contact.phone.href}
                                    className="flex items-start gap-3 text-sm transition-colors hover:text-[#f56616]"
                                >
                                    <Phone size={16} className="mt-0.5 text-[#f56616]" />
                                    <div>
                                        <div className="font-semibold">{contact.phone.display}</div>
                                        <div className="mt-0.5 text-[12px] text-black/40">
                                            Primary business line
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@krishnainfosys.com"
                                    className="flex items-start gap-3 text-sm transition-colors hover:text-[#f56616]"
                                >
                                    <Mail size={16} className="mt-0.5 text-[#f56616]" />
                                    <div>
                                        <div className="font-semibold">info@krishnainfosys.com</div>
                                        <div className="mt-0.5 text-[12px] text-black/40">
                                            Project & AMC enquiries
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="border border-black/10 bg-white p-6 sm:p-7">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                Headquarters
                            </span>
                            <div className="mt-5 flex items-start gap-3">
                                <Building2 size={16} className="mt-0.5 text-[#f56616]" />
                                <div>
                                    <div className="text-sm font-semibold">Krishna Infosys</div>
                                    <p className="mt-2 text-sm leading-6 text-black/50">
                                        Ahmedabad, Gujarat, India
                                    </p>
                                    <p className="mt-1 text-[12px] text-black/35">
                                        Design · Engineering · Delivery hub
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-black/10 bg-white p-6 sm:p-7">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                Presence
                            </span>
                            <div className="mt-5 flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 text-[#f56616]" />
                                <div>
                                    <div className="text-sm font-semibold">Pan-India delivery</div>
                                    <p className="mt-2 text-sm leading-6 text-black/50">
                                        Multi-city project execution with the same design and
                                        service standards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-black/10 bg-white p-6 sm:p-7">
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                                Response
                            </span>
                            <div className="mt-5 flex items-start gap-3">
                                <Clock size={16} className="mt-0.5 text-[#f56616]" />
                                <div>
                                    <div className="text-sm font-semibold">Business hours</div>
                                    <p className="mt-2 text-sm leading-6 text-black/50">
                                        Mon–Sat · We aim to respond to new enquiries within one
                                        business day.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}