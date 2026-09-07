"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
};

export function BlogListSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && Array.isArray(d.posts)) setPosts(d.posts);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section className="bg-[#f3f1ec] pb-24 pt-10 sm:pb-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        {!loaded ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl bg-black/[0.04]"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-black/[0.06] bg-white px-6 py-20 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-[#faf9f7] text-[#f56616]">
              <Newspaper size={22} />
            </span>
            <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
              No articles published yet
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-black/45">
              New field notes on ELV design, infrastructure and support will
              appear here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#171717] px-5 py-2.5 text-[13px] font-semibold text-white"
              >
                Contact us
              </Link>
              <Link
                href="/solutions"
                className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-[13px] font-semibold"
              >
                Explore solutions
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={"/blog/" + post.slug}
                className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f56616]">
                    {post.category || "Article"}
                  </span>
                  {post.readTime ? (
                    <span className="text-[11px] text-black/35">{post.readTime}</span>
                  ) : null}
                </div>
                <h2 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.03em] text-[#171717] transition-colors group-hover:text-[#f56616]">
                  {post.title}
                </h2>
                {post.excerpt ? (
                  <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-6 text-black/45">
                    {post.excerpt}
                  </p>
                ) : (
                  <div className="flex-1" />
                )}
                <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
                  <span className="text-[12px] text-black/35">{post.date || ""}</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-black/50 transition-colors group-hover:text-[#f56616]">
                    Read
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
