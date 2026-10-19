import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "EPABX, Intercom & PA Systems in Ahmedabad",
  description: "EPABX, intercom, video conferencing and public address systems in Ahmedabad for clear operations and emergency voice.",
  path: "/solutions/communication",
});

export default function Page() {
  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: "EPABX, Intercom & PA Systems",
          description: "EPABX, intercom, video conferencing and public address systems in Ahmedabad for clear operations and emergency voice.",
          path: "/solutions/communication",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Communication", path: "/solutions/communication" },
        ])}
      />
      <DomainPage domainId="communication" />
    </main>
  );
}
