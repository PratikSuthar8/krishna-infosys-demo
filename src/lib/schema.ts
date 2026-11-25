import { contact } from "@/lib/contact";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.krishnainfosys.com";

/**
 * One linked graph for the whole site: Organization + LocalBusiness + WebSite.
 * Rendered once in app/layout.tsx. Other schemas reference these by @id.
 */
export function siteGraphSchema() {
  const lines = contact.address.operational.lines;
  const street = lines.slice(0, -1).join(", ");
  const orgId = `${siteUrl}/#organization`;
  const businessId = `${siteUrl}/#business`;
  const sameAs = [contact.social.instagram, contact.maps.href].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Krishna Infosys",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon.png`,
          width: 512,
          height: 512,
        },
        description:
          "ISO 9001:2015 ELV systems integrator in Ahmedabad: CCTV, fire alarm, access control, EPABX, PA, AV, networking and automation — design, installation and AMC since 2001.",
        foundingDate: "2001",
        email: contact.email.general,
        telephone: contact.phone.raw,
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          postalCode: "380009",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: contact.phone.raw,
            email: contact.email.sales,
            areaServed: "IN",
            availableLanguage: ["en", "gu", "hi"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: `+${contact.whatsapp.raw}`,
            email: contact.email.support,
            areaServed: "IN",
            availableLanguage: ["en", "gu", "hi"],
          },
        ],
        sameAs,
      },
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: "Krishna Infosys",
        parentOrganization: { "@id": orgId },
        description:
          "CCTV installation, fire alarm systems, access control, EPABX/intercom, PA systems, structured cabling and ELV AMC in Ahmedabad, Gujarat.",
        url: siteUrl,
        telephone: contact.phone.raw,
        email: contact.email.general,
        image: `${siteUrl}/og-default.png`,
        logo: `${siteUrl}/icon.png`,
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
          // approximate Navrangpura; refine to the exact pin from Google Business Profile
          latitude: 23.033863,
          longitude: 72.558563,
        },
        hasMap: contact.maps.href,
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
        areaServed: [
          { "@type": "City", name: "Ahmedabad" },
          { "@type": "City", name: "Gandhinagar" },
          { "@type": "State", name: "Gujarat" },
          { "@type": "Country", name: "India" },
        ],
        knowsAbout: [
          "CCTV installation",
          "IP surveillance",
          "Fire alarm systems",
          "Access control systems",
          "EPABX and intercom",
          "Public address systems",
          "Video conferencing",
          "Structured cabling",
          "Boom barriers and gate automation",
          "Home automation",
          "ELV annual maintenance contracts",
        ],
        priceRange: "₹₹",
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Krishna Infosys",
        alternateName: ["Krishna Infosys Ahmedabad", "krishnainfosys.com"],
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function jobPostingSchema(job: {
  title: string;
  description: string;
  /** Full description as simple HTML; preferred over `description` */
  html?: string;
  datePosted?: string;
  validThrough?: string;
  employmentType?: string;
  location?: string;
  experience?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.html || `<p>${job.description}</p>`,
    // Real posting date only. Never default to "today": Google treats
    // constantly-new dates as a spam signal for job listings.
    ...(job.datePosted ? { datePosted: job.datePosted } : {}),
    ...(job.validThrough ? { validThrough: job.validThrough } : {}),
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Krishna Infosys",
      sameAs: siteUrl,
      logo: `${siteUrl}/icon.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address.operational.lines.slice(0, -1).join(", "),
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380009",
        addressCountry: "IN",
      },
    },
    employmentType: job.employmentType || "FULL_TIME",
    ...(job.experience
      ? {
          experienceRequirements: {
            "@type": "OccupationalExperienceRequirements",
            description: job.experience,
          },
        }
      : {}),
    directApply: true,
    url: `${siteUrl}/careers/${job.slug}`,
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  date?: string;
  updated?: string;
  author?: string;
  image?: string;
  slug: string;
}) {
  const image = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${siteUrl}${post.image.startsWith("/") ? "" : "/"}${post.image}`
    : `${siteUrl}/og-default.png`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [image],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: post.author
      ? { "@type": "Person", name: post.author, worksFor: { "@id": `${siteUrl}/#organization` } }
      : { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Krishna Infosys" },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    inLanguage: "en-IN",
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
