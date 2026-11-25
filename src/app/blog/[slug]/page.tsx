import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPublishedPost, getPublishedPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";


type Props = { params: Promise<{ slug: string }> };

// Pages are generated once, cached, and refreshed hourly (or immediately when
// a post is saved in the admin console via revalidatePath).
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

const getPost = getPublishedPost;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt || post.title,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
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
  // The page title is the only <h1>; demote any h1 typed in the editor body.
  const html = isHtmlBody(post.body)
    ? post.body.replace(/<h1(\s|>)/gi, "<h2$1").replace(/<\/h1>/gi, "</h2>")
    : null;

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt || post.title,
          date: post.date,
          updated: post.updatedAt,
          author: post.author,
          image: post.image,
          slug: post.slug,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <main className="bg-[#f3f1ec] pt-[88px] text-[#171717]">
      <article className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 lg:py-24">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-black/45 transition hover:text-[#171717]"
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

    </main>
    </>
  );
}
