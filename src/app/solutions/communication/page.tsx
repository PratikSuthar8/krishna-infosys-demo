import { CommunicationHeroSection } from "@/components/solutions/communication/communication-hero-section";
import { CommunicationCapabilitiesSection } from "@/components/solutions/communication/communication-capabilities-section";
import { CommunicationApproachSection } from "@/components/solutions/communication/communication-approach-section";
import { CommunicationCtaSection } from "@/components/solutions/communication/communication-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Communication Systems",
    description:
        "EPABX, intercom, public address, video conferencing and FTTH/DTH — communication infrastructure for clear site operations.",
    path: "/solutions/communication",
});
export default function CommunicationPage() {
    return (
        <main>
            <CommunicationHeroSection />
            <CommunicationCapabilitiesSection />
            <CommunicationApproachSection />
            <CommunicationCtaSection />
        </main>
    );
}