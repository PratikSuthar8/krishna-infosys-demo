import { AboutHeroSection } from "@/components/about/about-hero-section";
import { AboutStorySection } from "@/components/about/about-story-section";
import { AboutMissionSection } from "@/components/about/about-mission-section";
import { AboutAdvantageSection } from "@/components/about/about-advantage-section";
import { AboutDomainsSection } from "@/components/about/about-domains-section";
import { AboutPresenceSection } from "@/components/about/about-presence-section";

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