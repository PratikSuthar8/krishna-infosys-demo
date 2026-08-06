"use client";

import type { DomainId } from "@/data/domains";
import { domains } from "@/data/domains";
import { DomainHero } from "@/components/solutions/shared/domain-hero";
import { DomainCapabilities } from "@/components/solutions/shared/domain-capabilities";
import { DomainApproach } from "@/components/solutions/shared/domain-approach";
import { DomainCta } from "@/components/solutions/shared/domain-cta";

export function DomainPage({ domainId }: { domainId: DomainId }) {
  const domain = domains[domainId];

  return (
    <>
      <DomainHero domain={domain} />
      <DomainCapabilities domain={domain} />
      <DomainApproach domain={domain} />
      <DomainCta domain={domain} />
    </>
  );
}
