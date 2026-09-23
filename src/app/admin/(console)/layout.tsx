import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getCurrentAdmin, getSessionEmail } from "@/lib/admin-auth";
import { getCollection } from "@/lib/mongodb";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await getSessionEmail();
  if (email) {
    const col = await getCollection("admin_users");
    const doc = await col.findOne({ email: email.toLowerCase() });
    if (doc && doc.mustChangePassword === true) {
      redirect("/admin/change-password");
    }
  }
  return <AdminShell>{children}</AdminShell>;
}
