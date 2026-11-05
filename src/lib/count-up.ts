import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Counts every `[data-count]` element up from 0 when it scrolls into view
 * (same behaviour as the home page "proven scale" numbers).
 *
 * The final number is rendered in the HTML, so the page is correct without JS
 * and for people who prefer reduced motion. Call this inside a `gsap.context()`
 * so the triggers are cleaned up with the section.
 */
export function setupCountUps(scope: Element, start = "top 86%") {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count ?? 0);
    const decimals = Number(el.dataset.decimals ?? 0);
    const format = (value: number) =>
      decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString("en-IN");

    const counter = { value: 0 };
    el.textContent = format(0);

    gsap.to(counter, {
      value: target,
      duration: 1.7,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start, once: true },
      onUpdate: () => {
        el.textContent = format(counter.value);
      },
      onComplete: () => {
        el.textContent = format(target);
      },
    });
  });
}
