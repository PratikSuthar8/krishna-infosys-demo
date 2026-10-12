import { AmcHeroSection } from "@/components/amc/amc-hero-section";
import { AmcCoverageSection } from "@/components/amc/amc-coverage-section";
import { AmcServiceSection } from "@/components/amc/amc-service-section";
import { AmcPlansSection } from "@/components/amc/amc-plans-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "CCTV & Fire Alarm AMC Services, Ahmedabad",
    description:
        "Annual maintenance contracts for CCTV, fire alarm, access control and ELV systems in Ahmedabad. Preventive service, faster response and lower downtime.",
    path: "/amc-support",
});
export default function AmcSupportPage() {
    return (
        <main>
            <AmcHeroSection />
            <AmcCoverageSection />
            <AmcServiceSection />
            {/* <AmcPlansSection /> */}
        </main>
    );
}