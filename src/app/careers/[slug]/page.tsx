import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompany } from "@/lib/jobs";
import { getPublishedJob, getPublishedJobs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { JobDetailView } from "@/components/careers/job-detail-view";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, jobPostingSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

// Same source as the careers list and sitemap (MongoDB, JSON fallback), so a
// job added in the admin console gets a working page. Cached, refreshed hourly.
export const revalidate = 3600;

export async function generateStaticParams() {
  const jobs = await getPublishedJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.role} Jobs in Ahmedabad`,
    description:
      job.summary ||
      `${job.role} opening at Krishna Infosys, Ahmedabad. Apply online.`,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) notFound();
  const company = getCompany();

  const description =
    job.summary ||
    (Array.isArray(job.description)
      ? job.description.join(" ")
      : String(job.description || job.role));

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.role, path: `/careers/${job.slug}` },
        ])}
      />
      <JsonLd
        data={jobPostingSchema({
          title: job.role,
          description,
          slug: job.slug,
          employmentType: "FULL_TIME",
          datePosted: job.datePosted,
          validThrough: job.validThrough,
          location: job.location,
          experience: job.experience,
          html: [
            ...(Array.isArray(job.description) ? job.description : [job.description]),
            ...(Array.isArray((job as { responsibilities?: string[] }).responsibilities)
              ? (job as { responsibilities?: string[] }).responsibilities!
              : []),
            ...(Array.isArray((job as { requirements?: string[] }).requirements)
              ? (job as { requirements?: string[] }).requirements!
              : []),
          ]
            .filter(Boolean)
            .map((t) => `<p>${String(t)}</p>`)
            .join(""),
        })}
      />
      <JobDetailView job={job} company={company} />
    </main>
  );
}
