"use client";

import { BlogRichEditor } from "@/components/admin/blog-rich-editor";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

type Post = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  body: string[] | string;
  published?: boolean;
};

type FormState = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  bodyHtml: string;
  published: boolean;
};

function bodyToEditorHtml(body: unknown): string {
  if (typeof body === "string") {
    const s = body.trim();
    if (!s) return "";
    if (s.startsWith("<")) return s;
    return s
      .split(/\n+/)
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => "<p>" + x + "</p>")
      .join("");
  }
  if (Array.isArray(body)) {
    return body
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (s.startsWith("<") ? s : "<p>" + s + "</p>"))
      .join("");
  }
  return "";
}

const empty = (): FormState => ({
  slug: "",
  title: "",
  excerpt: "",
  category: "Engineering",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min",
  bodyHtml: "",
  published: true,
});

export default function AdminBlogPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setItems(d.items);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  // Escape + lock body scroll while modal is open
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowForm(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [showForm]);

  const openCreate = () => {
    setEditingId(null);
    setForm(empty());
    setShowForm(true);
    setError("");
  };

  const openEdit = (post: Post) => {
    setEditingId(post._id);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      category: post.category || "Engineering",
      date: post.date || new Date().toISOString().slice(0, 10),
      readTime: post.readTime || "5 min",
      bodyHtml: bodyToEditorHtml(post.body),
      published: post.published !== false,
    });
    setShowForm(true);
    setError("");
  };

  const closeForm = () => setShowForm(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      id: editingId || undefined,
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      category: form.category,
      date: form.date,
      readTime: form.readTime,
      body: form.bodyHtml || "",
      published: form.published,
    };
    try {
      const res = await fetch("/api/admin/blog", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed");
      closeForm();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string, title: string) => {
    if (!confirm('Delete post "' + title + '"?')) return;
    await fetch("/api/admin/blog?id=" + encodeURIComponent(id), {
      method: "DELETE",
    });
    load();
  };

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-[#171717] outline-none focus:border-[#f56616]";

  const modal =
    showForm && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 sm:p-8">
            {/* Backdrop â€” click outside closes */}
            <button
              type="button"
              aria-label="Close dialog"
              className="absolute inset-0 bg-black/40"
              onClick={closeForm}
            />

            {/* Dialog panel is the ONLY scroll container */}
            <div
              id="blog-post-dialog"
              role="dialog"
              aria-modal="true"
              className="relative z-10 mt-2 flex max-h-[min(92vh,920px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4 sm:px-6">
                <h2 className="text-lg font-semibold tracking-[-0.03em]">
                  {editingId ? "Edit post" : "New post"}
                </h2>
                <button
                  type="button"
                  onClick={closeForm}
                  className="text-sm font-semibold text-black/40 hover:text-black"
                >
                  Close
                </button>
              </div>

              <div
                className="blog-dialog-scroll min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6"
                style={{ WebkitOverflowScrolling: "touch" }}
                onWheel={(e) => {
                  // Force scroll this panel even if a global listener tries to take the wheel
                  const el = e.currentTarget;
                  el.scrollTop += e.deltaY;
                }}
              >
                <form id="blog-post-form" onSubmit={onSubmit} className="space-y-3 pb-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-semibold text-black/40">
                        Title *
                      </label>
                      <input
                        required
                        value={form.title}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, title: e.target.value }))
                        }
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-black/40">
                        Slug *
                      </label>
                      <input
                        required
                        value={form.slug}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, slug: e.target.value }))
                        }
                        className={field}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-black/40">
                      Excerpt
                    </label>
                    <textarea
                      rows={2}
                      value={form.excerpt}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, excerpt: e.target.value }))
                      }
                      className={field}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="text-[11px] font-semibold text-black/40">
                        Category
                      </label>
                      <input
                        value={form.category}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, category: e.target.value }))
                        }
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-black/40">
                        Date
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, date: e.target.value }))
                        }
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-black/40">
                        Read time
                      </label>
                      <input
                        value={form.readTime}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, readTime: e.target.value }))
                        }
                        className={field}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-black/40">
                      Body
                    </label>
                    <BlogRichEditor
                      value={form.bodyHtml}
                      onChange={(html) =>
                        setForm((f) => ({ ...f, bodyHtml: html }))
                      }
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm text-black/70">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, published: e.target.checked }))
                      }
                    />
                    Published (visible on /blog)
                  </label>

                  {error ? <p className="text-sm text-red-600">{error}</p> : null}
                </form>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 border-t border-black/[0.06] px-5 py-3 sm:px-6">
                <button
                  type="submit"
                  form="blog-post-form"
                  disabled={saving}
                  className="rounded-full bg-[#171717] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">Blog</h1>
          <p className="mt-2 text-sm text-black/40">
            Create and publish posts shown on /blog.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          New post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-black/30" />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
          {items.length === 0 ? (
            <p className="px-5 py-14 text-center text-sm text-black/40">
              No posts yet.
            </p>
          ) : (
            <ul className="divide-y divide-black/[0.06]">
              {items.map((post) => (
                <li
                  key={post._id}
                  className="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:px-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold">{post.title}</p>
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase " +
                          (post.published !== false
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-black/5 text-black/45")
                        }
                      >
                        {post.published !== false ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-black/40">
                      {post.category} Â· {post.date} Â· /blog/{post.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      href={"/blog/" + post.slug}
                      target="_blank"
                      className="rounded-lg p-2 text-black/35 hover:bg-black/[0.04] hover:text-black"
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => openEdit(post)}
                      className="rounded-lg p-2 text-black/35 hover:bg-black/[0.04] hover:text-black"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(post._id, post.title)}
                      className="rounded-lg p-2 text-black/35 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {modal}
    </div>
  );
}
