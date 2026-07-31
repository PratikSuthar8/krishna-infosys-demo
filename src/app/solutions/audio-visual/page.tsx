import { AvHeroSection } from "@/components/solutions/audio-visual/av-hero-section";
import { AvCapabilitiesSection } from "@/components/solutions/audio-visual/av-capabilities-section";
import { AvApproachSection } from "@/components/solutions/audio-visual/av-approach-section";
import { AvCtaSection } from "@/components/solutions/audio-visual/av-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";


export const metadata: Metadata = buildMetadata({
    title: "Audio Visual Systems",
    description:
        "Home theatre, professional audio, digital signage and auditorium AV — engineered for reliable daily performance.",
    path: "/solutions/audio-visual",
});
export default function AudioVisualPage() {
    return (
        <main>
            <AvHeroSection />
            <AvCapabilitiesSection />
            <AvApproachSection />
            <AvCtaSection />
        </main>
    );
}