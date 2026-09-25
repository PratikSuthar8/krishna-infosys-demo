import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";
import { getCollection } from "@/lib/mongodb";
import { hashPassword, requirePermission } from "@/lib/admin-auth";
import type { AdminRole } from "@/lib/permissions";
import { ROLE_PERMISSIONS } from "@/lib/permissions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROLES: AdminRole[] = ["superadmin", "admin", "editor", "sales", "viewer"];

function err(error: unknown) {
  const message = error instanceof Error ? error.message : "Error";
  const status =
    message === "Unauthorized" ? 401 : message === "Forbidden" ? 403 : 500;
  return NextResponse.json({ ok: false, error: message }, { status });
}

function generateTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = randomBytes(12);
  let out = "";
  for (let i = 0; i < 12; i++) out += chars[bytes[i] % chars.length];
  return out;
}

function publicUser(doc: Record<string, unknown>) {
  return {
    _id: String(doc._id),
    email: doc.email,
    name: doc.name,
    role: doc.role,
    active: doc.active !== false,
    mustChangePassword: doc.mustChangePassword === true,
    mfaEnabled: doc.mfaEnabled === true,
    lastLoginAt: doc.lastLoginAt || null,
    createdAt: doc.createdAt || null,
    updatedAt: doc.updatedAt || null,
  };
}

async function countSuperadmins() {
  const col = await getCollection("admin_users");
  return col.countDocuments({ role: "superadmin", active: { $ne: false } });
}

export async function GET() {
  try {
    await requirePermission("users:read");
    const col = await getCollection("admin_users");
    const items = await col
      .find({})
      .project({ passwordHash: 0, mfaSecret: 0, mfaSecretPending: 0 })
      .sort({ createdAt: -1, name: 1 })
      .toArray();
    return NextResponse.json({
      ok: true,
      items: items.map((d) => publicUser(d as Record<string, unknown>)),
      roles: ROLES,
      rolePermissions: ROLE_PERMISSIONS,
    });
  } catch (error) {
    return err(error);
  }
}

export async function POST(request: Request) {
  try {
    const me = await requirePermission("users:write");
    const body = await request.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const name = String(body.name || "").trim();
    const role = (String(body.role || "editor") as AdminRole);
    const active = body.active !== false;

    if (!email || !name) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 },
      );
    }
    if (!ROLES.includes(role)) {
      return NextResponse.json({ ok: false, error: "Invalid role." }, { status: 400 });
    }
    if (role === "superadmin" && me.role !== "superadmin") {
      return NextResponse.json(
        { ok: false, error: "Only superadmin can create superadmin." },
        { status: 403 },
      );
    }

    const col = await getCollection("admin_users");
    const exists = await col.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "A user with this email already exists." },
        { status: 409 },
      );
    }

    const tempPassword = generateTempPassword();
    const now = new Date();
    const doc = {
      email,
      name,
      role,
      active,
      mustChangePassword: true,
      mfaEnabled: false,
      mfaSecret: null,
      passwordHash: await hashPassword(tempPassword),
      createdAt: now,
      updatedAt: now,
      createdBy: me.email || String((me as { _id?: string })._id || ""),
    };
    const result = await col.insertOne(doc);

    return NextResponse.json({
      ok: true,
      id: String(result.insertedId),
      tempPassword,
      user: publicUser({ ...doc, _id: result.insertedId }),
    });
  } catch (error) {
    return err(error);
  }
}

export async function PUT(request: Request) {
  try {
    const me = await requirePermission("users:write");
    const body = await request.json();
    const id = String(body.id || "").trim();
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 400 });
    }

    const col = await getCollection("admin_users");
    const target = await col.findOne({ _id: new ObjectId(id) });
    if (!target) {
      return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });
    }

    const meId = String((me as { _id?: string; id?: string })._id || (me as { id?: string }).id || "");
    const isSelf =
      (meId && String(target._id) === meId) ||
      String(target.email || "").toLowerCase() === String(me.email || "").toLowerCase();

    const $set: Record<string, unknown> = { updatedAt: new Date() };
    let tempPassword: string | undefined;

    // --- profile fields ---
    if (body.name !== undefined) {
      const name = String(body.name).trim();
      if (!name) {
        return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
      }
      $set.name = name;
    }

    if (body.role !== undefined) {
      const role = String(body.role) as AdminRole;
      if (!ROLES.includes(role)) {
        return NextResponse.json({ ok: false, error: "Invalid role." }, { status: 400 });
      }
      if (role === "superadmin" && me.role !== "superadmin") {
        return NextResponse.json(
          { ok: false, error: "Only superadmin can assign superadmin." },
          { status: 403 },
        );
      }
      if (isSelf && me.role === "superadmin" && role !== "superadmin") {
        const n = await countSuperadmins();
        if (n <= 1) {
          return NextResponse.json(
            { ok: false, error: "Cannot demote the last active superadmin." },
            { status: 400 },
          );
        }
      }
      if (target.role === "superadmin" && role !== "superadmin" && me.role !== "superadmin") {
        return NextResponse.json(
          { ok: false, error: "Only superadmin can change a superadmin role." },
          { status: 403 },
        );
      }
      $set.role = role;
    }

    if (body.active !== undefined) {
      const active = body.active !== false;
      if (isSelf && !active) {
        return NextResponse.json(
          { ok: false, error: "You cannot deactivate your own account." },
          { status: 400 },
        );
      }
      if (target.role === "superadmin" && !active) {
        const n = await countSuperadmins();
        if (n <= 1) {
          return NextResponse.json(
            { ok: false, error: "Cannot deactivate the last active superadmin." },
            { status: 400 },
          );
        }
      }
      $set.active = active;
    }

    // --- reset password ---
    if (body.resetPassword === true) {
      tempPassword = generateTempPassword();
      $set.passwordHash = await hashPassword(tempPassword);
      $set.mustChangePassword = true;
    }

    // --- reset MFA ---
    if (body.resetMfa === true) {
      $set.mfaEnabled = false;
      $set.mfaSecret = null;
      $set.mfaSecretPending = null;
    }

    await col.updateOne({ _id: new ObjectId(id) }, { $set });
    const updated = await col.findOne(
      { _id: new ObjectId(id) },
      { projection: { passwordHash: 0, mfaSecret: 0, mfaSecretPending: 0 } },
    );

    return NextResponse.json({
      ok: true,
      ...(tempPassword ? { tempPassword } : {}),
      user: updated ? publicUser(updated as Record<string, unknown>) : null,
    });
  } catch (error) {
    return err(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const me = await requirePermission("users:write");
    const url = new URL(request.url);
    let id = url.searchParams.get("id") || "";
    if (!id) {
      try {
        const body = await request.json();
        id = String(body.id || "");
      } catch {
        /* no body */
      }
    }
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 400 });
    }

    const col = await getCollection("admin_users");
    const target = await col.findOne({ _id: new ObjectId(id) });
    if (!target) {
      return NextResponse.json({ ok: false, error: "User not found." }, { status: 404 });
    }

    const meId = String((me as { _id?: string; id?: string })._id || (me as { id?: string }).id || "");
    const isSelf =
      (meId && String(target._id) === meId) ||
      String(target.email || "").toLowerCase() === String(me.email || "").toLowerCase();

    if (isSelf) {
      return NextResponse.json(
        { ok: false, error: "You cannot delete your own account." },
        { status: 400 },
      );
    }
    if (target.role === "superadmin") {
      if (me.role !== "superadmin") {
        return NextResponse.json(
          { ok: false, error: "Only superadmin can delete a superadmin." },
          { status: 403 },
        );
      }
      const n = await countSuperadmins();
      if (n <= 1) {
        return NextResponse.json(
          { ok: false, error: "Cannot delete the last active superadmin." },
          { status: 400 },
        );
      }
    }

    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return err(error);
  }
}
