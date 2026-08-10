"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Download,
  Eye,
} from "lucide-react";

type Job = {
  _id: string;
  slug: string;
  role: string;
  department: string;
  experience: string;
  location: string;
  type: string;
  summary: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  published?: boolean;
};

type Application = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  jobSlug?: string;
  jobRole?: string;
  message?: string;
  linkedin?: string;
  status: string;
  createdAt: string;
  resume?: {
    originalName: string;
    storedName: string;
    mimeType: string;
    size: number;
  } | null;
};

type Mode = "list" | "view" | "edit" | "create";

const emptyForm = {
  slug: "",
  role: "",
  department: "",
  experience: "",
  location: "Ahmedabad",
  type: "Full-time",
  summary: "",
  descriptionText: "",
  responsibilitiesText: "",
  requirementsText: "",
  published: true,
};

function linesToText(arr?: string[]) {
  return (arr || []).join("\n");
}
function textToLines(v: string) {
  return v.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function AdminJobsPage() {
  const [items, setItems] = useState<Job[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<Mode>("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const active = useMemo(
    () => items.find((j) => j._id === activeId) || null,
    [items, activeId]
  );

  const jobApps = useMemo(() => {
    if (!active) return [];
    return apps.filter((a) => a.jobSlug === active.slug);
  }, [apps, active]);

  const load = async () => {
    setLoading(true);
    try {
      const [jRes, aRes] = await Promise.all([
        fetch("/api/admin/jobs"),
        fetch("/api/admin/applications"),
      ]);
      const j = await jRes.json();
      const a = await aRes.json();
      if (j.ok) setItems(j.items);
      if (a.ok) setApps(a.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setActiveId(null);
    setForm(emptyForm);
    setMode("create");
    setError("");
  };

  const openView = (job: Job) => {
    setActiveId(job._id);
    setMode("view");
    setError("");
  };

  const openEdit = (job: Job) => {
    setActiveId(job._id);
    setForm({
      slug: job.slug,
      role: job.role,
      department: job.department || "",
      experience: job.experience || "",
      location: job.location || "",
      type: job.type || "Full-time",
      summary: job.summary || "",
      descriptionText: linesToText(job.description),
      responsibilitiesText: linesToText(job.responsibilities),
      requirementsText: linesToText(job.requirements),
      published: job.published !== false,
    });
    setMode("edit");
    setError("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      id: mode === "edit" ? activeId : undefined,
      slug: form.slug,
      role: form.role,
      department: form.department,
      experience: form.experience,
      location: form.location,
      type: form.type,
      summary: form.summary,
      description: textToLines(form.descriptionText),
      responsibilities: textToLines(form.responsibilitiesText),
      requirements: textToLines(form.requirementsText),
      published: form.published,
    };
    try {
      const res = await fetch("/api/admin/jobs", {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed");
      await load();
      if (mode === "create" && data.id) {
        setActiveId(data.id);
        setMode("view");
      } else {
        setMode("view");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string, role: string) => {
    if (!confirm(`Delete job “${role}”?`)) return;
    await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setMode("list");
    setActiveId(null);
    load();
  };

  const setAppStatus = async (id: string, status: string) => {
    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  const field =
    "w-full border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f56616]/50";

  if (loading && items.length === 0) {
    return <p className="text-sm text-white/40">Loading…</p>;
  }

  // LIST
  if (mode === "list") {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.03em]">Jobs</h1>
            <p className="mt-2 text-sm text-white/40">
              Manage openings and review applicants in one place.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#f56616] px-4 py-2.5 text-[13px] font-semibold text-white"
          >
            <Plus size={15} />
            New job
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {items.map((job) => {
            const count = apps.filter((a) => a.jobSlug === job.slug).length;
            return (
              <article
                key={job._id}
                className="flex flex-wrap items-start justify-between gap-4 border border-white/10 bg-white/[0.03] p-5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold">{job.role}</h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                        job.published !== false
                          ? "bg-[#f56616]/15 text-[#f56616]"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {job.published !== false ? "Published" : "Draft"}
                    </span>
                    <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/40">
                      {count} applicant{count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-white/45">
                    {job.department} · {job.location} · {job.experience}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openView(job)}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/50 hover:text-white"
                  >
                    <Eye size={12} /> Open
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(job)}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/50 hover:text-white"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // CREATE / EDIT form
  if (mode === "create" || mode === "edit") {
    return (
      <div>
        <button
          type="button"
          onClick={() => (activeId ? setMode("view") : setMode("list"))}
          className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <h1 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
          {mode === "create" ? "New job" : "Edit job"}
        </h1>
        <form onSubmit={onSubmit} className="mt-6 max-w-3xl space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Role *
              </span>
              <input
                required
                className={field}
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Slug
              </span>
              <input
                className={field}
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Department
              </span>
              <input
                className={field}
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Experience
              </span>
              <input
                className={field}
                value={form.experience}
                onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Location
              </span>
              <input
                className={field}
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Type
              </span>
              <input
                className={field}
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Summary
              </span>
              <textarea
                rows={2}
                className={field}
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Description (one paragraph per line)
              </span>
              <textarea
                rows={4}
                className={field}
                value={form.descriptionText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descriptionText: e.target.value }))
                }
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Responsibilities (one per line)
              </span>
              <textarea
                rows={4}
                className={field}
                value={form.responsibilitiesText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, responsibilitiesText: e.target.value }))
                }
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/35">
                Requirements (one per line)
              </span>
              <textarea
                rows={4}
                className={field}
                value={form.requirementsText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, requirementsText: e.target.value }))
                }
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
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#f56616] px-5 py-2.5 text-[13px] font-semibold text-white disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : null}
              Save
            </button>
            <button
              type="button"
              onClick={() => (activeId ? setMode("view") : setMode("list"))}
              className="text-[13px] text-white/50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // VIEW + APPLICANTS
  if (!active) {
    return (
      <button type="button" onClick={() => setMode("list")} className="text-white/50">
        Back to list
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setMode("list")}
        className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white"
      >
        <ArrowLeft size={14} /> All jobs
      </button>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-[-0.03em]">{active.role}</h1>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                active.published !== false
                  ? "bg-[#f56616]/15 text-[#f56616]"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {active.published !== false ? "Published" : "Draft"}
            </span>
          </div>
          <p className="mt-2 text-sm text-white/45">
            {active.department} · {active.experience} · {active.location} · {active.type}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => openEdit(active)}
            className="inline-flex items-center gap-1 border border-white/15 px-3 py-2 text-[12px] text-white/60 hover:text-white"
          >
            <Pencil size={12} /> Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(active._id, active.role)}
            className="inline-flex items-center gap-1 border border-red-500/30 px-3 py-2 text-[12px] text-red-400"
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 border border-white/10 bg-white/[0.03] p-5">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
              Summary
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/65">{active.summary}</p>
          </div>
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
              Description
            </h2>
            <div className="mt-2 space-y-2">
              {(active.description || []).map((p) => (
                <p key={p.slice(0, 24)} className="text-sm leading-6 text-white/60">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
              Responsibilities
            </h2>
            <ul className="mt-2 space-y-1.5">
              {(active.responsibilities || []).map((r) => (
                <li key={r} className="text-sm text-white/60">
                  · {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
              Requirements
            </h2>
            <ul className="mt-2 space-y-1.5">
              {(active.requirements || []).map((r) => (
                <li key={r} className="text-sm text-white/60">
                  · {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em]">
            Applicants ({jobApps.length})
          </h2>
          {jobApps.length === 0 ? (
            <p className="mt-4 text-sm text-white/40">No applications for this role yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {jobApps.map((app) => (
                <article
                  key={app._id}
                  className="border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">{app.name}</p>
                      <p className="mt-1 text-[12px] text-white/45">
                        {app.email} · {app.phone}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase text-white/40">
                      {app.status}
                    </span>
                  </div>
                  {app.message ? (
                    <p className="mt-2 text-[13px] leading-5 text-white/55">{app.message}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {app.resume?.storedName ? (
                      <a
                        href={`/api/admin/resumes/${app.resume.storedName}`}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#f56616]"
                      >
                        <Download size={12} />
                        {app.resume.originalName || "Resume"}
                      </a>
                    ) : (
                      <span className="text-[12px] text-white/30">No resume</span>
                    )}
                    {app.linkedin ? (
                      <a
                        href={app.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[12px] text-white/40 hover:text-white"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {app.status === "new" && (
                      <button
                        type="button"
                        onClick={() => setAppStatus(app._id, "reviewing")}
                        className="text-[11px] font-semibold text-[#f56616]"
                      >
                        Mark reviewing
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setAppStatus(app._id, "closed")}
                      className="text-[11px] font-semibold text-white/35 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
