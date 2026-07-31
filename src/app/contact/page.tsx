import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { ContactPresenceSection } from "@/components/contact/contact-presence-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Contact",
    description:
        "Contact Krishna Infosys for ELV project design, AMC coverage or technical consultation. Ahmedabad HQ · Pan-India delivery.",
    path: "/contact",
});
export default function ContactPage() {
    return (
        <main>
            <ContactHeroSection />
            <ContactFormSection />
            <ContactPresenceSection />
        </main>
    );
}