import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative min-h-[80vh] overflow-hidden bg-[#f3f1ec] pt-[88px] text-[#171717]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(23,23,23,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,.035) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage:
                        "linear-gradient(to bottom, black 50%, transparent 100%)",
                }}
            />

            <div className="relative mx-auto flex max-w-[900px] flex-col items-start px-5 py-24 sm:px-8 lg:py-32">
                <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#f56616]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f56616]">
                        404
                    </span>
                </div>

                <h1 className="mt-6 text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                    Page not found.
                </h1>

                <p className="mt-6 max-w-[480px] text-base leading-7 text-black/55">
                    This route does not exist or may have moved. Use the links below to
                    get back to the main site.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-[13px] font-semibold text-white! transition-colors duration-300 hover:bg-[#f56616] hover:text-[#171717]!"
                    >
                        <Home size={15} strokeWidth={1.6} />
                        <span>Back to home</span>
                    </Link>

                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-black/55 transition-colors hover:text-[#f56616]"
                    >
                        Contact us
                        <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>

                <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-8 text-[13px]">
                    <Link href="/solutions" className="text-black/50 transition-colors hover:text-[#f56616]">
                        Solutions
                    </Link>
                    <Link href="/projects" className="text-black/50 transition-colors hover:text-[#f56616]">
                        Projects
                    </Link>
                    <Link href="/amc-support" className="text-black/50 transition-colors hover:text-[#f56616]">
                        AMC & Support
                    </Link>
                    <Link href="/about" className="text-black/50 transition-colors hover:text-[#f56616]">
                        About
                    </Link>
                </div>
            </div>
        </main>
    );
}