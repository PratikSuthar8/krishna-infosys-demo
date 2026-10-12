import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Structured Cabling & Networking, Ahmedabad",
  description: "Structured cabling, LAN and network infrastructure in Ahmedabad for security, voice and data on one backbone.",
  path: "/solutions/networking-data",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="networking-data" />
    </main>
  );
}
