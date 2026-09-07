"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Newspaper, MessageSquare, ArrowUpRight } from "lucide-react";

type Counts = {
  jobs: number;
  posts: number;
  enquiries: number;
  applications: number;
};

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({
    jobs: 0,
    posts: 0,
    enquiries: 0,
    applications: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/jobs").then((r) => r.json()).catch(() => null),
      fetch("/api/admin/blog").then((r) => r.json()).catch(() => null),
      fetch("/api/admin/enquiries").then((r) => r.json()).catch(() => null),
      fetch("/api/admin/applications").then((r) => r.json()).catch(() => null),
    ]).then(([jobs, blog, enquiries, applications]) => {
      setCounts({
        jobs: Array.isArray(jobs?.items) ? jobs.items.length : 0,
        posts: Array.isArray(blog?.items) ? blog.items.length : 0,
        enquiries: Array.isArray(enquiries?.items) ? enquiries.items.length : 0,
        applications: Array.isArray(applications?.items)
          ? applications.items.length
          : 0,
      });
    });
  }, []);

  const cards = [
    {
      label: "Open roles",
      value: counts.jobs,
      href: "/admin/jobs",
      icon: Briefcase,
    },
    {
      label: "Blog posts",
      value: counts.posts,
      href: "/admin/blog",
      icon: Newspaper,
    },
    {
      label: "Enquiries",
      value: counts.enquiries,
      href: "/admin/enquiries",
      icon: MessageSquare,
    },
    {
      label: "Applications",
      value: counts.applications,
      href: "/admin/jobs",
      icon: Briefcase,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
          Overview
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
          Manage jobs, blog posts and inbound contact from one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f56616]/10 text-[#f56616]">
                  <Icon size={18} />
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-black/25 transition-colors group-hover:text-[#f56616]"
                />
              </div>
              <p className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-black/45">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
