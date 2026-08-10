import jobsData from "@/data/jobs.json";

export type Job = (typeof jobsData.jobs)[number];
export type JobsFile = typeof jobsData;

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Server-side: prefer Mongo API, fall back to local JSON. */
export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${base}/api/jobs`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.jobs)) return data.jobs as Job[];
    }
  } catch {
    /* fall through */
  }
  return jobsData.jobs as Job[];
}

export async function fetchJob(slug: string): Promise<Job | undefined> {
  try {
    const res = await fetch(`${base}/api/jobs/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.job) return data.job as Job;
    }
  } catch {
    /* fall through */
  }
  return jobsData.jobs.find((j) => j.slug === slug);
}

export async function fetchCompany() {
  try {
    const res = await fetch(`${base}/api/company`, { next: { revalidate: 120 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.company) return data.company;
    }
  } catch {
    /* fall through */
  }
  return jobsData.company;
}

/** Sync helpers for client components that still import JSON path */
export function getJobs(): Job[] {
  return jobsData.jobs as Job[];
}

export function getJob(slug: string): Job | undefined {
  return jobsData.jobs.find((j) => j.slug === slug);
}

export function getCompany() {
  return jobsData.company;
}
