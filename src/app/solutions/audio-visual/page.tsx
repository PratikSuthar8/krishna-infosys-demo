import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DomainPage } from "@/components/solutions/shared/domain-page";

export const metadata: Metadata = buildMetadata({
  title: "Audio Visual Systems",
  description: "Home theatre, professional audio, digital signage and auditorium AV — engineered for reliable daily performance.",
  path: "/solutions/audio-visual",
});

export default function Page() {
  return (
    <main>
      <DomainPage domainId="audio-visual" />
    </main>
  );
}
