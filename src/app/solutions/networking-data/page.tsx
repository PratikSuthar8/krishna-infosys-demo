import { NetworkingHeroSection } from "@/components/solutions/networking/networking-hero-section";
import { NetworkingCapabilitiesSection } from "@/components/solutions/networking/networking-capabilities-section";
import { NetworkingApproachSection } from "@/components/solutions/networking/networking-approach-section";
import { NetworkingCtaSection } from "@/components/solutions/networking/networking-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Networking & Data",
    description:
        "Structured cabling, fibre, Wi-Fi, server rooms and data-centre pathways — the backbone for every ELV and IT load.",
    path: "/solutions/networking-data",
});
export default function NetworkingDataPage() {
    return (
        <main>
            <NetworkingHeroSection />
            <NetworkingCapabilitiesSection />
            <NetworkingApproachSection />
            <NetworkingCtaSection />
        </main>
    );
}   