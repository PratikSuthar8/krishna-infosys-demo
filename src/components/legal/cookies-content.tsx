"use client";

import { contact } from "@/lib/contact";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const sections = [
    {
        id: "what",
        title: "1. What are cookies?",
        body: [
            "Cookies are small text files stored on your device when you visit a website. They help the site function, remember preferences, and—if you allow—understand how the site is used.",
            "Similar technologies (local storage, pixels, or tags) may be used for the same purposes. In this policy, “cookies” includes those technologies where relevant.",
        ],
    },
    {
        id: "who",
        title: "2. Who controls cookies on this site?",
        body: [
            "Krishna Infosys operates www.krishnainfosys.com. Contact details appear in our Privacy Policy and on the Contact page.",
        ],
    },
    {
        id: "types",
        title: "3. Types of cookies we use",
        body: [
            "Necessary cookies — required for core operation, security, and remembering your cookie choice. These cannot be switched off via our banner.",
            "Preference cookies — store choices such as consent status so we do not ask repeatedly in the same browser.",
            "Functionality cookies — support enhanced features and interface behaviour when enabled.",
            "Analytics cookies — help us understand aggregate traffic and improve the site, only if you enable them and we deploy an analytics tool.",
        ],
    },
    {
        id: "duration",
        title: "4. How long cookies last",
        body: [
            "Session cookies expire when you close the browser. Persistent cookies remain for a set period or until you delete them. Consent preferences stored in local storage remain until you clear site data or change preferences.",
        ],
    },
    {
        id: "manage",
        title: "5. Managing cookies",
        body: [
            "On first visit you can Accept all, Essential only, or Customise categories via the cookie banner. You can clear site data in your browser at any time, which resets consent and may show the banner again.",
            "Browser settings also allow blocking or deleting cookies. Blocking necessary cookies may affect site functionality.",
        ],
    },
    {
        id: "third",
        title: "6. Third parties",
        body: [
            "If we enable hosting, analytics, or similar providers, they may set cookies under their own policies when you have consented to the relevant category. We will update this page if additional tools are introduced.",
        ],
    },
    {
        id: "legal",
        title: "7. Legal basis & more information",
        body: [
            "Necessary cookies are used for legitimate operation of the Website. Non-essential cookies are used only with your consent, consistent with our Privacy Policy and applicable Indian law including the DPDP Act, 2023 where relevant.",
            "For personal data practices beyond cookies, see the Privacy Policy. For website terms of use, see Terms & Conditions.",
        ],
    },
    {
        id: "contact",
        title: "8. Contact",
        body: [
            "Questions about cookies: info@krishnainfosys.com · {contact.phone.display}",
            "Grievance Officer: Prakash Patel · ceo@krishnainfosys.com",
        ],
    },
];

export function CookiesContent() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".legal-reveal", {
                y: 28,
                opacity: 0,
                duration: 0.75,
                stagger: 0.05,
                ease: "power3.out",
            });
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
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
            />

            <div className="relative mx-auto max-w-[900px] px-5 pb-20 pt-14 sm:px-8 lg:pb-28">
                <div className="legal-reveal flex items-center gap-3">
                    <span className="h-px w-8 bg-[#f56616]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                        Legal
                    </span>
                </div>

                <h1 className="legal-reveal mt-6 text-[clamp(2.4rem,4.5vw,3.8rem)] font-medium leading-[0.95] tracking-[-0.05em]">
                    Cookie Policy
                </h1>

                <p className="legal-reveal mt-5 text-sm text-black/45">
                    Effective date: 1 August 2026
                </p>

                <p className="legal-reveal mt-6 text-base leading-7 text-black/55">
                    This policy explains how cookies and similar technologies are used on
                    the Krishna Infosys website.
                </p>

                <div className="mt-14 space-y-12">
                    {sections.map((section) => (
                        <article key={section.id} id={section.id} className="legal-reveal">
                            <h2 className="text-lg font-semibold tracking-[-0.02em]">
                                {section.title}
                            </h2>
                            <div className="mt-4 space-y-3">
                                {section.body.map((para) => (
                                    <p
                                        key={para.slice(0, 40)}
                                        className="text-[15px] leading-7 text-black/55"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="legal-reveal mt-16 flex flex-wrap gap-4 border-t border-black/10 pt-8">
                    <Link
                        href="/privacy"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 transition-colors hover:text-[#f56616]"
                    >
                        Privacy Policy
                        <ArrowUpRight size={14} />
                    </Link>
                    <Link
                        href="/terms"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 transition-colors hover:text-[#f56616]"
                    >
                        Terms & Conditions
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}