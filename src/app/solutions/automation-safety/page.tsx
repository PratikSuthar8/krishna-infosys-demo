import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Fire Alarm & Building Automation, Ahmedabad",
  description: "Fire alarm, detection and building automation systems in Ahmedabad — life safety integrated with ELV infrastructure.",
  path: "/solutions/automation-safety",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="automation-safety" />
    </main>
  );
}
