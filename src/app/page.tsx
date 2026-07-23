import { HeroSection } from "@/components/home/hero-section";
import { TrustEngineeringSection } from "@/components/home/trust-engineering-section";
import { SolutionsEcosystemSection } from "@/components/home/solutions-ecosystem-section";
import { ProvenScaleSection } from "@/components/home/proven-scale-section";
import { IndustriesSection } from "@/components/home/industries-section";
import { WhyKrishnaSection } from "@/components/home/why-krishna-section";
import { TechnologyEcosystemSection } from "@/components/home/technology-ecosystem-section";
import { ClientSuccessSection } from "@/components/home/client-success-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustEngineeringSection />
      <SolutionsEcosystemSection />
      <ProvenScaleSection />
      <IndustriesSection />
      <WhyKrishnaSection />
      <TechnologyEcosystemSection />
      <ClientSuccessSection />
      <FinalCtaSection />
    </main>
  );
}
