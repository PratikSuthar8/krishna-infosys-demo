import { IndustriesHeroSection } from "@/components/industries/industries-hero-section";
import { IndustriesMosaicSection } from "@/components/industries/industries-mosaic-section";
import { IndustriesSpotlightSection } from "@/components/industries/industries-spotlight-section";
import { IndustriesCtaSection } from "@/components/industries/industries-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";




export const metadata: Metadata = buildMetadata({
    title: "ELV Systems by Industry in Ahmedabad",
    description:
        "ELV design and integration for manufacturing, healthcare, commercial and institutional sites across Gujarat and India.",
    path: "/industries",
});
export default function IndustriesPage() {
    return (
        <main>
            <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
            <IndustriesHeroSection />
            <IndustriesMosaicSection />
            <IndustriesSpotlightSection />
            <IndustriesCtaSection />
        </main>
    );
}