import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BlogHeroSection } from "@/components/blog/blog-hero-section";
import { BlogListSection } from "@/components/blog/blog-list-section";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Notes on ELV design, security, networking and maintenance from the Krishna Infosys engineering team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main>
      <BlogHeroSection />
      <BlogListSection />
    </main>
  );
}
