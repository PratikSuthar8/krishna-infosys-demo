import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Fire Alarm & Building Automation, Ahmedabad",
  description: "Fire alarm, detection and building automation systems in Ahmedabad — life safety integrated with ELV infrastructure.",
  path: "/solutions/automation-safety",
});

export default function Page() {
  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: "Fire Alarm & Building Automation",
          description: "Fire alarm, detection and building automation systems in Ahmedabad — life safety integrated with ELV infrastructure.",
          path: "/solutions/automation-safety",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Automation & Safety", path: "/solutions/automation-safety" },
        ])}
      />
      <DomainPage domainId="automation-safety" />
    </main>
  );
}
