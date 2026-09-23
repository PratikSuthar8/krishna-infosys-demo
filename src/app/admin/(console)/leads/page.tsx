"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Plus,
  Search,
  X,
  Trash2,
  Phone,
  Mail,
  Building2,
  LayoutGrid,
  List,
} from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/crm";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  interest: "",
  message: "",
  source: "manual",
  status: "new" as LeadStatus,
};

export default function AdminLeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"board" | "list">("board");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; label: string } | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch("/api/admin/leads?" + params.toString());
      const d = await res.json();
      if (d.ok && Array.isArray(d.items)) setItems(d.items);
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const s of LEAD_STATUSES) c[s.id] = 0;
    for (const i of items) c[i.status] = (c[i.status] || 0) + 1;
    return c;
  }, [items]);

  const visible = useMemo(() => {
    if (statusFilter === "all") return items;
    return items.filter((i) => i.status === statusFilter);
  }, [items, statusFilter]);

  const byStatus = useMemo(() => {
    const map: Record<string, Lead[]> = {};
    for (const s of LEAD_STATUSES) map[s.id] = [];
    for (const lead of items) {
      if (!map[lead.status]) map[lead.status] = [];
      map[lead.status].push(lead);
    }
    return map;
  }, [items]);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (!d.ok) {
        setError(d.error || "Failed");
        return;
      }
      setShowNew(false);
      setForm(emptyForm);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    setItems((prev) =>
      prev.map((l) => (l._id === id ? { ...l, status } : l)),
    );
    if (selected?._id === id) {
      setSelected((s) => (s ? { ...s, status } : s));
    }
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  };

  const patchLead = async (payload: Record<string, unknown>) => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected._id, ...payload }),
      });
      const d = await res.json();
      if (d.ok) {
        setNote("");
        await load();
        const res2 = await fetch("/api/admin/leads");
        const d2 = await res2.json();
        if (d2.ok) {
          const next = d2.items.find((x: Lead) => x._id === selected._id);
          if (next) setSelected(next);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (selected?._id === id) setSelected(null);
    await load();
  };

  return (
    <div
      className={
        view === "board"
          ? "flex h-full min-h-0 flex-1 flex-col"
          : "pb-4"
      }
    >
      <div className="mb-2 flex shrink-0 flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f56616]">
            CRM
          </p>
          <h1 className="mt-0.5 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
            Leads
          </h1>
          <p className="mt-0.5 hidden text-[12px] text-black/40 sm:block">
            Drag cards across the pipeline.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full border border-black/10 bg-white p-1">
            <button
              type="button"
              onClick={() => setView("board")}
              className={
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold " +
                (view === "board" ? "bg-[#171717] text-white" : "text-black/50")
              }
            >
              <LayoutGrid size={14} />
              Board
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold " +
                (view === "list" ? "bg-[#171717] text-white" : "text-black/50")
              }
            >
              <List size={14} />
              List
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            Add lead
          </button>
        </div>
      </div>

      <div className="mb-2 flex h-9 shrink-0 items-center gap-2 rounded-lg border border-black/10 bg-white px-3">
        <Search size={16} className="text-black/35" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, company, phone..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-black/30"
        />
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <Loader2 className="animate-spin text-black/30" />
        </div>
      ) : view === "board" ? (
        <div className="flex min-h-0 flex-1 gap-0 overflow-x-auto overflow-y-hidden border-t border-black/[0.06] bg-[#ebe8e2]">
          {LEAD_STATUSES.map((col, idx) => {
            const cards = byStatus[col.id] || [];
            const isOver = dragOverStatus === col.id;
            return (
              <div
                key={col.id}
                className={
                  "flex h-full min-h-0 w-[280px] shrink-0 flex-col border-r border-black/[0.06] bg-[#f3f1ec] last:border-r-0 " +
                  "" +
                  (isOver ? "bg-[#f56616]/[0.06]" : "")
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverStatus(col.id);
                }}
                onDragLeave={() =>
                  setDragOverStatus((s) => (s === col.id ? null : s))
                }
                onDrop={async (e) => {
                  e.preventDefault();
                  setDragOverStatus(null);
                  const id = e.dataTransfer.getData("text/lead-id") || draggingId;
                  if (!id) return;
                  const lead = items.find((l) => l._id === id);
                  if (!lead || lead.status === col.id) return;
                  await updateStatus(id, col.id as LeadStatus);
                  setDraggingId(null);
                }}
              >
                <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-black/[0.06] bg-white px-3">
                  <div className="flex items-center gap-2">
                    <span className={"h-2 w-2 rounded-full " + col.color} />
                    <span className="text-[12px] font-semibold uppercase tracking-[0.04em]">
                      {col.label}
                    </span>
                  </div>
                  <span className="min-w-[1.5rem] rounded-md bg-black/[0.05] px-1.5 py-0.5 text-center text-[11px] font-bold text-black/50">
                    {cards.length}
                  </span>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-3">
                  {cards.length === 0 ? (
                    <div className="flex min-h-[72px] items-center justify-center rounded-md border border-dashed border-black/10 bg-black/[0.015] px-3">
                      <p className="text-center text-[11px] text-black/30">
                        Drop here
                      </p>
                    </div>
                  ) : (
                    cards.map((lead) => (
                      <button
                        key={lead._id}
                        type="button"
                        draggable
                        onDragStart={(e) => {
                          setDraggingId(lead._id);
                          e.dataTransfer.setData("text/lead-id", lead._id);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragEnd={() => {
                          setDraggingId(null);
                          setDragOverStatus(null);
                        }}
                        onClick={() => setSelected(lead)}
                        className={
                          "w-full shrink-0 rounded-md border border-black/[0.06] bg-white p-3 text-left shadow-sm transition " +
                          (draggingId === lead._id
                            ? "opacity-40"
                            : "border-black/[0.06] hover:border-black/20 hover:shadow-md") +
                          (selected?._id === lead._id
                            ? " border-[#f56616]/40 ring-2 ring-[#f56616]/25"
                            : "")
                        }
                      >
                        <p className="text-[13px] font-semibold leading-snug tracking-[-0.02em]">
                          {lead.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-black/40">
                          {lead.email}
                        </p>
                        {lead.company ? (
                          <p className="mt-1 truncate text-[11px] font-medium text-black/55">
                            {lead.company}
                          </p>
                        ) : null}
                        {lead.interest ? (
                          <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-black/45">
                            {lead.interest}
                          </p>
                        ) : null}
                      </button>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={
                "rounded-full px-3 py-1.5 text-[12px] font-semibold " +
                (statusFilter === "all"
                  ? "bg-[#171717] text-white"
                  : "bg-white text-black/55 ring-1 ring-black/10")
              }
            >
              All - {items.length}
            </button>
            {LEAD_STATUSES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStatusFilter(s.id)}
                className={
                  "rounded-full px-3 py-1.5 text-[12px] font-semibold " +
                  (statusFilter === s.id
                    ? "bg-[#171717] text-white"
                    : "bg-white text-black/55 ring-1 ring-black/10")
                }
              >
                <span className={"mr-1.5 inline-block h-1.5 w-1.5 rounded-full " + s.color} />
                {s.label} - {counts[s.id] || 0}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
            {visible.length === 0 ? (
              <p className="px-6 py-16 text-center text-sm text-black/40">
                {items.length === 0
                  ? "No leads yet. Contact form submissions and manual adds appear here."
                  : "No leads in this status."}
              </p>
            ) : (
              <ul className="divide-y divide-black/[0.06]">
                {visible.map((lead) => {
                  const st = LEAD_STATUSES.find((s) => s.id === lead.status);
                  const on = selected?._id === lead._id;
                  return (
                    <li key={lead._id}>
                      <button
                        type="button"
                        onClick={() => setSelected(lead)}
                        className={
                          "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors sm:px-5 " +
                          (on ? "bg-[#f56616]/[0.06]" : "hover:bg-black/[0.02]")
                        }
                      >
                        <span
                          className={
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full " +
                            (st?.color || "bg-zinc-300")
                          }
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold">{lead.name}</p>
                            <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/45">
                              {st?.label || lead.status}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-[12px] text-black/40">
                            {lead.email}
                            {lead.company ? " - " + lead.company : ""}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}

      {/* Detail drawer */}
      {selected ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/25">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            onClick={() => setSelected(null)}
          />
          <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-black/[0.06] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.03em]">
                  {selected.name}
                </h2>
                <p className="text-[12px] text-black/40">{selected.source || "-"}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPendingDelete({ id: selected._id, label: selected.name || "lead" })}
                  className="rounded-lg p-2 text-black/35 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-black/35 hover:bg-black/[0.04]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-black/70">
                  <Mail size={14} className="text-black/35" />
                  <a
                    href={"mailto:" + selected.email}
                    className="hover:text-[#f56616]"
                  >
                    {selected.email}
                  </a>
                </p>
                {selected.phone ? (
                  <p className="flex items-center gap-2 text-black/70">
                    <Phone size={14} className="text-black/35" />
                    <a href={"tel:" + selected.phone}>{selected.phone}</a>
                  </p>
                ) : null}
                {selected.company ? (
                  <p className="flex items-center gap-2 text-black/70">
                    <Building2 size={14} className="text-black/35" />
                    {selected.company}
                  </p>
                ) : null}
              </div>

              {selected.message ? (
                <p className="mt-4 rounded-xl bg-[#faf9f7] p-3 text-[13px] leading-6 text-black/60">
                  {selected.message}
                </p>
              ) : null}

              <label className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
                Status
              </label>
              <select
                value={selected.status}
                onChange={(e) =>
                  updateStatus(selected._id, e.target.value as LeadStatus)
                }
                className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#f56616]"
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>

              <label className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
                Add note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#f56616]"
                placeholder="Call summary, next step..."
              />
              <button
                type="button"
                disabled={saving || !note.trim()}
                onClick={() => patchLead({ note })}
                className="mt-2 rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save note"}
              </button>

              {(selected.notes || []).length > 0 ? (
                <div className="mt-5 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
                    Notes
                  </p>
                  {[...(selected.notes || [])].reverse().map((n, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-black/[0.06] px-3 py-2 text-[13px]"
                    >
                      <p className="text-black/70">{n.text}</p>
                      <p className="mt-1 text-[10px] text-black/35">
                        {n.createdAt
                          ? new Date(n.createdAt).toLocaleString()
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}

      {showNew ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">New lead</h3>
              <button type="button" onClick={() => setShowNew(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={onCreate} className="space-y-3">
              {(
                [
                  ["name", "Name *"],
                  ["email", "Email *"],
                  ["phone", "Phone"],
                  ["company", "Company"],
                  ["interest", "Interest"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="text-[11px] font-semibold text-black/40">
                    {label}
                  </label>
                  <input
                    required={key === "name" || key === "email"}
                    value={form[key]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#f56616]"
                  />
                </div>
              ))}
              <div>
                <label className="text-[11px] font-semibold text-black/40">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#f56616]"
                />
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-full bg-[#171717] py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create lead"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete lead?"
        description="Remove this lead from the CRM? This cannot be undone."
        confirmLabel="Delete"
        danger
        loading={confirmLoading}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete) return;
          setConfirmLoading(true);
          try {
            await onDelete(pendingDelete.id);
            setPendingDelete(null);
          } finally {
            setConfirmLoading(false);
          }
        }}
      />

    </div>
  );
}
