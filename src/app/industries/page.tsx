import { IndustriesHeroSection } from "@/components/industries/industries-hero-section";
import { IndustriesMosaicSection } from "@/components/industries/industries-mosaic-section";
import { IndustriesSpotlightSection } from "@/components/industries/industries-spotlight-section";
import { IndustriesCtaSection } from "@/components/industries/industries-cta-section";

export default function IndustriesPage() {
    return (
        <main>
            <IndustriesHeroSection />
            <IndustriesMosaicSection />
            <IndustriesSpotlightSection />
            <IndustriesCtaSection />
        </main>
    );
}