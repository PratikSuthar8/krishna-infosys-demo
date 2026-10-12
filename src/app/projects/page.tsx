import { ProjectsHeroSection } from "@/components/projects/projects-hero-section";
import { ProjectsFeaturedSection } from "@/components/projects/projects-featured-section";
import { ProjectsIndexSection } from "@/components/projects/projects-index-section";
import { ProjectsCtaSection } from "@/components/projects/projects-cta-section";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "ELV Projects in Ahmedabad & Across India | Krishna Infosys",
    description:
        "Selected ELV projects — security, communication, networking and automation programmes delivered by Krishna Infosys.",
    path: "/projects",
});
export default function ProjectsPage() {
    return (
        <main>
            <ProjectsHeroSection />
            <ProjectsFeaturedSection />
            <ProjectsIndexSection />
            <ProjectsCtaSection />
        </main>
    );
}