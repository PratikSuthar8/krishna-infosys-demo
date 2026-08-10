"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, X, Upload } from "lucide-react";

type Props = {
  jobSlug: string;
  jobRole: string;
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "loading" | "success" | "error";

export function JobApplyForm({ jobSlug, jobRole, open, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
  });
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setStatus("error");
      setError("Please attach your resume (PDF or Word, max 5MB).");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const fd = new FormData();
      fd.set("jobSlug", jobSlug);
      fd.set("jobRole", jobRole);
      fd.set("name", form.name);
      fd.set("email", form.email);
      fd.set("phone", form.phone);
      fd.set("linkedin", form.linkedin);
      fd.set("message", form.message);
      fd.set("resume", resume);

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to submit");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", linkedin: "", message: "" });
      setResume(null);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const field =
    "w-full border border-black/10 bg-[#f3f1ec] px-3.5 py-3 text-[13px] text-[#171717] outline-none placeholder:text-black/35 focus:border-[#f56616]/50";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto border border-black/10 bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616]">
              Apply
            </p>
            <h2
              id="apply-title"
              className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[#171717]"
            >
              {jobRole}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/50 hover:text-[#171717]"
          >
            <X size={16} />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-8 space-y-3">
            <CheckCircle2 className="text-[#f56616]" size={32} />
            <p className="text-base font-semibold text-[#171717]">Application received</p>
            <p className="text-sm leading-6 text-black/50">
              Thanks for applying for {jobRole}. HR will review and contact you if
              shortlisted.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 text-[13px] font-semibold text-[#f56616]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input
              required
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Full name *"
              className={field}
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email *"
              className={field}
            />
            <input
              required
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Phone *"
              className={field}
            />
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={onChange}
              placeholder="LinkedIn (optional)"
              className={field}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={3}
              placeholder="Short note / experience"
              className={`${field} resize-y`}
            />

            <label className="flex cursor-pointer flex-col gap-2 border border-dashed border-black/15 bg-[#f3f1ec]/80 px-4 py-4">
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#171717]">
                <Upload size={15} className="text-[#f56616]" />
                Resume * (PDF or Word, max 5MB)
              </span>
              <input
                required
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="text-[12px] text-black/50 file:mr-3 file:border-0 file:bg-[#171717] file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-white"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
              />
              {resume ? (
                <span className="text-[12px] text-black/45">{resume.name}</span>
              ) : null}
            </label>

            {status === "error" && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f56616] px-5 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#171717] disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Submit application
                  <ArrowUpRight size={14} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
