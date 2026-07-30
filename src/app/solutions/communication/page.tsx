import { CommunicationHeroSection } from "@/components/solutions/communication/communication-hero-section";
import { CommunicationCapabilitiesSection } from "@/components/solutions/communication/communication-capabilities-section";
import { CommunicationApproachSection } from "@/components/solutions/communication/communication-approach-section";
import { CommunicationCtaSection } from "@/components/solutions/communication/communication-cta-section";

export default function CommunicationPage() {
    return (
        <main>
            <CommunicationHeroSection />
            <CommunicationCapabilitiesSection />
            <CommunicationApproachSection />
            <CommunicationCtaSection />
        </main>
    );
}