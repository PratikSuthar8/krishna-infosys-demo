"use client";

import { useEffect, useRef } from "react";

/** Log out after idleMs of no user activity (default 15 min). */
export function IdleLogout({ idleMs = 15 * 60 * 1000 }: { idleMs?: number }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/admin/logout", { method: "POST" });
      } catch {
        /* ignore */
      }
      window.location.href = "/admin/login?reason=idle";
    };

    const reset = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(logout, idleMs);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ] as const;

    for (const ev of events) {
      window.addEventListener(ev, reset, { passive: true });
    }

    // If tab hidden for longer than idle window, logout when they return
    const onVis = () => {
      if (document.visibilityState === "visible") {
        reset();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    reset();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      for (const ev of events) {
        window.removeEventListener(ev, reset);
      }
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [idleMs]);

  return null;
}
