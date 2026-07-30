import { SecurityHeroSection } from "@/components/solutions/security/security-hero-section";
import { SecurityCapabilitiesSection } from "@/components/solutions/security/security-capabilities-section";
import { SecurityApproachSection } from "@/components/solutions/security/security-approach-section";
import { SecurityCtaSection } from "@/components/solutions/security/security-cta-section";

export default function SecurityAccessPage() {
    return (
        <main>
            <SecurityHeroSection />
            <SecurityCapabilitiesSection />
            <SecurityApproachSection />
            <SecurityCtaSection />
        </main>
    );
}