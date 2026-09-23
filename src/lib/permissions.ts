export const PERMISSIONS = [
  "dashboard:read",
  "users:read",
  "users:write",
  "jobs:read",
  "jobs:write",
  "blog:read",
  "blog:write",
  "leads:read",
  "leads:write",
  "applications:read",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export type AdminRole =
  | "superadmin"
  | "admin"
  | "editor"
  | "sales"
  | "viewer";

/** Base grants per role (RBAC) */
export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  superadmin: [...PERMISSIONS],
  admin: [
    "dashboard:read",
    "jobs:read",
    "jobs:write",
    "blog:read",
    "blog:write",
    "leads:read",
    "leads:write",
    "applications:read",
    "users:read",
  ],
  editor: [
    "dashboard:read",
    "jobs:read",
    "jobs:write",
    "blog:read",
    "blog:write",
    "applications:read",
  ],
  sales: ["dashboard:read", "leads:read", "leads:write"],
  viewer: [
    "dashboard:read",
    "jobs:read",
    "blog:read",
    "leads:read",
    "applications:read",
  ],
};

export type AdminAttributes = {
  department?: string;
  canExport?: boolean;
  maxLeadValue?: number;
};

export function resolvePermissions(
  role: AdminRole,
  extraGrant: string[] = [],
  extraDeny: string[] = [],
): Permission[] {
  const base = new Set<string>(ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.viewer);
  for (const p of extraGrant) base.add(p);
  for (const p of extraDeny) base.delete(p);
  return PERMISSIONS.filter((p) => base.has(p));
}

export function can(perms: string[], need: Permission | Permission[]) {
  const needList = Array.isArray(need) ? need : [need];
  return needList.every((p) => perms.includes(p));
}
