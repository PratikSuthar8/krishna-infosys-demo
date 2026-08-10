"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { contact } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

const interests = [
  "Security & Access",
  "Communication",
  "Audio Visual",
  "Networking & Data",
  "Automation & Safety",
  "AMC & Support",
  "General enquiry",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    interest: interests[0],
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cf-block", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setForm({
        name: "",
        organisation: "",
        email: "",
        phone: "",
        interest: interests[0],
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  const field =
    "w-full border border-black/10 bg-white px-4 py-3.5 text-[14px] text-[#171717] outline-none transition-colors placeholder:text-black/35 focus:border-[#f56616]/50";

  return (
    <section
      id="contact-form"
      ref={sectionRef}
      className="relative bg-[#f3f1ec] text-[#171717]"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="cf-block">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                Project brief
              </span>
            </div>
            <h2 className="mt-5 max-w-[420px] text-[clamp(1.9rem,3.2vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              Tell us about the site and the systems you need.
            </h2>
            <p className="mt-5 max-w-[400px] text-[15px] leading-7 text-black/50">
              Share a short brief. We respond with a practical next step —
              survey, scope discussion or call-back.
            </p>
            <div className="mt-8 space-y-2 text-sm text-black/45">
              <p>
                Prefer phone?{" "}
                <a href={contact.phone.href} className="font-semibold text-[#171717] hover:text-[#f56616]">
                  {contact.phone.display}
                </a>
              </p>
              <p>
                Email{" "}
                <a href={`mailto:${contact.email.general}`} className="font-semibold text-[#171717] hover:text-[#f56616]">
                  {contact.email.general}
                </a>
              </p>
            </div>
          </div>

          <div className="cf-block border border-black/10 bg-white p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-8">
                <CheckCircle2 className="text-[#f56616]" size={32} />
                <h3 className="text-xl font-semibold tracking-[-0.03em]">Brief received</h3>
                <p className="max-w-[420px] text-[15px] leading-7 text-black/50">
                  Thank you. Our team will review and get back to you shortly.
                  For urgent matters, call {contact.phone.display}.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-[13px] font-semibold text-[#f56616] hover:text-[#171717]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
                      Name *
                    </span>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className={field}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
                      Organisation
                    </span>
                    <input
                      name="organisation"
                      value={form.organisation}
                      onChange={onChange}
                      className={field}
                      placeholder="Company / site"
                      autoComplete="organization"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
                      Email *
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className={field}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
                      Phone *
                    </span>
                    <input
                      required
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className={field}
                      placeholder="+91 …"
                      autoComplete="tel"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
                    Interest *
                  </span>
                  <select
                    required
                    name="interest"
                    value={form.interest}
                    onChange={onChange}
                    className={field}
                  >
                    {interests.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
                    Message *
                  </span>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={5}
                    className={`${field} resize-y`}
                    placeholder="Site type, systems needed, timeline…"
                  />
                </label>

                {status === "error" && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#f56616] disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit brief
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
