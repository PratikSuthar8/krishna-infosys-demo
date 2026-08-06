import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const routes = [
	"/",
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
	"/terms",
	"/privacy",
	"/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const base = siteConfig.url.replace(/\/$/, "");
	const lastModified = new Date();

	return routes.map((path) => ({
		url: path === "/" ? base : `${base}${path}`,
		lastModified,
		changeFrequency: path === "/" ? "weekly" : "monthly",
		priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.7,
	}));
}
