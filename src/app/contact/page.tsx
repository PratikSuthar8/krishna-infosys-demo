import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { ContactPresenceSection } from "@/components/contact/contact-presence-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
    title: "Contact Krishna Infosys | ELV Quote in Ahmedabad",
    description:
        "Request a consultation for CCTV, fire alarm, access control or ELV AMC in Ahmedabad. Navrangpura office — call, email or WhatsApp.",
    path: "/contact",
});
export default function ContactPage() {
    return (
        <main>
            <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
            <ContactHeroSection />
            <ContactFormSection />
            <ContactPresenceSection />
        </main>
    );
}