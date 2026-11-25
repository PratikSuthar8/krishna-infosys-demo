import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { BlogHeroSection } from "@/components/blog/blog-hero-section";
import { BlogListSection } from "@/components/blog/blog-list-section";
import { getPublishedPosts } from "@/lib/content";

// Rebuilt at most once an hour; admin edits trigger an immediate refresh.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "ELV Insights & Guides | Krishna Infosys Blog",
  description:
    "Practical notes on ELV design, CCTV, structured cabling and AMC from the Krishna Infosys engineering team.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <main>
        <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <BlogHeroSection />
      <BlogListSection posts={posts} />
    </main>
  );
}
