import Link from "next/link";
import { getCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminDashboardPage() {
  const enquiries = await getCollection("enquiries");
  const applications = await getCollection("applications");
  const jobs = await getCollection("jobs");
  const posts = await getCollection("blog_posts");

  const [enquiryCount, newEnquiries, appCount, newApps, jobCount, postCount] =
    await Promise.all([
      enquiries.countDocuments(),
      enquiries.countDocuments({ status: "new" }),
      applications.countDocuments(),
      applications.countDocuments({ status: "new" }),
      jobs.countDocuments(),
      posts.countDocuments(),
    ]);

  const cards = [
    { label: "New enquiries", value: newEnquiries, href: "/admin/enquiries" },
    { label: "All enquiries", value: enquiryCount, href: "/admin/enquiries" },
    { label: "New applications", value: newApps, href: "/admin/jobs" },
    { label: "All applications", value: appCount, href: "/admin/jobs" },
    { label: "Jobs", value: jobCount, href: "/admin/jobs" },
    { label: "Blog posts", value: postCount, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Dashboard</h1>
      <p className="mt-2 text-sm text-white/40">Overview of site submissions and content.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#f56616]/40"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
              {c.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
