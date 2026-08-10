import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJob, getJobs, getCompany } from "@/lib/jobs";
import { buildMetadata } from "@/lib/seo";
import { JobDetailView } from "@/components/careers/job-detail-view";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getJobs().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.role} · Careers`,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  const company = getCompany();

  return (
    <main>
      <JobDetailView job={job} company={company} />
    </main>
  );
}
