import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPosts, getBlogPost } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-[#f3f1ec] pt-[88px] text-[#171717]">
      <article className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 lg:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/50 transition-colors hover:text-[#f56616]"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-[12px]">
          <span className="font-bold uppercase tracking-[0.16em] text-[#f56616]">
            {post.category}
          </span>
          <span className="text-black/25">·</span>
          <time dateTime={post.date} className="text-black/40">
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span className="text-black/25">·</span>
          <span className="text-black/40">{post.readTime} read</span>
        </div>

        <h1 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.045em]">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-black/50">{post.excerpt}</p>

        <div className="mt-12 space-y-6 border-t border-black/10 pt-10">
          {post.body.map((para) => (
            <p key={para.slice(0, 32)} className="text-[16px] leading-8 text-black/65">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-black/10 pt-8">
          <Link
            href="/contact"
            className="text-[13px] font-semibold text-[#f56616] transition-colors hover:text-[#171717]"
          >
            Discuss a project with our team →
          </Link>
        </div>
      </article>
    </main>
  );
}
