"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    acceptAll,
    defaultPreferences,
    readConsent,
    rejectNonEssential,
    saveConsent,
    type CookiePreferences,
} from "@/lib/cookies";
import { Settings2, X } from "lucide-react";

export function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [openPrefs, setOpenPrefs] = useState(false);
    const [prefs, setPrefs] = useState<CookiePreferences>(defaultPreferences);

    useEffect(() => {
        // show only if no prior choice
        if (!readConsent()) {
            const t = window.setTimeout(() => setVisible(true), 600);
            return () => window.clearTimeout(t);
        }
    }, []);

    const close = () => setVisible(false);

    const onAcceptAll = () => {
        acceptAll();
        close();
    };

    const onReject = () => {
        rejectNonEssential();
        close();
    };

    const onSavePrefs = () => {
        saveConsent({ ...prefs, necessary: true });
        close();
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label="Cookie consent"
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-6 sm:pb-6"
        >
            {/* Compact on phones so the page underneath stays usable; scrolls if the preference list is open on a short screen */}
            <div className="pointer-events-auto mx-auto max-h-[calc(100svh-1.5rem)] max-w-[720px] overflow-y-auto overscroll-contain border border-black/10 bg-[#f3f1ec] text-[#171717] shadow-[0_-8px_40px_rgba(0,0,0,0.12)] [@media(max-height:520px)]:ml-0 [@media(max-height:520px)]:max-w-[440px]">
                <div className="flex items-start justify-between gap-3 px-4 pt-3 sm:gap-4 sm:border-b sm:border-black/10 sm:px-6 sm:py-4">
                    <div>
                        <p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[#f56616] sm:block">
                            Cookies
                        </p>
                        <h2 className="text-[15px] font-semibold tracking-[-0.02em] sm:mt-1 sm:text-base">
                            We use cookies on this site
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onReject}
                        className="-mr-2.5 -mt-2 flex h-11 w-11 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/5 hover:text-black/70 sm:mr-0 sm:mt-0 sm:h-auto sm:w-auto sm:p-1.5"
                        aria-label="Close and use essential only"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="px-4 pb-3 pt-1 sm:px-6 sm:py-4">
                    <p className="text-[13px] leading-5 text-black/55 sm:text-sm sm:leading-6">
                        Necessary cookies keep the site working. With your choice we may also
                        use preference, functionality, and analytics cookies. See our{" "}
                        <Link
                            href="/privacy"
                            className="font-semibold text-[#f56616] underline-offset-2 hover:underline"
                        >
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/cookies"
                            className="font-semibold text-[#f56616] underline-offset-2 hover:underline"
                        >
                            Cookie Policy
                        </Link>
                        .
                    </p>

                    {openPrefs && (
                        <div className="mt-5 space-y-3 border border-black/10 bg-white p-4">
                            <label className="flex items-start justify-between gap-4">
                                <span>
                                    <span className="block text-sm font-semibold">Necessary</span>
                                    <span className="mt-0.5 block text-[12px] text-black/45">
                                        Required for security and basic operation. Always on.
                                    </span>
                                </span>
                                <input type="checkbox" checked disabled className="mt-1" />
                            </label>

                            <label className="flex items-start justify-between gap-4">
                                <span>
                                    <span className="block text-sm font-semibold">Preferences</span>
                                    <span className="mt-0.5 block text-[12px] text-black/45">
                                        Remember choices such as consent status.
                                    </span>
                                </span>
                                <input
                                    type="checkbox"
                                    className="mt-1 accent-[#f56616]"
                                    checked={prefs.preferences}
                                    onChange={(e) =>
                                        setPrefs((p) => ({ ...p, preferences: e.target.checked }))
                                    }
                                />
                            </label>

                            <label className="flex items-start justify-between gap-4">
                                <span>
                                    <span className="block text-sm font-semibold">Functionality</span>
                                    <span className="mt-0.5 block text-[12px] text-black/45">
                                        Enhance features and remember UI settings.
                                    </span>
                                </span>
                                <input
                                    type="checkbox"
                                    className="mt-1 accent-[#f56616]"
                                    checked={prefs.functionality}
                                    onChange={(e) =>
                                        setPrefs((p) => ({ ...p, functionality: e.target.checked }))
                                    }
                                />
                            </label>

                            <label className="flex items-start justify-between gap-4">
                                <span>
                                    <span className="block text-sm font-semibold">Analytics</span>
                                    <span className="mt-0.5 block text-[12px] text-black/45">
                                        Help us understand traffic (only if you enable later tools).
                                    </span>
                                </span>
                                <input
                                    type="checkbox"
                                    className="mt-1 accent-[#f56616]"
                                    checked={prefs.analytics}
                                    onChange={(e) =>
                                        setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                                    }
                                />
                            </label>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-1 border-t border-black/10 px-4 pb-2 pt-3 sm:flex-row-reverse sm:items-center sm:justify-between sm:gap-2 sm:px-6 sm:py-4">
                    <div className="flex gap-2 sm:flex-wrap">
                        <button
                            type="button"
                            onClick={onReject}
                            className="min-h-11 flex-1 rounded-full border border-black/15 bg-white px-4 py-2.5 text-[13px] font-semibold text-black/70 transition-colors hover:border-black/30 sm:min-h-0 sm:flex-none sm:text-[12px]"
                        >
                            Essential only
                        </button>

                        {openPrefs ? (
                            <button
                                type="button"
                                onClick={onSavePrefs}
                                className="min-h-11 flex-1 rounded-full bg-[#171717] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#f56616] sm:min-h-0 sm:flex-none sm:text-[12px]"
                            >
                                Save choices
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onAcceptAll}
                                className="min-h-11 flex-1 rounded-full bg-[#f56616] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#171717] sm:min-h-0 sm:flex-none sm:text-[12px]"
                            >
                                Accept all
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpenPrefs((v) => !v)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 text-[12px] font-semibold text-black/50 transition-colors hover:text-[#171717] sm:min-h-0 sm:justify-start"
                    >
                        <Settings2 size={14} />
                        {openPrefs ? "Hide preferences" : "Customise"}
                    </button>
                </div>
            </div>
        </div>
    );
}