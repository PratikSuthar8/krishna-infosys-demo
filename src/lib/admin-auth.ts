import { auth } from "@/auth";

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await auth();
  return !!session?.user;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
