import { SolutionsHeroSection } from "@/components/solutions/solutions-hero-section";
import { SolutionsDomainsSection } from "@/components/solutions/solutions-domains-section";
import { SolutionsIntegrationSection } from "@/components/solutions/solutions-integration-section";
import { SolutionsProcessSection } from "@/components/solutions/solutions-process-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "ELV Solutions in Ahmedabad | Security, AV, Networking",
    description:
        "Integrated ELV solutions in Ahmedabad: CCTV, access control, fire alarm, EPABX, audio-visual, networking and building automation — design to AMC.",
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