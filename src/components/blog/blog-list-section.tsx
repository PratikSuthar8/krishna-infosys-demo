"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

export function BlogListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState(getBlogPosts());

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && Array.isArray(d.posts)) setPosts(d.posts);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 32, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f3f1ec] pb-20 text-[#171717] lg:pb-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group flex flex-col border border-black/[0.08] bg-white p-6 transition-colors hover:border-[#f56616]/40 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f56616]">
                  {post.category}
                </span>
                <span className="text-[12px] text-black/35">{post.readTime}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-[#f56616]">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-black/50">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                <time className="text-[12px] text-black/40" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-black/55 transition-colors group-hover:text-[#f56616]">
                  Read
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
