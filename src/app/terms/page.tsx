import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { TermsContent } from "@/components/legal/terms-content";

export const metadata: Metadata = buildMetadata({
    title: "Terms & Conditions",
    description:
        "Terms and conditions governing the use of the Krishna Infosys website and related enquiries for ELV design, execution and support services.",
    path: "/terms",
});

export default function TermsPage() {
    return (
        <main>
            <TermsContent />
        </main>
    );
}