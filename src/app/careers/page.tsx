import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CareersHeroSection } from "@/components/careers/careers-hero-section";
import { CareersOpeningsSection } from "@/components/careers/careers-openings-section";
import { CareersWhySection } from "@/components/careers/careers-why-section";
import { CareersCtaSection } from "@/components/careers/careers-cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Krishna Infosys — growth-oriented ELV careers in projects, sales, engineering and operations. Ahmedabad HQ · Pan-India delivery.",
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
