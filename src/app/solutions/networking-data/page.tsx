import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Networking & Data",
  description: "Structured cabling, fibre, Wi-Fi, server rooms and data-centre pathways — backbone for every ELV and IT load.",
  path: "/solutions/networking-data",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="networking-data" />
    </main>
  );
}
