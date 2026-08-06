import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CookiesContent } from "@/components/legal/cookies-content";

export const metadata: Metadata = buildMetadata({
    title: "Cookie Policy",
    description:
        "How Krishna Infosys uses cookies and similar technologies on www.krishnainfosys.com.",
    path: "/cookies",
});

export default function CookiesPage() {
    return (
        <main>
            <CookiesContent />
        </main>
    );
}