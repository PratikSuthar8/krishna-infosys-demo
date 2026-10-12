import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "EPABX, Intercom & PA Systems in Ahmedabad",
  description: "EPABX, intercom, video conferencing and public address systems in Ahmedabad for clear operations and emergency voice.",
  path: "/solutions/communication",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="communication" />
    </main>
  );
}
