import { SolutionsHeroSection } from "@/components/solutions/solutions-hero-section";
import { SolutionsDomainsSection } from "@/components/solutions/solutions-domains-section";
import { SolutionsIntegrationSection } from "@/components/solutions/solutions-integration-section";
import { SolutionsProcessSection } from "@/components/solutions/solutions-process-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Solutions",
    description:
        "One ELV stack across five domains — security, communication, audio visual, networking and automation — designed as an integrated system.",
    path: "/solutions",
});

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