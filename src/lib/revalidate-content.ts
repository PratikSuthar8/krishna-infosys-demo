import { revalidatePath } from "next/cache";

/**
 * Refresh cached public pages after an admin edit, so changes appear at once
 * instead of waiting for the hourly revalidation.
 */
export function refreshPublicContent(kind: "blog" | "jobs") {
  try {
    if (kind === "blog") {
      revalidatePath("/blog");
      revalidatePath("/blog/[slug]", "page");
    } else {
      revalidatePath("/careers");
      revalidatePath("/careers/[slug]", "page");
    }
    revalidatePath("/sitemap.xml");
  } catch (e) {
    console.error("revalidate failed", e);
  }
}
