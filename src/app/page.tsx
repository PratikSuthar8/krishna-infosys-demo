import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/hero-section";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

// Below-fold: code-split so initial JS stays smaller
const TrustEngineeringSection = dynamic(
  () =>
    import("@/components/home/trust-engineering-section").then(
      (m) => m.TrustEngineeringSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const SolutionsEcosystemSection = dynamic(
  () =>
    import("@/components/home/solutions-ecosystem-section").then(
      (m) => m.SolutionsEcosystemSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const ClientsStripSection = dynamic(
  () =>
    import("@/components/home/clients-strip-section").then(
      (m) => m.ClientsStripSection,
    ),
  { loading: () => <SectionSkeleton className="min-h-[20vh]" /> },
);
const ClientSuccessSection = dynamic(
  () =>
    import("@/components/home/client-success-section").then(
      (m) => m.ClientSuccessSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const ProvenScaleSection = dynamic(
  () =>
    import("@/components/home/proven-scale-section").then(
      (m) => m.ProvenScaleSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const IndustriesSection = dynamic(
  () =>
    import("@/components/home/industries-section").then(
      (m) => m.IndustriesSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const WhyKrishnaSection = dynamic(
  () =>
    import("@/components/home/why-krishna-section").then(
      (m) => m.WhyKrishnaSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const TechnologyEcosystemSection = dynamic(
  () =>
    import("@/components/home/technology-ecosystem-section").then(
      (m) => m.TechnologyEcosystemSection,
    ),
  { loading: () => <SectionSkeleton /> },
);
const FinalCtaSection = dynamic(
  () =>
    import("@/components/home/final-cta-section").then(
      (m) => m.FinalCtaSection,
    ),
  { loading: () => <SectionSkeleton className="min-h-[30vh]" /> },
);

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
