export const siteConfig = {
	name: "Krishna Infosys",
	legalName: "Krishna Infosys",
	tagline: "ELV Turnkey Solutions",
	description:
		"Integrated ELV solutions across security, communication, AV, networking and automation — design, execution and AMC support pan-India from Ahmedabad.",
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.krishnainfosys.com",
	ogImage: "/og-default.png",
	locale: "en_IN",
	phone: "+917940309999",
	email: "info@krishnainfosys.com",
	address: {
		city: "Ahmedabad",
		region: "Gujarat",
		country: "IN",
	},
	twitter: "",
};

export type PageSeo = {
	title: string;
	description: string;
	path: string;
	image?: string;
	noIndex?: boolean;
};

export function absoluteUrl(path: string) {
	const base = siteConfig.url.replace(/\/$/, "");
	const p = path.startsWith("/") ? path : `/${path}`;
	return `${base}${p}`;
}

export function buildMetadata(page: PageSeo) {
	const isHome = page.path === "/";
	const title = isHome ? `${siteConfig.name} | ${siteConfig.tagline}` : page.title;

	const description = page.description;
	const url = absoluteUrl(page.path);
	const image = absoluteUrl(page.image ?? siteConfig.ogImage);

	return {
		title,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			type: "website" as const,
			locale: siteConfig.locale,
			url,
			siteName: siteConfig.name,
			title: isHome ? title : `${page.title} | ${siteConfig.name}`,
			description,
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: page.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image" as const,
			title: isHome ? title : `${page.title} | ${siteConfig.name}`,
			description,
			images: [image],
			...(siteConfig.twitter ? { creator: siteConfig.twitter } : {}),
		},
		robots: page.noIndex ? { index: false, follow: false } : { index: true, follow: true },
	};
}
