"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Copy, RefreshCw } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

type UserRow = {
  _id: string;
  email: string;
  name: string;
  role: string;
  active?: boolean;
  mustChangePassword?: boolean;
};

const ROLES = ["superadmin", "admin", "editor", "sales", "viewer"] as const;

const emptyForm = {
  email: "",
  name: "",
  role: "editor",
  active: true,
};

export default function AdminUsersPage() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingResetId, setPendingResetId] = useState<string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && Array.isArray(d.items)) setItems(d.items);
        else setError(d.error || "Failed to load");
      })
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setTempPassword(null);
    setShowForm(true);
    setError("");
  };

  const openEdit = (u: UserRow) => {
    setEditingId(u._id);
    setForm({
      email: u.email,
      name: u.name || "",
      role: u.role || "viewer",
      active: u.active !== false,
    });
    setTempPassword(null);
    setShowForm(true);
    setError("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setTempPassword(null);
    try {
      const body = editingId
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
          };
      const res = await fetch("/api/admin/users", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Save failed");
      if (d.tempPassword) {
        setTempPassword(d.tempPassword);
      } else {
        setShowForm(false);
      }
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

  const onDelete = async (id: string) => {
    const res = await fetch("/api/admin/users?id=" + encodeURIComponent(id), {
      method: "DELETE",
    });
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
    // copied
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">Users</h1>
          <p className="mt-1 text-sm text-black/40">
            New users get an auto-generated password and must change it on first login.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          Add user
        </button>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white">
        {loading ? (
          <div className="flex items-center gap-2 p-6 text-sm text-black/40">
            <Loader2 className="animate-spin" size={16} /> Loading…
          </div>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-black/40">No users yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-[11px] uppercase tracking-wider text-black/40">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u._id} className="border-b border-black/5">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-black/55">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[11px] font-semibold">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.active === false ? (
                      <span className="text-red-600">Inactive</span>
                    ) : u.mustChangePassword ? (
                      <span className="text-amber-600">Must change password</span>
                    ) : (
                      <span className="text-emerald-600">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        title="Reset temporary password"
                        onClick={() => setPendingResetId(u._id)}
                        className="rounded-lg p-2 hover:bg-black/[0.04]"
                      >
                        <RefreshCw size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(u)}
                        className="rounded-lg p-2 hover:bg-black/[0.04]"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(u._id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close"
            onClick={() => {
              setShowForm(false);
              setTempPassword(null);
            }}
          />
          <div className="relative z-10 w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            {tempPassword ? (
              <>
                <h2 className="text-lg font-semibold">Temporary password</h2>
                <p className="text-sm text-black/50">
                  Copy this now. It will not be shown again. The user must change it on first login.
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 font-mono text-sm">
                  <span className="flex-1 break-all">{tempPassword}</span>
                  <button type="button" onClick={copyTemp} className="rounded-lg p-2 hover:bg-amber-100">
                    <Copy size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setTempPassword(null);
                  }}
                  className="w-full rounded-full bg-[#171717] py-2.5 text-sm font-semibold text-white"
                >
                  Done
                </button>
              </>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="text-lg font-semibold">
                  {editingId ? "Edit user" : "Add user"}
                </h2>
                {editingId ? null : (
                  <div>
                    <label className="text-[11px] font-semibold text-black/40">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#f56616]"
                    />
                  </div>
                )}
                <div>
                  <label className="text-[11px] font-semibold text-black/40">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#f56616]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-black/40">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#f56616]"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                {editingId ? (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                    />
                    Active
                  </label>
                ) : (
                  <p className="text-[12px] text-black/45">
                    A temporary password will be generated automatically.
                  </p>
                )}
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                    Save
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
        description="This permanently removes the account. They will not be able to sign in."
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
        description="A new temporary password will be generated. The user must change it on next login."
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
    </div>
  );
}