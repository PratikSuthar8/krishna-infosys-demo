import { SecurityHeroSection } from "@/components/solutions/security/security-hero-section";
import { SecurityCapabilitiesSection } from "@/components/solutions/security/security-capabilities-section";
import { SecurityApproachSection } from "@/components/solutions/security/security-approach-section";
import { SecurityCtaSection } from "@/components/solutions/security/security-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";


export const metadata: Metadata = buildMetadata({
    title: "Security & Access",
    description:
        "CCTV, access control, intrusion alarm, boom barriers and video door phones — integrated security systems for commercial and industrial sites.",
    path: "/solutions/security-access",
});

export default function SecurityAccessPage() {
    return (
        <main>
            <SecurityHeroSection />
            <SecurityCapabilitiesSection />
            <SecurityApproachSection />
            <SecurityCtaSection />
        </main>
    );
}