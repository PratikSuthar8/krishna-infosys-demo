import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Security & Access",
  description: "CCTV, access control, intrusion alarm, boom barriers and video door phones — integrated security for commercial and industrial sites.",
  path: "/solutions/security-access",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="security-access" />
    </main>
  );
}
