"use client";
import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/contact";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "AMC & Support", href: "/amc-support" },
  { label: "Contact", href: "/contact" },
];

const solutions = [
  { label: "Security & Access", href: "/solutions/security-access" },
  { label: "Communication", href: "/solutions/communication" },
  { label: "Audio Visual", href: "/solutions/audio-visual" },
  { label: "Networking & Data", href: "/solutions/networking-data" },
  { label: "Automation & Safety", href: "/solutions/automation-safety" },
];

const legal = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

export function Footer() {
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-12 border-t border-white/10 py-12 lg:grid-cols-[1.35fr_0.65fr_0.8fr_1fr] lg:gap-10 lg:py-14">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              aria-label="Krishna Infosys home"
              className="inline-flex rounded-md bg-white px-4 py-2.5"
            >
              <Image
                src="/brand/logo.png"
                alt="Krishna Infosys"
                width={1832}
                height={848}
                className="h-auto w-[128px]"
              />
            </Link>

            <p className="mt-6 max-w-[380px] text-sm leading-7 text-white/42">
              Integrated ELV solutions engineered around security,
              communication, connectivity, automation and operational
              continuity.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-8 bg-[#f56616]" />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                Design · Consult · Execute
              </span>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
              Navigate
            </span>

            <nav className="mt-5 flex flex-col items-start gap-3.5">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm font-medium text-white/52 transition-colors hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight
                    size={11}
                    className="text-[#f56616] opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* SOLUTIONS */}
          <div>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
              Solutions
            </span>

            <nav className="mt-5 flex flex-col items-start gap-3.5">
              {solutions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/52 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
              Start a conversation
            </span>

            <div className="mt-5 space-y-4">
              <a
                href="tel:+917940304848"
                className="group flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#f56616] transition-colors group-hover:border-[#f56616]/40">
                  <Phone size={13} strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[8px] font-bold uppercase tracking-[0.16em] text-white/22">
                    Call
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white/62 transition-colors group-hover:text-white">
                    +91 79 4030 4848
                  </span>
                </span>
              </a>

              <a
                href="mailto:info@krishnainfosys.com"
                className="group flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#f56616] transition-colors group-hover:border-[#f56616]/40">
                  <Mail size={13} strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[8px] font-bold uppercase tracking-[0.16em] text-white/22">
                    Email
                  </span>
                  <span className="mt-1 block break-all text-sm font-medium text-white/62 transition-colors group-hover:text-white">
                    info@krishnainfosys.com
                  </span>
                </span>
              </a>
            </div>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
            >
              Contact Krishna Infosys
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f56616] text-white">
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[9px] font-medium tracking-[0.03em] text-white/25">
            © {new Date().getFullYear()} Krishna Infosys. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[9px] font-medium text-white/35 transition-colors hover:text-[#f56616]"
              >
                {item.label}
              </Link>
            ))}

            <span className="hidden h-3 w-px bg-white/10 sm:block" />

            <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/20">
              Ahmedabad · Gujarat · India
            </span>

            <a
              href="https://www.krishnainfosys.com"
              className="text-[9px] font-medium text-white/35 transition-colors hover:text-[#f56616]"
            >
              www.krishnainfosys.com
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-white/30 transition-colors hover:text-white"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUpRight
                size={12}
                className="rotate-[-45deg] text-[#f56616] transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}