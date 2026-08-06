import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Communication Systems",
  description: "EPABX, intercom, public address, video conferencing and FTTH/DTH — communication infrastructure for clear site operations.",
  path: "/solutions/communication",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="communication" />
    </main>
  );
}
