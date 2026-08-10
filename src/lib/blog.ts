import blogData from "@/data/blog-posts.json";

export type BlogPost = (typeof blogData.posts)[number];

/** Today: local JSON. Later: replace body with fetch to your CMS/API. */
export function getBlogPosts(): BlogPost[] {
  return blogData.posts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogData.posts.find((p) => p.slug === slug);
}
