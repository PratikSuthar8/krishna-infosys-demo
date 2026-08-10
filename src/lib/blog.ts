import blogData from "@/data/blog-posts.json";

export type BlogPost = (typeof blogData.posts)[number];

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${base}/api/blog`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.posts)) return data.posts as BlogPost[];
    }
  } catch {
    /* fall through */
  }
  return blogData.posts as BlogPost[];
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const res = await fetch(`${base}/api/blog/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.post) return data.post as BlogPost;
    }
  } catch {
    /* fall through */
  }
  return blogData.posts.find((p) => p.slug === slug);
}

export function getBlogPosts(): BlogPost[] {
  return blogData.posts as BlogPost[];
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogData.posts.find((p) => p.slug === slug);
}
