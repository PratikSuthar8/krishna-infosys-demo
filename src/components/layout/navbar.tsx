"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  MessagesSquare,
  AudioLines,
  Network,
  HousePlug,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions", megaMenu: true },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "AMC & Support", href: "/amc-support" },
];

const solutionGroups = [
  {
    title: "Security & Access",
    description: "Integrated protection for people, premises and assets.",
    href: "/solutions/security-access",
    icon: ShieldCheck,
    items: [
      "CCTV Surveillance",
      "Access Control",
      "Intrusion Alarm",
      "Boom Barrier",
      "Video Door Phone",
    ],
  },
  {
    title: "Communication",
    description: "Connected communication across every environment.",
    href: "/solutions/communication",
    icon: MessagesSquare,
    items: [
      "Intercom / EPABX",
      "Video Conferencing",
      "Public Address",
      "FTTH / DTH",
    ],
  },
  {
    title: "Audio Visual",
    description: "Immersive AV systems engineered around the space.",
    href: "/solutions/audio-visual",
    icon: AudioLines,
    items: [
      "Home Theatre",
      "Professional Audio",
      "Digital Signage",
      "Auditorium",
    ],
  },
  {
    title: "Networking & Data",
    description: "Reliable infrastructure for connected operations.",
    href: "/solutions/networking-data",
    icon: Network,
    items: [
      "Structured Cabling",
      "Fiber / Wi-Fi / RF",
      "Server Room",
      "Data Centre",
    ],
  },
  {
    title: "Automation & Safety",
    description: "Intelligent control with integrated life-safety systems.",
    href: "/solutions/automation-safety",
    icon: HousePlug,
    items: [
      "Home Automation",
      "Building Automation",
      "Fire Alarm System",
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "px-3 pt-3 sm:px-5 lg:px-8" : ""
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? "max-w-[1440px] rounded-2xl border border-black/[0.07] bg-white/90 shadow-[0_12px_45px_rgba(20,20,20,0.08)] backdrop-blur-xl"
              : "max-w-none border-b border-black/[0.06] bg-white/95"
          }`}
        >
          <div
            className={`mx-auto flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? "h-[72px] px-4 sm:px-6 lg:px-8"
                : "container-main h-[88px]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Krishna Infosys home"
              className="relative z-10 shrink-0 rounded-md"
              onClick={closeMobileMenu}
            >
              <Image
                src="/brand/logo.png"
                alt="Krishna Infosys"
                width={1832}
                height={848}
                priority
                className={`h-auto transition-all duration-500 ${
                  scrolled
                    ? "w-[112px] sm:w-[122px]"
                    : "w-[120px] sm:w-[132px] lg:w-[140px]"
                }`}
              />
            </Link>

            {/* Desktop navigation */}
            <nav
              className="hidden items-center gap-1 xl:flex"
              aria-label="Main navigation"
            >
              {navigation.map((item) => {
                const active = isActive(item.href);

                if (item.megaMenu) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setSolutionsOpen(true)}
                      onMouseLeave={() => setSolutionsOpen(false)}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        aria-expanded={solutionsOpen}
                        className={`group/nav relative flex items-center gap-1.5 px-4 py-3 text-[15.5px] font-medium tracking-[-0.015em] transition-colors duration-300 ${
                          active
                            ? "text-brand"
                            : "text-foreground/72 hover:text-foreground"
                        }`}
                      >
                        <span className="relative">
                          {item.label}

                          <span
                            className={`absolute -bottom-[9px] left-0 h-[2px] rounded-full bg-brand transition-all duration-300 ease-out ${
                              active
                                ? "w-full"
                                : "w-0 group-hover/nav:w-full"
                            }`}
                          />
                        </span>

                        <ChevronDown
                          size={15}
                          strokeWidth={2}
                          className={`transition-all duration-300 ${
                            solutionsOpen
                              ? "rotate-180 text-brand"
                              : "group-hover/nav:text-brand"
                          }`}
                        />
                      </Link>

                      <AnimatePresence>
                        {solutionsOpen && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 10,
                              scale: 0.985,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              y: 8,
                              scale: 0.985,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: "easeOut",
                            }}
                            className="absolute left-1/2 top-full w-[min(1120px,calc(100vw-64px))] -translate-x-1/2 pt-5"
                          >
                            <div className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_24px_80px_rgba(20,20,20,0.14)]">
                              <div className="grid grid-cols-5">
                                {solutionGroups.map((group) => {
                                  const Icon = group.icon;

                                  return (
                                    <Link
                                      key={group.title}
                                      href={group.href}
                                      className="group border-r border-border p-6 transition-colors duration-300 last:border-r-0 hover:bg-surface"
                                    >
                                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                                        <Icon
                                          size={20}
                                          strokeWidth={1.8}
                                        />
                                      </div>

                                      <h3 className="text-[15px] font-semibold tracking-[-0.02em]">
                                        {group.title}
                                      </h3>

                                      <p className="mt-2 min-h-[54px] text-[12px] leading-[1.5] text-muted">
                                        {group.description}
                                      </p>

                                      <ul className="mt-5 space-y-2.5">
                                        {group.items.map((service) => (
                                          <li
                                            key={service}
                                            className="text-[12px] text-foreground/65"
                                          >
                                            {service}
                                          </li>
                                        ))}
                                      </ul>

                                      <div className="mt-6 flex items-center gap-1.5 text-[12px] font-semibold text-brand">
                                        Explore

                                        <ArrowUpRight
                                          size={13}
                                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              <div className="flex items-center justify-between border-t border-border bg-surface px-6 py-4">
                                <p className="text-[13px] text-muted">
                                  One accountable partner for integrated ELV
                                  infrastructure.
                                </p>

                                <Link
                                  href="/solutions"
                                  className="flex items-center gap-2 text-[13px] font-semibold text-foreground transition-colors hover:text-brand"
                                >
                                  View all solutions

                                  <ArrowUpRight size={14} />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group/nav relative px-4 py-3 text-[15.5px] font-medium tracking-[-0.015em] transition-colors duration-300 ${
                      active
                        ? "text-brand"
                        : "text-foreground/72 hover:text-foreground"
                    }`}
                  >
                    <span className="relative">
                      {item.label}

                      <span
                        className={`absolute -bottom-[9px] left-0 h-[2px] rounded-full bg-brand transition-all duration-300 ease-out ${
                          active
                            ? "w-full"
                            : "w-0 group-hover/nav:w-full"
                        }`}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA / mobile trigger */}
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="group hidden items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-[13px] font-semibold !text-white transition-colors duration-300 hover:bg-brand hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:flex"
              >
                Request Consultation

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-brand hover:text-brand xl:hidden"
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-white xl:hidden"
          >
            <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1100px] flex-col px-5 sm:px-8 lg:px-10">
              
              {/* Mobile header */}
              <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-border sm:h-[82px]">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  aria-label="Krishna Infosys home"
                >
                  <Image
                    src="/brand/logo.png"
                    alt="Krishna Infosys"
                    width={1832}
                    height={848}
                    className="h-auto w-[112px] sm:w-[124px]"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-surface hover:text-brand"
                  aria-label="Close navigation menu"
                >
                  <X size={21} strokeWidth={1.8} />
                </button>
              </div>

              {/* Navigation links */}
              <nav
                className="flex-1 py-4 sm:py-6"
                aria-label="Mobile navigation"
              >
                {navigation.map((item, index) => {
                  const active = isActive(item.href);

                  if (item.megaMenu) {
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.025 * index,
                        }}
                        className="border-b border-border"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setMobileSolutionsOpen(
                              (current) => !current,
                            )
                          }
                          className={`group flex w-full appearance-none items-center justify-between border-0 bg-transparent py-[18px] text-left !text-[27px] !font-medium !leading-none tracking-[-0.035em] transition-colors sm:py-5 sm:!text-[31px] ${
                            active
                              ? "text-brand"
                              : "text-foreground hover:text-brand"
                          }`}
                        >
                          <span>{item.label}</span>

                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                              mobileSolutionsOpen
                                ? "rotate-180 border-brand bg-brand text-white"
                                : "border-border group-hover:border-brand group-hover:text-brand"
                            }`}
                          >
                            <ChevronDown
                              size={17}
                              strokeWidth={1.8}
                            />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileSolutionsOpen && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-2 pb-5 sm:grid-cols-2">
                                {solutionGroups.map((group) => {
                                  const Icon = group.icon;

                                  return (
                                    <Link
                                      key={group.title}
                                      href={group.href}
                                      onClick={closeMobileMenu}
                                      className="group flex items-center gap-3 rounded-xl border border-border bg-surface/70 p-3.5 transition-all duration-300 hover:border-brand/30 hover:bg-brand-subtle"
                                    >
                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                                        <Icon
                                          size={17}
                                          strokeWidth={1.8}
                                        />
                                      </div>

                                      <div className="min-w-0">
                                        <span className="block text-[14px] font-semibold tracking-[-0.015em]">
                                          {group.title}
                                        </span>

                                        <span className="mt-0.5 block truncate text-[11px] text-muted">
                                          {group.items.slice(0, 2).join(" / ")}
                                        </span>
                                      </div>

                                      <ArrowUpRight
                                        size={14}
                                        className="ml-auto shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                                      />
                                    </Link>
                                  );
                                })}
                              </div>

                              <Link
                                href="/solutions"
                                onClick={closeMobileMenu}
                                className="mb-5 flex items-center justify-between rounded-xl bg-brand-subtle px-4 py-3 text-[13px] font-semibold text-brand"
                              >
                                View all solutions
                                <ArrowUpRight size={15} />
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.025 * index,
                      }}
                      className="border-b border-border"
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between py-[18px] text-[27px] font-medium leading-none tracking-[-0.035em] transition-colors sm:py-5 sm:text-[31px] ${
                          active
                            ? "text-brand"
                            : "text-foreground hover:text-brand"
                        }`}
                      >
                        <span>{item.label}</span>

                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.7}
                          className={`transition-all duration-300 ${
                            active
                              ? "text-brand"
                              : "text-foreground/25 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile footer / CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="shrink-0 border-t border-border py-5"
              >
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="group flex w-full items-center justify-between rounded-full bg-[#171717] px-5 py-3.5 text-[14px] font-semibold !text-white transition-colors duration-300 hover:bg-brand"
                >
                  Request Consultation

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-[12px] text-muted">
                  <a
                    href="tel:+917940304848"
                    className="transition-colors hover:text-brand"
                  >
                    +91 79 4030 4848
                  </a>

                  <a
                    href="mailto:info@krishnainfosys.com"
                    className="transition-colors hover:text-brand"
                  >
                    info@krishnainfosys.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
