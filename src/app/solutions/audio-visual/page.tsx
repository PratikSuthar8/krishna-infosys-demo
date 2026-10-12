import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Audio Visual Systems in Ahmedabad",
  description: "Boardroom, auditorium and display AV systems in Ahmedabad — design, supply, integration and support.",
  path: "/solutions/audio-visual",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="audio-visual" />
    </main>
  );
}
