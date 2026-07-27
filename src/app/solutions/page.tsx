import { SolutionsHeroSection } from "@/components/solutions/solutions-hero-section";
import { SolutionsDomainsSection } from "@/components/solutions/solutions-domains-section";
import { SolutionsIntegrationSection } from "@/components/solutions/solutions-integration-section";
import { SolutionsProcessSection } from "@/components/solutions/solutions-process-section";

export default function SolutionsPage() {
    return (
        <main>
            <SolutionsHeroSection />
            <SolutionsDomainsSection />
            <SolutionsIntegrationSection />
            <SolutionsProcessSection />
        </main>
    );
}