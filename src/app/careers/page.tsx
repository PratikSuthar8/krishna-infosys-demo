import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CareersHeroSection } from "@/components/careers/careers-hero-section";
import { CareersOpeningsSection } from "@/components/careers/careers-openings-section";
import { CareersWhySection } from "@/components/careers/careers-why-section";
import { CareersCtaSection } from "@/components/careers/careers-cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Careers at Krishna Infosys | Jobs in Ahmedabad",
  description:
    "Open roles in projects, engineering, sales and operations at Krishna Infosys, Ahmedabad.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <main>
      <CareersHeroSection />
      <CareersOpeningsSection />
      <CareersWhySection />
      <CareersCtaSection />
    </main>
  );
}
