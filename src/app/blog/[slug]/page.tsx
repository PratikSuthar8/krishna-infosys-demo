import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCollection } from "@/lib/mongodb";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
  body?: string[] | string;
};

function isHeading(block: string) {
  const t = block.trim();
  if (t.length === 0 || t.length > 90) return false;
  if (t.includes("\n")) return false;
  if (/[.!?]$/.test(t)) return false;
  return true;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const col = await getCollection("blog_posts");
    const post = await col.findOne(
      {
        slug,
        $or: [
          { published: true },
          { published: { $exists: false } },
          { published: null },
        ],
      },
      { projection: { _id: 0 } },
    );
    return post ? (post as unknown as Post) : null;
  } catch {
    return null;
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return buildMetadata({
      title: "Article",
      description: "Blog article",
      path: "/blog/" + slug,
    });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt || post.title,
    path: "/blog/" + post.slug,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const paragraphs = Array.isArray(post.body) ? post.body : typeof post.body === "string" && !post.body.trim().startsWith("<") ? post.body.split("\n").filter(Boolean) : [];

  return (
    <main className="bg-[#f3f1ec] text-[#171717]">
      <div className="border-b border-black/[0.06] pt-[100px] sm:pt-[112px]">
        <div className="mx-auto max-w-[720px] px-5 pb-12 sm:px-8 sm:pb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-semibold text-black/40 transition-colors hover:text-[#171717]"
          >
            <ArrowLeft size={14} />
            All posts
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
            {post.category ? (
              <span className="text-[#f56616]">{post.category}</span>
            ) : null}
            {post.date ? (
              <span className="font-medium normal-case tracking-normal text-black/35">
                {post.date}
              </span>
            ) : null}
            {post.readTime ? (
              <span className="font-medium normal-case tracking-normal text-black/35">
                {post.readTime} read
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.045em]">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-5 text-[16px] leading-7 text-black/50 sm:text-lg sm:leading-8">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </div>

      <article className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16">
        {typeof post.body === "string" && post.body.trim().startsWith("<") ? (
          <div
            className="prose prose-neutral max-w-none text-[15px] leading-8 text-[#3a3a3a] sm:text-[16px]
              prose-headings:tracking-[-0.03em] prose-headings:text-[#171717]
              prose-a:text-[#f56616] prose-table:w-full
              prose-th:border prose-th:border-black/15 prose-th:bg-black/[0.03] prose-th:px-3 prose-th:py-2
              prose-td:border prose-td:border-black/15 prose-td:px-3 prose-td:py-2"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        ) : (
          <div className="space-y-6">
            {paragraphs.length === 0 ? (
              <p className="text-[15px] leading-7 text-black/45">
                No content for this article yet.
              </p>
            ) : (
              paragraphs.map((block, i) =>
                isHeading(block) ? (
                  <h2
                    key={i}
                    className="pt-4 text-[1.15rem] font-semibold tracking-[-0.03em] text-[#171717] sm:text-[1.25rem]"
                  >
                    {block}
                  </h2>
                ) : (
                  <p
                    key={i}
                    className="whitespace-pre-line text-[15px] leading-8 text-[#3a3a3a] sm:text-[16px] sm:leading-8"
                  >
                    {block}
                  </p>
                ),
              )
            )}
          </div>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] pt-8">
          <Link
            href="/blog"
            className="text-[13px] font-semibold text-black/45 transition-colors hover:text-[#171717]"
          >
            More articles
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-[#171717] px-5 py-2.5 text-[13px] font-semibold text-white!"
          >
            Discuss a project
          </Link>
        </div>
      </article>
    </main>
  );
}
