import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BlogHeroSection } from "@/components/blog/blog-hero-section";
import { BlogListSection } from "@/components/blog/blog-list-section";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical writing on ELV design sequencing, infrastructure and support.",
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
