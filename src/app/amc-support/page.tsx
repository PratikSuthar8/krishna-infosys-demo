import { AmcHeroSection } from "@/components/amc/amc-hero-section";
import { AmcCoverageSection } from "@/components/amc/amc-coverage-section";
import { AmcServiceSection } from "@/components/amc/amc-service-section";
import { AmcPlansSection } from "@/components/amc/amc-plans-section";

export default function AmcSupportPage() {
    return (
        <main>
            <AmcHeroSection />
            <AmcCoverageSection />
            <AmcServiceSection />
            <AmcPlansSection />
        </main>
    );
}