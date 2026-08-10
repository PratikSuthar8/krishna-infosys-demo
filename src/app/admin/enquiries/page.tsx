"use client";

import { useEffect, useState } from "react";

type Item = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  organisation?: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/enquiries")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setItems(d.items);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id: string, status: string) => {
    await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Enquiries</h1>
      <p className="mt-2 text-sm text-white/40">Contact form submissions from the website.</p>
      {loading ? (
        <p className="mt-8 text-sm text-white/40">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-white/40">No enquiries yet.</p>
      ) : (
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <article key={item._id} className="border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">{item.name}</h2>
                  <p className="mt-1 text-[13px] text-white/45">
                    {item.email} · {item.phone}
                    {item.organisation ? ` · ${item.organisation}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white/50">
                    {item.status}
                  </span>
                  {item.status === "new" && (
                    <button
                      type="button"
                      onClick={() => setStatus(item._id, "read")}
                      className="text-[12px] font-semibold text-[#f56616]"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setStatus(item._id, "done")}
                    className="text-[12px] font-semibold text-white/40 hover:text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[12px] font-medium text-[#f56616]">{item.interest}</p>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
