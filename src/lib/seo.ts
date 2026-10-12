export const siteConfig = {
  name: "Krishna Infosys",
  legalName: "Krishna Infosys",
  tagline: "CCTV, Fire Alarm & ELV Systems in Ahmedabad",
  description:
    "CCTV, access control, fire alarm, EPABX, networking and automation systems in Ahmedabad. Design, installation, commissioning and AMC from Krishna Infosys.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.krishnainfosys.com",
  ogImage: "/og-default.png",
  locale: "en_IN",
  phone: "+917940304848",
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

/** Append brand only if not already in the title */
export function withBrand(title: string) {
  const brand = siteConfig.name;
  if (title.toLowerCase().includes(brand.toLowerCase())) return title;
  return title + " | " + brand;
}

export function buildMetadata(page: PageSeo) {
  const title = withBrand(page.title);
  const description = page.description;
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(page.image ?? siteConfig.ogImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
      ...(siteConfig.twitter ? { creator: siteConfig.twitter } : {}),
    },
    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
