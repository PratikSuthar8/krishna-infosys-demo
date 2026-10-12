export type AnalyticsEvent =
  | "submit_brief"
  | "click_phone"
  | "click_email"
  | "click_whatsapp";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  name: AnalyticsEvent,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params || {});
  } catch {
    // ignore
  }
}
