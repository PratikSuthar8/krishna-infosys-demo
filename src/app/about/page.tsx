import { AboutHeroSection } from "@/components/about/about-hero-section";
import { AboutStorySection } from "@/components/about/about-story-section";
import { AboutVmvSection } from "@/components/about/about-vmv-section";
import { AboutAdvantageSection } from "@/components/about/about-advantage-section";
import { AboutDomainsSection } from "@/components/about/about-domains-section";
import { AboutPresenceSection } from "@/components/about/about-presence-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
    title: "About Krishna Infosys | ELV Company in Ahmedabad",
    description:
        "25+ years of ELV engineering from Ahmedabad. Vision, delivery model and the team behind 2,200+ projects and 950+ clients across India.",
    path: "/about",
});
export default function AboutPage() {
    return (
        <main>
            <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
            <AboutHeroSection />
            <AboutStorySection />
            <AboutVmvSection />
            <AboutAdvantageSection />
            <AboutDomainsSection />
            <AboutPresenceSection />
        </main>
    );
}