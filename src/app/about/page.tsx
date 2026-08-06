import { AboutHeroSection } from "@/components/about/about-hero-section";
import { AboutStorySection } from "@/components/about/about-story-section";
import { AboutMissionSection } from "@/components/about/about-mission-section";
import { AboutAdvantageSection } from "@/components/about/about-advantage-section";
import { AboutDomainsSection } from "@/components/about/about-domains-section";
import { AboutPresenceSection } from "@/components/about/about-presence-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "About",
    description:
        "25+ years of ELV engineering. Vision, mission, values and the delivery model behind 2,100+ projects and 850+ clients.",
    path: "/about",
});
export default function AboutPage() {
    return (
        <main>
            <AboutHeroSection />
            <AboutStorySection />
            <AboutMissionSection />
            <AboutAdvantageSection />
            <AboutDomainsSection />
            <AboutPresenceSection />
        </main>
    );
}