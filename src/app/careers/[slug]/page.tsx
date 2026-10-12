export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob, getCompany } from "@/lib/jobs";
import { buildMetadata } from "@/lib/seo";
import { JobDetailView } from "@/components/careers/job-detail-view";
import { JsonLd } from "@/components/seo/json-ld";
import { jobPostingSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
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
  const job = getJob(slug);
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
        data={jobPostingSchema({
          title: job.role,
          description,
          slug: job.slug,
          employmentType: "FULL_TIME",
        })}
      />
      <JobDetailView job={job} company={company} />
    </main>
  );
}
