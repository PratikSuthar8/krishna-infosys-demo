"use client";

import { FormEvent, useEffect, useState } from "react";
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
  body: string[];
  published?: boolean;
};

const empty = {
  slug: "",
  title: "",
  excerpt: "",
  category: "Engineering",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min",
  bodyText: "",
  published: true,
};

export default function AdminBlogPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);

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

  const openCreate = () => {
    setEditingId(null);
    setForm({
      ...empty,
      date: new Date().toISOString().slice(0, 10),
    });
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
      bodyText: (post.body || []).join("\n\n"),
      published: post.published !== false,
    });
    setShowForm(true);
    setError("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = form.bodyText
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    // also allow single newlines as paragraphs if no double breaks
    const paragraphs =
      body.length > 0
        ? body
        : form.bodyText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);

    const payload = {
      id: editingId || undefined,
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      category: form.category,
      date: form.date,
      readTime: form.readTime,
      body: paragraphs,
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
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string, title: string) => {
    if (!confirm(`Delete post “${title}”?`)) return;
    await fetch(`/api/admin/blog?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    load();
  };

  const field =
    "w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f56616]/50";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">Blog</h1>
          <p className="mt-2 text-sm text-white/40">
            Create and publish posts shown on /blog.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#f56616] px-4 py-2.5 text-[13px] font-semibold text-white"
        >
          <Plus size={15} />
          New post
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 border border-white/10 bg-white/[0.03] p-5"
        >
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit post" : "New post"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Title *
              </span>
              <input
                required
                className={field}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Slug
              </span>
              <input
                className={field}
                placeholder="auto from title if empty"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Category
              </span>
              <input
                className={field}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Date
              </span>
              <input
                type="date"
                className={field}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Read time
              </span>
              <input
                className={field}
                value={form.readTime}
                onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Excerpt
              </span>
              <textarea
                rows={2}
                className={field}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Body (blank line between paragraphs)
              </span>
              <textarea
                rows={10}
                className={field}
                value={form.bodyText}
                onChange={(e) => setForm((f) => ({ ...f, bodyText: e.target.value }))}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={(e) =>
                  setForm((f) => ({ ...f, published: e.target.checked }))
                }
              />
              Published on website
            </label>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#f56616] px-5 py-2.5 text-[13px] font-semibold text-white disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : null}
              {editingId ? "Save changes" : "Create post"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2.5 text-[13px] text-white/50 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-white/40">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-white/40">No posts yet.</p>
      ) : (
        <div className="mt-8 space-y-3">
          {items.map((post) => (
            <article
              key={post._id}
              className="flex flex-wrap items-start justify-between gap-4 border border-white/10 bg-white/[0.03] p-5"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold">{post.title}</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                      post.published !== false
                        ? "bg-[#f56616]/15 text-[#f56616]"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {post.published !== false ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-white/45">
                  {post.category} · {post.date} · {post.readTime}
                </p>
                <p className="mt-2 max-w-[640px] text-sm text-white/55">{post.excerpt}</p>
                <p className="mt-2 text-[12px] text-white/30">/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/50 hover:text-white"
                >
                  View <ExternalLink size={12} />
                </Link>
                <button
                  type="button"
                  onClick={() => openEdit(post)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/50 hover:text-white"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(post._id, post.title)}
                  className="inline-flex items-center gap-1 rounded-full border border-red-500/30 px-3 py-1.5 text-[12px] text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
