import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { ContactPresenceSection } from "@/components/contact/contact-presence-section";

export default function ContactPage() {
    return (
        <main>
            <ContactHeroSection />
            <ContactFormSection />
            <ContactPresenceSection />
        </main>
    );
}