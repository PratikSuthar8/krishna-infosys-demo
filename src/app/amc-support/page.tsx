import { AmcHeroSection } from "@/components/amc/amc-hero-section";
import { AmcCoverageSection } from "@/components/amc/amc-coverage-section";
import { AmcServiceSection } from "@/components/amc/amc-service-section";
import { AmcPlansSection } from "@/components/amc/amc-plans-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "AMC & Support",
    description:
        "Preventive maintenance, 24-hour corrective response, OEM escalation and lifecycle support for ELV systems.",
    path: "/amc-support",
});
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