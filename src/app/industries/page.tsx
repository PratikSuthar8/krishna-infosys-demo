import { IndustriesHeroSection } from "@/components/industries/industries-hero-section";
import { IndustriesMosaicSection } from "@/components/industries/industries-mosaic-section";
import { IndustriesSpotlightSection } from "@/components/industries/industries-spotlight-section";
import { IndustriesCtaSection } from "@/components/industries/industries-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";




export const metadata: Metadata = buildMetadata({
    title: "ELV Systems for Industry & Enterprise | Ahmedabad",
    description:
        "ELV design and integration for manufacturing, healthcare, commercial and institutional sites across Gujarat and India.",
    path: "/industries",
});
export default function IndustriesPage() {
    return (
        <main>
            <IndustriesHeroSection />
            <IndustriesMosaicSection />
            <IndustriesSpotlightSection />
            <IndustriesCtaSection />
        </main>
    );
}