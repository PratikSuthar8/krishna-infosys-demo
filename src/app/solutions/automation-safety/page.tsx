import { AutomationHeroSection } from "@/components/solutions/automation/automation-hero-section";
import { AutomationCapabilitiesSection } from "@/components/solutions/automation/automation-capabilities-section";
import { AutomationApproachSection } from "@/components/solutions/automation/automation-approach-section";
import { AutomationCtaSection } from "@/components/solutions/automation/automation-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Automation & Safety",
    description:
        "Home automation, building automation and fire alarm systems — intelligent control with integrated life-safety.",
    path: "/solutions/automation-safety",
});
export default function AutomationSafetyPage() {
    return (
        <main>
            <AutomationHeroSection />
            <AutomationCapabilitiesSection />
            <AutomationApproachSection />
            <AutomationCtaSection />
        </main>
    );
}