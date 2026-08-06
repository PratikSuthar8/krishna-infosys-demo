import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PrivacyContent } from "@/components/legal/privacy-content";

export const metadata: Metadata = buildMetadata({
    title: "Privacy Policy",
    description:
        "How Krishna Infosys collects, uses and protects personal information submitted through our website and business enquiries.",
    path: "/privacy",
});

export default function PrivacyPage() {
    return (
        <main>
            <PrivacyContent />
        </main>
    );
}