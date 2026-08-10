import jobsData from "@/data/jobs.json";

export type Job = (typeof jobsData.jobs)[number];
export type JobsFile = typeof jobsData;

/** Today: local JSON. Later: fetch from your backend and keep these helpers. */
export function getJobsFile(): JobsFile {
  return jobsData;
}

export function getJobs(): Job[] {
  return jobsData.jobs;
}

export function getJob(slug: string): Job | undefined {
  return jobsData.jobs.find((j) => j.slug === slug);
}

export function getCompany() {
  return jobsData.company;
}
