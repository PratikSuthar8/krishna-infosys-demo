import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { CareersHeroSection } from "@/components/careers/careers-hero-section";
import { CareersOpeningsSection } from "@/components/careers/careers-openings-section";
import { CareersWhySection } from "@/components/careers/careers-why-section";
import { CareersCtaSection } from "@/components/careers/careers-cta-section";
import { getPublishedJobs } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Careers at Krishna Infosys | Jobs in Ahmedabad",
  description:
    "Open roles in projects, engineering, sales and operations at Krishna Infosys, Ahmedabad.",
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await getPublishedJobs();
  return (
    <main>
        <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <CareersHeroSection />
      <CareersOpeningsSection openings={jobs} />
      <CareersWhySection />
      <CareersCtaSection />
    </main>
  );
}
