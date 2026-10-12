import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BlogHeroSection } from "@/components/blog/blog-hero-section";
import { BlogListSection } from "@/components/blog/blog-list-section";

export const metadata: Metadata = buildMetadata({
  title: "ELV Insights & Guides | Krishna Infosys Blog",
  description:
    "Practical notes on ELV design, CCTV, structured cabling and AMC from the Krishna Infosys engineering team.",
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
