import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { ContactPresenceSection } from "@/components/contact/contact-presence-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Contact Krishna Infosys | ELV Quote in Ahmedabad",
    description:
        "Request a consultation for CCTV, fire alarm, access control or ELV AMC in Ahmedabad. Navrangpura office — call, email or WhatsApp.",
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