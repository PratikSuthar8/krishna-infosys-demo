"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const sections = [
    {
        id: "acceptance",
        title: "1. Acceptance of terms",
        body: [
            "By accessing, browsing, or using www.krishnainfosys.com and any associated sub-domains or services (the “Website”), you agree to be legally bound by these Terms & Conditions (“Terms”). If you do not agree, discontinue use of the Website immediately.",
            "These Terms form a binding agreement between you (“User”, “You”) and Krishna Infosys (“Company”, “We”, “Us”). By using the Website, you represent that you are at least 18 years of age and competent to contract under the Indian Contract Act, 1872.",
            "These Terms govern website use and general enquiries. Specific projects, supply, installation, and AMC engagements are governed by separate written proposals, work orders, or contracts.",
        ],
    },
    {
        id: "modifications",
        title: "2. Modifications",
        body: [
            "Krishna Infosys may update these Terms at any time. Changes take effect when posted on this page with a revised “Last updated” date. Continued use of the Website after changes constitutes acceptance of the revised Terms.",
        ],
    },
    {
        id: "conduct",
        title: "3. Acceptable use",
        body: [
            "You agree to use the Website only for lawful purposes and in a manner that does not:",
            "• Compromise the security or integrity of the Website or related systems",
            "• Infringe intellectual property rights of Krishna Infosys or third parties",
            "• Disrupt availability or functionality of the Website",
            "• Transmit defamatory, obscene, offensive, harassing, or unlawful material",
            "• Impersonate any person or entity, or misrepresent your affiliation",
            "• Overburden, damage, or interfere with any other party’s use of the Website",
        ],
    },
    {
        id: "accounts",
        title: "4. Accounts & security",
        body: [
            "If any section of the Website requires registration, you are responsible for maintaining the confidentiality of your credentials, all activity under your account, and promptly notifying us of unauthorised use or security breaches.",
            "We may suspend or terminate accounts for conduct that violates these Terms or is harmful to the Company or other users, with or without notice.",
        ],
    },
    {
        id: "ip",
        title: "5. Intellectual property",
        body: [
            "All content on the Website—including text, graphics, logos, images, data, software, documentation, and layout—is the exclusive property of Krishna Infosys or its licensors and is protected by Indian and international IP laws.",
            "Names, logos, and branding identifying Krishna Infosys are our proprietary marks. Third-party names and trademarks appear as the property of their respective owners.",
            "You may not copy, modify, distribute, display, publish, or create derivative works from any content without prior written permission, or remove proprietary notices, or use content for commercial purposes without explicit consent.",
        ],
    },
    {
        id: "privacy",
        title: "6. Data protection & privacy",
        body: [
            "Personal data collected through the Website is governed by our Privacy Policy, which forms an integral part of these Terms.",
            "We are committed to complying with applicable data protection laws, including the Information Technology Act, 2000, the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDP Act), as applicable.",
            "We implement reasonable security practices to protect personal information from unauthorised access, damage, use, modification, or disclosure. Data is retained only as long as necessary for the purposes collected or as required by law.",
            "Data principal rights under the DPDP Act (including access, correction, and deletion) may be exercised via the Grievance Officer listed in Section 15.",
        ],
    },
    {
        id: "security",
        title: "7. Security & unauthorised access",
        body: [
            "You must not introduce viruses or harmful material; attempt unauthorised access to the Website, servers, or databases; conduct denial-of-service attacks; probe or breach security measures; or access data or accounts you are not authorised to access.",
            "Suspected security incidents or vulnerabilities must be reported to Krishna Infosys promptly, and in any event within twenty-four (24) hours of becoming aware.",
            "Breaches may constitute offences under the Information Technology Act, 2000. We may report breaches to law enforcement and cooperate by disclosing identity where required. Your right to use the Website ceases immediately upon such breach.",
        ],
    },
    {
        id: "services",
        title: "8. Services, quotations & payment",
        body: [
            "Krishna Infosys provides ELV turnkey solutions including CCTV, access control, fire alarm, public address, networking, automation, video conferencing, intercom/EPABX, and related professional services.",
            "Quotations and proposals are valid for the period stated, subject to change after expiry, based on information provided at the time, and subject to material and resource availability. Website content is not a formal offer or specification.",
            "Unless otherwise agreed in writing: supply of materials may require advance payment before order processing; installation payment is typically due upon successful commissioning and client sign-off; AMC is payable in advance as agreed. Payments are to be made via NEFT/RTGS to the bank account designated in the commercial documents.",
        ],
    },
    {
        id: "warranty",
        title: "9. Warranty (project equipment)",
        body: [
            "Equipment supplied under a project agreement is typically covered by a standard one (1) year warranty from the date of invoice against manufacturing defects, covering parts replacement only, unless a different term is stated in writing.",
            "Warranty excludes damage from acts of God, fire, flooding, power surges, misuse, negligence, unauthorised modifications, consumables, and software issues not arising from manufacturing defects. Full warranty terms appear in the applicable project or supply agreement.",
        ],
    },
    {
        id: "indemnity",
        title: "10. Indemnification",
        body: [
            "You agree to indemnify, defend, and hold harmless Krishna Infosys, its proprietor, employees, officers, affiliates, agents, and partners from claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising from your use of the Website, violation of these Terms or applicable law, infringement of third-party rights, or unauthorised access through your account. This obligation survives termination of these Terms.",
        ],
    },
    {
        id: "disclaimer",
        title: "11. Disclaimer of warranties",
        body: [
            "The Website and all content are provided on an “as is” and “as available” basis. To the maximum extent permitted by law, Krishna Infosys disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted or error-free access, and freedom from viruses or harmful components.",
            "Content is for general information only and is not professional engineering advice for a specific site. Formal survey, design, and written agreement are required before reliance for project decisions.",
            "While we take reasonable precautions to protect personal data, no internet transmission is fully secure.",
        ],
    },
    {
        id: "liability",
        title: "12. Limitation of liability",
        body: [
            "To the maximum extent permitted by law, Krishna Infosys shall not be liable for indirect, incidental, special, consequential, or punitive damages; loss of profits, revenue, data, or business opportunities; damages from use or inability to use the Website; reliance on Website content; technical disruptions or security events beyond reasonable control; or third-party linked sites.",
            "Aggregate liability arising solely from Website access shall not exceed the amount paid by you, if any, for accessing the Website. Liability under signed project or AMC contracts is governed exclusively by those agreements.",
        ],
    },
    {
        id: "links",
        title: "13. External links",
        body: [
            "Third-party links are provided for convenience and do not constitute endorsement. You leave our Website when you follow such links and become subject to those sites’ policies. We are not responsible for third-party content, privacy, or security.",
        ],
    },
    {
        id: "law",
        title: "14. Governing law & jurisdiction",
        body: [
            "These Terms are governed by the laws of India. Disputes arising from these Terms or Website use are subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat, India.",
            "Force majeure events (including natural disasters, war, government action, pandemics, power or network failures, and labour disputes) excuse performance delays beyond reasonable control, with prompt notice and reasonable mitigation efforts.",
        ],
    },
    {
        id: "grievance",
        title: "15. Grievance officer & contact",
        body: [
            "In accordance with the Information Technology Act, 2000 and applicable rules, grievances regarding these Terms, the Website, or personal data may be addressed to:",
            "Grievance Officer: Prakash Patel (CEO)",
            "Email: ceo@krishnainfosys.com | Phone: +91 79 4030 4848",
            "Address: 15 & 16, 1st Floor, Swastik House, Near Stadium Circle, Navrangpura, Ahmedabad – 380009",
            "Grievances shall be acknowledged within 24 hours and addressed within 15 working days where practicable.",
            "General enquiries: info@krishnainfosys.com · www.krishnainfosys.com",
        ],
    },
    {
        id: "general",
        title: "16. General",
        body: [
            "If any provision is held invalid or unenforceable, the remaining provisions continue in force. Failure to enforce a provision is not a waiver of the right to enforce it later.",
            "These Terms, together with the Privacy Policy, constitute the entire agreement regarding Website use and supersede prior communications on that subject.",
        ],
    },
];

export function TermsContent() {
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
                    Terms & Conditions
                </h1>

                <p className="legal-reveal mt-5 text-sm text-black/45">
                    Effective date: 1 August 2026 · Version 2.0
                </p>

                <p className="legal-reveal mt-6 text-base leading-7 text-black/55">
                    These Terms govern use of the Krishna Infosys website and related
                    enquiries, in line with the Information Technology Act, 2000 and the
                    Digital Personal Data Protection Act, 2023.
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
                        Proprietary firm · Proprietor: Prakash Patel · GSTIN: 24BNGPP7256R1Z5
                    </p>
                    <p className="mt-1">
                        Operational office: 15 &amp; 16, 1st Floor, Swastik House, Near
                        Stadium Circle, Navrangpura, Ahmedabad – 380009
                    </p>
                </div>

                <div className="legal-reveal mt-10 flex flex-wrap items-center gap-4">
                    <Link
                        href="/privacy"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/60 transition-colors hover:text-[#f56616]"
                    >
                        Privacy Policy
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