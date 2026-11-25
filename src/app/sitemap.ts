import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { getPublishedJobs, getPublishedPosts } from "@/lib/content";

// Cached and refreshed hourly (and immediately after admin blog/job edits).
export const revalidate = 3600;

/**
 * Real "last content change" dates. Google ignores <lastmod> when it is always
 * "now", so update a date here only when that page's content actually changes.
 */
const staticRoutes: { path: string; lastModified: string }[] = [
  { path: "", lastModified: "2026-11-25" },
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
  { path: "/terms", lastModified: "2026-08-06" },
  { path: "/privacy", lastModified: "2026-08-06" },
  { path: "/cookies", lastModified: "2026-11-05" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path || "/"}`,
    lastModified: new Date(r.lastModified),
  }));

  const [jobs, posts] = await Promise.all([getPublishedJobs(), getPublishedPosts()]);

  for (const j of jobs) {
    if (!j.slug) continue;
    const lm = j.updatedAt || j.datePosted;
    entries.push({
      url: `${base}/careers/${j.slug}`,
      ...(lm ? { lastModified: new Date(lm) } : {}),
    });
  }

  for (const p of posts) {
    if (!p.slug) continue;
    const lm = p.updatedAt || p.date;
    entries.push({
      url: `${base}/blog/${p.slug}`,
      ...(lm ? { lastModified: new Date(lm) } : {}),
    });
  }

  return entries;
}
