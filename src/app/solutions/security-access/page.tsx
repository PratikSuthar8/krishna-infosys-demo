import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "CCTV & Access Control Systems, Ahmedabad",
  description: "CCTV surveillance, access control, intrusion alarm and perimeter systems in Ahmedabad — designed, installed and maintained by Krishna Infosys.",
  path: "/solutions/security-access",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="security-access" />
    </main>
  );
}
