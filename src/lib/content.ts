import { getCollection } from "@/lib/mongodb";
import blogData from "@/data/blog-posts.json";
import jobsData from "@/data/jobs.json";

/**
 * Server-side content readers for public pages.
 * Read MongoDB directly (no HTTP round-trip to our own API) and fall back to
 * the bundled JSON when the database is unavailable (e.g. during a build).
 */

export type PublicPost = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  updatedAt?: string;
  readTime?: string;
  author?: string;
  image?: string;
  body?: string | string[];
};

export type PublicJob = (typeof jobsData.jobs)[number] & {
  datePosted?: string;
  validThrough?: string;
  updatedAt?: string;
};

const publishedFilter = {
  $or: [
    { published: true },
    { published: { $exists: false } },
    { published: null },
  ],
};

function toIso(v: unknown): string | undefined {
  if (!v) return undefined;
  const d = v instanceof Date ? v : new Date(String(v));
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function cleanPost(doc: Record<string, unknown>): PublicPost {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return { ...(rest as PublicPost), updatedAt: toIso(updatedAt) };
}

function cleanJob(doc: Record<string, unknown>): PublicJob {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return {
    ...(rest as PublicJob),
    updatedAt: toIso(updatedAt),
    datePosted:
      (rest.datePosted as string | undefined) ?? toIso(createdAt)?.slice(0, 10),
  };
}

export async function getPublishedPosts(): Promise<PublicPost[]> {
  try {
    const col = await getCollection("blog_posts");
    const docs = await col.find(publishedFilter).sort({ date: -1 }).toArray();
    return docs.map((d) => cleanPost(d as Record<string, unknown>));
  } catch {
    return blogData.posts as PublicPost[];
  }
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  try {
    const col = await getCollection("blog_posts");
    const doc = await col.findOne({ slug, ...publishedFilter });
    return doc ? cleanPost(doc as Record<string, unknown>) : null;
  } catch {
    return (blogData.posts.find((p) => p.slug === slug) as PublicPost) ?? null;
  }
}

export async function getPublishedJobs(): Promise<PublicJob[]> {
  try {
    const col = await getCollection("jobs");
    const docs = await col.find(publishedFilter).sort({ role: 1 }).toArray();
    return docs.map((d) => cleanJob(d as Record<string, unknown>));
  } catch {
    return jobsData.jobs as PublicJob[];
  }
}

export async function getPublishedJob(slug: string): Promise<PublicJob | null> {
  try {
    const col = await getCollection("jobs");
    const doc = await col.findOne({ slug, ...publishedFilter });
    return doc ? cleanJob(doc as Record<string, unknown>) : null;
  } catch {
    return (jobsData.jobs.find((j) => j.slug === slug) as PublicJob) ?? null;
  }
}
