import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { getCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const staticRoutes = [
  "",
  "/about",
  "/solutions",
  "/solutions/security-access",
  "/solutions/communication",
  "/solutions/audio-visual",
  "/solutions/networking-data",
  "/solutions/automation-safety",
  "/industries",
  "/projects",
  "/amc-support",
  "/contact",
  "/careers",
  "/blog",
  "/terms",
  "/privacy",
  "/cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));

  try {
    const jobs = await getCollection("jobs");
    const jobDocs = await jobs
      .find({ $or: [{ published: true }, { published: { $exists: false } }] })
      .project({ slug: 1, updatedAt: 1 })
      .toArray();
    for (const j of jobDocs) {
      if (!j.slug) continue;
      entries.push({
        url: `${base}/careers/${j.slug}`,
        lastModified: j.updatedAt ? new Date(j.updatedAt) : now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  } catch {
    // DB unavailable — return static routes only
  }

  try {
    const posts = await getCollection("blog_posts");
    const postDocs = await posts
      .find({})
      .project({ slug: 1, date: 1, updatedAt: 1 })
      .toArray();
    for (const p of postDocs) {
      if (!p.slug) continue;
      entries.push({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updatedAt
          ? new Date(p.updatedAt)
          : p.date
            ? new Date(p.date)
            : now,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  } catch {
    // ignore
  }

  return entries;
}
