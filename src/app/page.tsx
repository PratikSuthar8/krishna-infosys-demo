import { HeroSection } from "@/components/home/hero-section";
import { TrustEngineeringSection } from "@/components/home/trust-engineering-section";
import { SolutionsEcosystemSection } from "@/components/home/solutions-ecosystem-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustEngineeringSection />
      <SolutionsEcosystemSection />
    </main>
  );
}
