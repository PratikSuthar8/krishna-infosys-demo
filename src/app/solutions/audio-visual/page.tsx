import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Audio Visual Systems in Ahmedabad",
  description: "Boardroom, auditorium and display AV systems in Ahmedabad — design, supply, integration and support.",
  path: "/solutions/audio-visual",
});

export default function Page() {
  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: "Audio Visual Systems",
          description: "Boardroom, auditorium and display AV systems in Ahmedabad — design, supply, integration and support.",
          path: "/solutions/audio-visual",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Audio Visual", path: "/solutions/audio-visual" },
        ])}
      />
      <DomainPage domainId="audio-visual" />
    </main>
  );
}
