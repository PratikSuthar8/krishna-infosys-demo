"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const sections = [
    {
        id: "intro",
        title: "1. Introduction",
        body: [
            "Krishna Infosys (“we”, “us”, “our”, or the “Company”) respects your privacy and is committed to protecting personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use related services.",
            "We comply with applicable Indian data protection law, including the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, and related rules. By using the Website, you agree to processing described in this policy.",
        ],
    },
    {
        id: "definitions",
        title: "2. Key definitions",
        body: [
            "“Company” means Krishna Infosys, registered office at A-61, Jogeshwari Society, Opp Wonder Point, CTM Cross Road, Amaraiwadi, Ahmedabad – 380026, Gujarat, India.",
            "“Website” means www.krishnainfosys.com and related online services operated by us.",
            "“Personal Data” means any information that relates to an identified or identifiable individual.",
            "“Usage Data” means data collected automatically from use of the Service or its infrastructure (for example IP address, browser type, pages visited).",
            "“You” means the individual or entity using the Service.",
        ],
    },
    {
        id: "collect",
        title: "3. Data we collect",
        body: [
            "Personal data you provide may include: email address, name, phone number, company name and designation, address or location, and any other information you submit via forms or email.",
            "Usage data may include: IP address, browser type and version, pages visited, date and time of visit, time spent on pages, device identifiers, and similar diagnostic data. Mobile access may additionally involve device type, OS, and mobile browser information.",
            "We do not knowingly collect personal data from anyone under 18 through the Website.",
        ],
    },
    {
        id: "cookies",
        title: "4. Cookies & tracking",
        body: [
            "We may use cookies and similar technologies (beacons, tags, scripts) to operate the Website and understand usage.",
            "Necessary cookies enable core features. Preference cookies remember choices such as notice acceptance. Functionality cookies support improved experience. You can control cookies via browser settings; disabling some cookies may affect Site features.",
        ],
    },
    {
        id: "use",
        title: "5. How we use personal data",
        body: [
            "We may use personal data to: provide and maintain the Service; manage registrations or accounts if offered; perform or prepare contracts; contact you by email, phone, or equivalent channels; respond to requests; send service-related or, where permitted, promotional information; support business transfers (e.g. merger or asset sale); analyse usage and improve the Service; and meet legal obligations.",
        ],
    },
    {
        id: "sharing",
        title: "6. Sharing of information",
        body: [
            "We may share personal information with service providers who process data on our behalf (hosting, email, analytics); in connection with mergers, asset sales, or financing; with affiliates under common control; with business partners only where relevant and appropriate; or with your consent for other purposes.",
            "We do not sell personal information. We may disclose data when required by law, to protect rights and safety, investigate wrongdoing, or defend legal claims.",
        ],
    },
    {
        id: "retention",
        title: "7. Retention",
        body: [
            "We retain personal data only as long as necessary for the purposes in this policy, including legal, accounting, and dispute-resolution requirements. Usage data is generally retained for shorter periods unless needed for security, service improvement, or legal obligation.",
        ],
    },
    {
        id: "transfer",
        title: "8. Transfer of data",
        body: [
            "Information may be processed at our offices and other locations where parties involved in processing operate. By submitting information, you agree to such transfers. We take reasonable steps so that data is treated securely and in accordance with this policy, with appropriate controls where required.",
        ],
    },
    {
        id: "rights",
        title: "9. Your rights",
        body: [
            "Subject to applicable law (including the DPDP Act), you may request access to, correction of, or deletion of personal data we hold; object to or restrict certain processing; request data portability where applicable; and withdraw consent where processing is based on consent.",
            "To exercise these rights, contact info@krishnainfosys.com or the Grievance Officer below. We may need to verify your identity before acting on a request.",
        ],
    },
    {
        id: "security",
        title: "10. Security",
        body: [
            "We use reasonable administrative, technical, and physical measures to protect personal data against unauthorised access, use, loss, or destruction. Data may be stored on secured infrastructure managed by us or processors acting on our behalf.",
            "No method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security.",
        ],
    },
    {
        id: "links",
        title: "11. Third-party links",
        body: [
            "The Website may link to sites we do not operate. We are not responsible for their content, privacy practices, or security. Review the privacy policy of every third-party site you visit.",
        ],
    },
    {
        id: "changes",
        title: "12. Changes to this policy",
        body: [
            "We may update this Privacy Policy from time to time. Changes are posted on this page with an updated effective date. Material changes may be communicated by email or a prominent notice where appropriate. Continued use after changes constitutes acceptance of the revised policy.",
        ],
    },
    {
        id: "law",
        title: "13. Governing law",
        body: [
            "This Privacy Policy is governed by the laws of India. Disputes arising from this policy are subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat, India.",
        ],
    },
    {
        id: "grievance",
        title: "14. Grievance redressal",
        body: [
            "Grievances relating to processing of information may be addressed in writing to:",
            "Grievance Officer: Prakash Patel (CEO)",
            "Email: ceo@krishnainfosys.com (also info@krishnainfosys.com)",
            "Phone: +91 79 4030 4848",
            "Postal: 15 & 16, 1st Floor, Swastik House, Near Stadium Circle, Opp. Muktjivan Colour Lab, Near Income Tax Underpass, Navrangpura, Ahmedabad – 380009, Gujarat, India",
            "We aim to acknowledge grievances promptly and redress them as expeditiously as practicable.",
        ],
    },
    {
        id: "contact",
        title: "15. Contact",
        body: [
            "Questions about this Privacy Policy:",
            "Email: info@krishnainfosys.com · Phone: +91 79 4030 4848",
            "Website: www.krishnainfosys.com",
            "Operational office: 15 & 16, 1st Floor, Swastik House, Navrangpura, Ahmedabad – 380009",
            "Registered office: A-61, Jogeshwari Society, CTM Cross Road, Amaraiwadi, Ahmedabad – 380026",
        ],
    },
];

export function PrivacyContent() {
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
                    Privacy Policy
                </h1>

                <p className="legal-reveal mt-5 text-sm text-black/45">
                    Effective date: 1 August 2026 · Version 2.0
                </p>

                <p className="legal-reveal mt-6 text-base leading-7 text-black/55">
                    How Krishna Infosys collects, uses, and protects personal data under
                    the DPDP Act, 2023 and the Information Technology Act, 2000.
                </p>

                <div className="mt-14 space-y-12">
                    {sections.map((section) => (
                        <article key={section.id} id={section.id} className="legal-reveal">
                            <h2 className="text-lg font-semibold tracking-[-0.02em]">
                                {section.title}
                            </h2>
                            <div className="mt-4 space-y-3">
                                {section.body.map((para) => (
                                    <p key={para.slice(0, 48)} className="text-[15px] leading-7 text-black/55">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="legal-reveal mt-16 border-t border-black/10 pt-8 text-sm text-black/45">
                    <p className="font-semibold text-black/70">Krishna Infosys</p>
                    <p className="mt-2">
                        GSTIN: 24BNGPP7256R1Z5 · UDYAM-GJ-01-0323748 · ISO 9001:2015
                    </p>
                    <p className="mt-1">Phone: +91 79 4030 4848 · info@krishnainfosys.com</p>
                </div>

                <div className="legal-reveal mt-10 flex flex-wrap items-center gap-4">
                    <Link
                        href="/terms"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 transition-colors hover:text-[#f56616]"
                    >
                        Terms & Conditions
                        <ArrowUpRight size={14} />
                    </Link>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 transition-colors hover:text-[#f56616]"
                    >
                        Contact us
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}