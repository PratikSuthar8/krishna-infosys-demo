import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Automation & Safety",
  description: "Home automation, building automation and fire alarm systems — intelligent control with integrated life-safety.",
  path: "/solutions/automation-safety",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="automation-safety" />
    </main>
  );
}
