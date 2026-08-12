import { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminAuthProvider } from "@/components/admin/auth-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
