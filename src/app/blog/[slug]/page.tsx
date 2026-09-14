export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getCollection } from "@/lib/mongodb";
import { buildMetadata } from "@/lib/seo";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
  body?: string | string[];
  published?: boolean;
};

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string): Promise<Post | null> {
  try {
    const col = await getCollection("blog_posts");
    const post = await col.findOne({
      slug,
      $or: [
        { published: true },
        { published: { $exists: false } },
        { published: null },
      ],
    });
    if (!post) return null;
    const { _id, ...rest } = post as Post & { _id: unknown };
    return rest as Post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt || post.title,
    path: `/blog/${post.slug}`,
  });
}

function isHtmlBody(body: unknown): body is string {
  return typeof body === "string" && body.trim().startsWith("<");
}

function toParagraphs(body: unknown): string[] {
  if (Array.isArray(body)) return body.map(String).filter(Boolean);
  if (typeof body === "string" && !body.trim().startsWith("<")) {
    return body
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function isHeading(block: string) {
  const t = block.trim();
  if (t.length > 90) return false;
  if (/[.!?]$/.test(t)) return false;
  return t.length > 0 && t.length < 80;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const paragraphs = toParagraphs(post.body);
  const html = isHtmlBody(post.body) ? post.body : null;

  return (
    <main className="bg-[#f3f1ec] pt-[88px] text-[#171717]">
      <article className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 lg:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/45 transition hover:text-[#171717]"
        >
          <ArrowLeft size={14} />
          All articles
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/35">
          {post.category ? <span>{post.category}</span> : null}
          {post.date ? <span>{post.date}</span> : null}
          {post.readTime ? <span>{post.readTime}</span> : null}
        </div>

        <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.04em] leading-[1.12]">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mt-5 text-[16px] leading-7 text-black/50 sm:text-[17px] sm:leading-8">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-10 border-t border-black/[0.08] pt-10">
          {html ? (
            <div
              className="blog-article-body text-[15px] leading-8 text-[#3a3a3a] sm:text-[16px]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : paragraphs.length === 0 ? (
            <p className="text-[15px] leading-7 text-black/45">
              No content for this article yet.
            </p>
          ) : (
            <div className="space-y-6">
              {paragraphs.map((block, i) =>
                isHeading(block) ? (
                  <h2
                    key={i}
                    className="pt-2 text-[1.15rem] font-semibold tracking-[-0.03em] text-[#171717] sm:text-[1.25rem]"
                  >
                    {block}
                  </h2>
                ) : (
                  <p
                    key={i}
                    className="whitespace-pre-line text-[15px] leading-8 text-[#3a3a3a] sm:text-[16px]"
                  >
                    {block}
                  </p>
                ),
              )}
            </div>
          )}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] pt-8">
          <Link
            href="/blog"
            className="text-[13px] font-semibold text-black/45 transition hover:text-[#171717]"
          >
            More articles
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-2.5 text-[13px] font-semibold text-white! hover:bg-[#f56620] transition-colors duration-300"
          >
            Discuss a project
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </article>

      {/* Public article typography for TipTap HTML */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
.blog-article-body h1 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #171717;
  margin: 1.5rem 0 0.75rem;
}
.blog-article-body h2 {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: #171717;
  margin: 1.35rem 0 0.6rem;
}
.blog-article-body h3 {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.3;
  color: #171717;
  margin: 1.15rem 0 0.5rem;
}
.blog-article-body p {
  margin: 0 0 1rem;
  line-height: 1.75;
}
.blog-article-body ul {
  list-style: disc;
  padding-left: 1.35rem;
  margin: 0 0 1rem;
}
.blog-article-body ol {
  list-style: decimal;
  padding-left: 1.35rem;
  margin: 0 0 1rem;
}
.blog-article-body li {
  margin: 0.35rem 0;
  line-height: 1.7;
}
.blog-article-body blockquote {
  border-left: 3px solid #f56616;
  padding-left: 1rem;
  color: #555;
  margin: 1rem 0;
}
.blog-article-body a {
  color: #f56616;
  text-decoration: underline;
}
.blog-article-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}
.blog-article-body th,
.blog-article-body td {
  border: 1px solid rgba(0,0,0,0.12);
  padding: 0.5rem 0.75rem;
  text-align: left;
}
.blog-article-body th {
  background: rgba(0,0,0,0.04);
  font-weight: 600;
}
.blog-article-body strong { font-weight: 700; color: #171717; }
.blog-article-body em { font-style: italic; }
`,
        }}
      />
    </main>
  );
}
