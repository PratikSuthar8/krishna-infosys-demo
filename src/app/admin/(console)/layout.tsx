import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userLabel = session?.user?.email || session?.user?.name || null;
  return <AdminShell userLabel={userLabel}>{children}</AdminShell>;
}
