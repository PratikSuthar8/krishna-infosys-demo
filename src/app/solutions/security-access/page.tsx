import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "CCTV & Access Control Systems, Ahmedabad",
  description: "CCTV surveillance, access control, intrusion alarm and perimeter systems in Ahmedabad — designed, installed and maintained by Krishna Infosys.",
  path: "/solutions/security-access",
});

export default function Page() {
  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: "CCTV & Access Control Systems",
          description: "CCTV surveillance, access control, intrusion alarm and perimeter systems in Ahmedabad — designed, installed and maintained by Krishna Infosys.",
          path: "/solutions/security-access",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Security & Access", path: "/solutions/security-access" },
        ])}
      />
      <DomainPage domainId="security-access" />
    </main>
  );
}
