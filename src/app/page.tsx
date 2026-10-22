import { HeroSection } from "@/components/home/hero-section";
import { TrustEngineeringSection } from "@/components/home/trust-engineering-section";
import { SolutionsEcosystemSection } from "@/components/home/solutions-ecosystem-section";
import { ClientsStripSection } from "@/components/home/clients-strip-section";
import { ClientSuccessSection } from "@/components/home/client-success-section";
import { ProvenScaleSection } from "@/components/home/proven-scale-section";
import { IndustriesSection } from "@/components/home/industries-section";
import { WhyKrishnaSection } from "@/components/home/why-krishna-section";
import { TechnologyEcosystemSection } from "@/components/home/technology-ecosystem-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "CCTV, Fire Alarm & ELV Systems in Ahmedabad | Krishna Infosys",
  description:
    "CCTV installation, fire alarm, access control, EPABX and ELV systems in Ahmedabad. Design, execution and AMC support from Krishna Infosys — 25+ years, pan-India delivery.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustEngineeringSection />
      <SolutionsEcosystemSection />
      <ClientsStripSection />
      <ClientSuccessSection />
      <ProvenScaleSection />
      <IndustriesSection />
      <WhyKrishnaSection />
      <TechnologyEcosystemSection />
      <FinalCtaSection />
    </main>
  );
}
