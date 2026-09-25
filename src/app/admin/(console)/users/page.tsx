"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Copy,
  RefreshCw,
  ShieldOff,
  Search,
  X,
} from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

type UserRow = {
  _id: string;
  email: string;
  name: string;
  role: string;
  active?: boolean;
  mustChangePassword?: boolean;
  mfaEnabled?: boolean;
  lastLoginAt?: string | null;
  createdAt?: string | null;
};

const ROLES = ["superadmin", "admin", "editor", "sales", "viewer"] as const;

const ROLE_HELP: Record<string, string> = {
  superadmin: "Full access including user management",
  admin: "Jobs, blog, leads, applications — users read-only",
  editor: "Jobs and blog",
  sales: "Leads only",
  viewer: "Read-only across modules",
};

const emptyForm = {
  email: "",
  name: "",
  role: "editor",
  active: true,
};

function formatDate(v?: string | null) {
  if (!v) return "—";
  try {
    return new Date(v).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

export default function AdminUsersPage() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingResetId, setPendingResetId] = useState<string | null>(null);
  const [pendingMfaId, setPendingMfaId] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && Array.isArray(d.items)) setItems(d.items);
        else setError(d.error || "Failed to load users");
      })
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (statusFilter === "active" && u.active === false) return false;
      if (statusFilter === "inactive" && u.active !== false) return false;
      if (!query) return true;
      return (
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
      );
    });
  }, [items, q, roleFilter, statusFilter]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setTempPassword(null);
    setShowForm(true);
  };

  const openEdit = (u: UserRow) => {
    setEditingId(u._id);
    setForm({
      email: u.email,
      name: u.name,
      role: u.role || "viewer",
      active: u.active !== false,
    });
    setError("");
    setTempPassword(null);
    setShowForm(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setTempPassword(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId
            ? {
                id: editingId,
                name: form.name,
                role: form.role,
                active: form.active,
              }
            : {
                email: form.email,
                name: form.name,
                role: form.role,
                active: form.active,
              },
        ),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Save failed");
      if (d.tempPassword) setTempPassword(d.tempPassword);
      else setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const resetPassword = async (id: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, resetPassword: true }),
    });
    const d = await res.json();
    if (!res.ok || !d.ok) {
      setError(d.error || "Reset failed");
      return;
    }
    if (d.tempPassword) {
      setTempPassword(d.tempPassword);
      setShowForm(true);
      setEditingId(id);
    }
    load();
  };

  const resetMfa = async (id: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, resetMfa: true }),
    });
    const d = await res.json();
    if (!res.ok || !d.ok) {
      setError(d.error || "MFA reset failed");
      return;
    }
    load();
  };

  const onDelete = async (id: string) => {
    const res = await fetch(
      "/api/admin/users?id=" + encodeURIComponent(id),
      { method: "DELETE" },
    );
    const d = await res.json();
    if (!res.ok || !d.ok) {
      setError(d.error || "Delete failed");
      return;
    }
    load();
  };

  const copyTemp = async () => {
    if (!tempPassword) return;
    await navigator.clipboard.writeText(tempPassword);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[#171717]">
            Users
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-black/45">
            Create accounts, assign roles, reset passwords and MFA.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-[13px] font-semibold text-white"
        >
          <Plus size={16} />
          Add user
        </button>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
          <button
            type="button"
            className="ml-2 underline"
            onClick={() => setError("")}
          >
            Dismiss
          </button>
        </p>
      ) : null}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3">
        <div className="relative min-w-0 flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or email…"
            className="h-11 w-full rounded-full border border-black/10 bg-white pl-10 pr-4 text-[13px] text-[#171717] outline-none placeholder:text-black/35 focus:border-black/20"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-11 min-w-[128px] appearance-none rounded-full border border-black/10 bg-white bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-4 pr-9 text-[13px] text-[#171717] outline-none focus:border-black/20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="all">All roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 min-w-[128px] appearance-none rounded-full border border-black/10 bg-white bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-4 pr-9 text-[13px] text-[#171717] outline-none focus:border-black/20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        {loading ? (
          <p className="p-8 text-sm text-black/40">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-sm text-black/40">No users match your filters.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed text-left text-[13px]">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#fafafa] text-[10px] font-semibold uppercase tracking-[0.14em] text-black/35">
                  <th className="w-[18%] px-5 py-3 font-semibold">Name</th>
                  <th className="w-[22%] px-4 py-3 font-semibold">Email</th>
                  <th className="w-[12%] px-4 py-3 font-semibold">Role</th>
                  <th className="w-[10%] px-4 py-3 font-semibold">Status</th>
                  <th className="w-[8%] px-4 py-3 font-semibold">MFA</th>
                  <th className="w-[16%] px-4 py-3 font-semibold">Last login</th>
                  <th className="w-[14%] px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u._id} className="border-b border-black/[0.05] last:border-0 hover:bg-black/[0.015]">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-[#171717]">{u.name}</div>
                      {u.mustChangePassword ? (
                        <div className="mt-0.5 text-[11px] text-amber-700">
                          Must change password
                        </div>
                      ) : null}
                    </td>
                    <td className="truncate px-4 py-3.5 text-black/55">{u.email}</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex rounded-full bg-black/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-black/55">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {u.active === false ? (
                        <span className="text-[13px] font-medium text-red-600">Inactive</span>
                      ) : (
                        <span className="text-[13px] font-medium text-emerald-600">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-black/50">
                      {u.mfaEnabled ? "On" : "Off"}
                    </td>
                    <td className="px-4 py-3.5 text-[12px] text-black/40">
                      {formatDate(u.lastLoginAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEdit(u)}
                          className="rounded-lg p-1.5 text-black/40 transition hover:bg-black/[0.05] hover:text-black"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          title="Reset password"
                          onClick={() => setPendingResetId(u._id)}
                          className="rounded-lg p-2 text-black/45 hover:bg-black/[0.04] hover:text-black"
                        >
                          <RefreshCw size={14} />
                        </button>
                        <button
                          type="button"
                          title="Reset MFA"
                          onClick={() => setPendingMfaId(u._id)}
                          className="rounded-lg p-2 text-black/45 hover:bg-black/[0.04] hover:text-black"
                        >
                          <ShieldOff size={14} />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => setPendingDeleteId(u._id)}
                          className="rounded-lg p-2 text-black/35 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      {showForm ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close"
            onClick={() => {
              if (!saving) {
                setShowForm(false);
                setTempPassword(null);
              }
            }}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.02em]">
                  {editingId ? "Edit user" : "Add user"}
                </h2>
                <p className="mt-1 text-sm text-black/45">
                  {editingId
                    ? "Update name, role or status."
                    : "A temporary password is generated automatically."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setTempPassword(null);
                }}
                className="rounded-lg p-1.5 text-black/40 hover:bg-black/[0.04]"
              >
                <X size={16} />
              </button>
            </div>

            {tempPassword ? (
              <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-amber-800">
                  Temporary password (shown once)
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="flex-1 break-all text-sm font-semibold text-[#171717]">
                    {tempPassword}
                  </code>
                  <button
                    type="button"
                    onClick={copyTemp}
                    className="rounded-lg border border-amber-300 bg-white p-2 text-amber-900"
                    title="Copy"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <p className="mt-2 text-[12px] text-amber-800/80">
                  Share securely. User must change it on first login.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setTempPassword(null);
                  }}
                  className="mt-3 text-sm font-semibold text-amber-900 underline"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-black/25"
                  />
                </div>
                {!editingId ? (
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-black/25"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">
                      Email
                    </label>
                    <p className="mt-1.5 text-sm text-black/55">{form.email}</p>
                  </div>
                )}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-[12px] text-black/40">
                    {ROLE_HELP[form.role] || ""}
                  </p>
                </div>
                <label className="flex items-center gap-2 text-sm text-black/70">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, active: e.target.checked }))
                    }
                  />
                  Active account
                </label>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                    {editingId ? "Save" : "Create"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete user?"
        description="This permanently removes the account. Prefer deactivating if they might return."
        confirmLabel="Delete"
        danger
        loading={confirmLoading}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={async () => {
          if (!pendingDeleteId) return;
          setConfirmLoading(true);
          try {
            await onDelete(pendingDeleteId);
            setPendingDeleteId(null);
          } finally {
            setConfirmLoading(false);
          }
        }}
      />
      <ConfirmDialog
        open={pendingResetId !== null}
        title="Reset password?"
        description="A new temporary password will be generated. They must change it on next login."
        confirmLabel="Reset password"
        danger={false}
        loading={confirmLoading}
        onCancel={() => setPendingResetId(null)}
        onConfirm={async () => {
          if (!pendingResetId) return;
          setConfirmLoading(true);
          try {
            await resetPassword(pendingResetId);
            setPendingResetId(null);
          } finally {
            setConfirmLoading(false);
          }
        }}
      />
      <ConfirmDialog
        open={pendingMfaId !== null}
        title="Reset MFA?"
        description="Authenticator will be cleared. They must set up MFA again on next login."
        confirmLabel="Reset MFA"
        danger={false}
        loading={confirmLoading}
        onCancel={() => setPendingMfaId(null)}
        onConfirm={async () => {
          if (!pendingMfaId) return;
          setConfirmLoading(true);
          try {
            await resetMfa(pendingMfaId);
            setPendingMfaId(null);
          } finally {
            setConfirmLoading(false);
          }
        }}
      />
    </div>
  );
}
