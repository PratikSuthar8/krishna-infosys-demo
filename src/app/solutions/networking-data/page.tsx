import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Structured Cabling & Networking, Ahmedabad",
  description: "Structured cabling, LAN and network infrastructure in Ahmedabad for security, voice and data on one backbone.",
  path: "/solutions/networking-data",
});

export default function Page() {
  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: "Structured Cabling & Networking",
          description: "Structured cabling, LAN and network infrastructure in Ahmedabad for security, voice and data on one backbone.",
          path: "/solutions/networking-data",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Networking & Data", path: "/solutions/networking-data" },
        ])}
      />
      <DomainPage domainId="networking-data" />
    </main>
  );
}
