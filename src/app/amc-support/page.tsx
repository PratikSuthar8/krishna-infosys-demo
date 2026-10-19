import { AmcHeroSection } from "@/components/amc/amc-hero-section";
import { AmcCoverageSection } from "@/components/amc/amc-coverage-section";
import { AmcServiceSection } from "@/components/amc/amc-service-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "CCTV & Fire Alarm AMC Services, Ahmedabad",
  description:
    "Annual maintenance contracts for CCTV, fire alarm, access control and ELV systems in Ahmedabad. Preventive service, faster response and lower downtime.",
  path: "/amc-support",
});

export default function AmcSupportPage() {
  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: "CCTV & Fire Alarm AMC",
          description:
            "Annual maintenance contracts for CCTV, fire alarm, access control and ELV systems in Ahmedabad.",
          path: "/amc-support",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AMC & Support", path: "/amc-support" },
        ])}
      />
      <AmcHeroSection />
      <AmcCoverageSection />
      <AmcServiceSection />
    </main>
  );
}
