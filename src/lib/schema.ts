import { contact } from "@/lib/contact";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.krishnainfosys.com";

export function localBusinessSchema() {
  const lines = contact.address.operational.lines;
  const street = lines.slice(0, -1).join(", ");
  const phone = contact.phone.raw;
  const wa = (contact as { whatsapp?: { raw?: string } }).whatsapp?.raw;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Krishna Infosys",
    description:
      "ELV turnkey solutions — CCTV, access control, fire alarm, EPABX, networking and automation in Ahmedabad, Gujarat.",
    url: siteUrl,
    telephone: phone,
    email: contact.email.general,
    image: `${siteUrl}/brand/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380009",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      // approximate Navrangpura; refine in GBP if needed
      latitude: 23.033863,
      longitude: 72.558563,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:30",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:30",
        closes: "17:30",
      },
    ],
    sameAs: [
      (contact as { maps?: { href?: string } }).maps?.href,
      wa ? `https://wa.me/${wa}` : undefined,
    ].filter(Boolean),
    areaServed: {
      "@type": "City",
      name: "Ahmedabad",
    },
    priceRange: "$$",
  };
}

export function jobPostingSchema(job: {
  title: string;
  description: string;
  datePosted?: string;
  validThrough?: string;
  employmentType?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted || new Date().toISOString().slice(0, 10),
    hiringOrganization: {
      "@type": "Organization",
      name: "Krishna Infosys",
      sameAs: siteUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    employmentType: job.employmentType || "FULL_TIME",
    url: `${siteUrl}/careers/${job.slug}`,
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  date?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Krishna Infosys" },
    publisher: {
      "@type": "Organization",
      name: "Krishna Infosys",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
}


export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.krishnainfosys.com";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Krishna Infosys",
      "@id": `${siteUrl}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: opts.areaServed || "Ahmedabad",
    },
    url: `${siteUrl}${opts.path.startsWith("/") ? opts.path : `/${opts.path}`}`,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.krishnainfosys.com";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
