import { ProjectsHeroSection } from "@/components/projects/projects-hero-section";
import { ProjectsFeaturedSection } from "@/components/projects/projects-featured-section";
import { ProjectsIndexSection } from "@/components/projects/projects-index-section";
import { ProjectsCtaSection } from "@/components/projects/projects-cta-section";

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