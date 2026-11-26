import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { getPublishedJobs, getPublishedPosts } from "@/lib/content";

// Refresh the sitemap hourly. Admin content updates can also trigger revalidation.
export const revalidate = 3600;

const staticRoutes: { path: string; lastModified?: string }[] = [
  { path: "/", lastModified: "2026-11-25" },
  { path: "/about", lastModified: "2026-11-25" },
  { path: "/solutions", lastModified: "2026-11-25" },
  { path: "/solutions/security-access", lastModified: "2026-11-25" },
  { path: "/solutions/communication", lastModified: "2026-11-25" },
  { path: "/solutions/audio-visual", lastModified: "2026-11-25" },
  { path: "/solutions/networking-data", lastModified: "2026-11-25" },
  { path: "/solutions/automation-safety", lastModified: "2026-11-25" },
  { path: "/industries", lastModified: "2026-11-25" },
  { path: "/projects", lastModified: "2026-11-05" },
  { path: "/amc-support", lastModified: "2026-11-05" },
  { path: "/contact", lastModified: "2026-11-05" },
  { path: "/careers", lastModified: "2026-11-05" },
  { path: "/blog", lastModified: "2026-11-25" },
];

function validDate(value?: string): Date | undefined {
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route.path}`,
    ...(validDate(route.lastModified)
      ? { lastModified: validDate(route.lastModified) }
      : {}),
  }));

  const [jobs, posts] = await Promise.all([
    getPublishedJobs(),
    getPublishedPosts(),
  ]);

  const addedUrls = new Set(entries.map((entry) => entry.url));

  for (const job of jobs) {
    if (!job.slug) continue;

    const url = `${base}/careers/${job.slug}`;
    if (addedUrls.has(url)) continue;

    const lastModified = validDate(job.updatedAt || job.datePosted);

    entries.push({
      url,
      ...(lastModified ? { lastModified } : {}),
    });

    addedUrls.add(url);
  }

  for (const post of posts) {
    if (!post.slug) continue;

    const url = `${base}/blog/${post.slug}`;
    if (addedUrls.has(url)) continue;

    const lastModified = validDate(post.updatedAt || post.date);

    entries.push({
      url,
      ...(lastModified ? { lastModified } : {}),
    });

    addedUrls.add(url);
  }

  return entries;
}
