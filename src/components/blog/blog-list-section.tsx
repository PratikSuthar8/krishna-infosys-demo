"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Newspaper } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
};

export function BlogListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.ok && Array.isArray(d.posts)) setPosts(d.posts);
        else setPosts([]);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(".blog-anim", {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, [loaded, posts.length]);

  return (
    <section ref={sectionRef} className="relative bg-[#f3f1ec] text-[#171717]">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16">
        {!loaded ? (
          <div className="blog-anim py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-black/10" />
            <p className="mt-4 text-sm text-black/35">Loading articles…</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="blog-anim mx-auto max-w-lg py-16 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm">
              <Newspaper size={26} strokeWidth={1.5} className="text-[#f56616]" />
            </div>
            <h3 className="mt-7 text-2xl font-medium tracking-[-0.03em]">
              No articles published yet
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/50">
              New field notes on ELV design, infrastructure and support will appear
              here. Check back soon, or reach out if you want a topic covered.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-2.5 text-sm font-semibold text-white! transition-opacity hover:opacity-90 hover:bg-[#f56616]"
              >
                Contact us
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#171717] transition-colors hover:border-black/20"
              >
                Explore solutions
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="blog-anim">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f56616]">
                      {post.category || "Article"}
                    </span>
                    <span className="text-[11px] text-black/35">
                      {post.readTime || ""}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] transition-colors group-hover:text-[#f56616]">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-black/50">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <div className="mt-6 flex items-center justify-between border-t border-black/[0.05] pt-4">
                    <span className="text-[11px] text-black/35">{post.date || ""}</span>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-black/55 group-hover:text-[#f56616]">
                      Read
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
