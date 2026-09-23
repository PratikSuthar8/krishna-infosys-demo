import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";
import { getCollection } from "@/lib/mongodb";
import { hashPassword, requirePermission } from "@/lib/admin-auth";
import type { AdminRole } from "@/lib/permissions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROLES: AdminRole[] = ["superadmin", "admin", "editor", "sales", "viewer"];

function err(error: unknown) {
  const message = error instanceof Error ? error.message : "Error";
  const status =
    message === "Unauthorized" ? 401 : message === "Forbidden" ? 403 : 500;
  return NextResponse.json({ ok: false, error: message }, { status });
}

/** Readable temp password: 12 chars, no ambiguous symbols */
function generateTempPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = randomBytes(12);
  let out = "";
  for (let i = 0; i < 12; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

export async function GET() {
  try {
    await requirePermission("users:read");
    const col = await getCollection("admin_users");
    const items = await col
      .find({})
      .project({ passwordHash: 0 })
      .sort({ email: 1 })
      .toArray();
    return NextResponse.json({
      ok: true,
      items: items.map((i) => ({ ...i, _id: String(i._id) })),
    });
  } catch (e) {
    return err(e);
  }
}

export async function POST(request: Request) {
  try {
    const me = await requirePermission("users:write");
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    let role = (body.role || "viewer") as AdminRole;
    if (ROLES.indexOf(role) < 0) role = "viewer";
    if (role === "superadmin" && me.role !== "superadmin") {
      return NextResponse.json(
        { ok: false, error: "Only superadmin can create superadmin." },
        { status: 403 },
      );
    }
    if (!email) {
      return NextResponse.json({ ok: false, error: "Email required." }, { status: 400 });
    }

    const col = await getCollection("admin_users");
    const exists = await col.findOne({ email });
    if (exists) {
      return NextResponse.json({ ok: false, error: "User already exists." }, { status: 409 });
    }

    const tempPassword = generateTempPassword();
    const result = await col.insertOne({
      email,
      name: name || email,
      role,
      active: true,
      mustChangePassword: true,
      grantPermissions: Array.isArray(body.grantPermissions) ? body.grantPermissions : [],
      denyPermissions: Array.isArray(body.denyPermissions) ? body.denyPermissions : [],
      attributes: body.attributes && typeof body.attributes === "object" ? body.attributes : {},
      passwordHash: await hashPassword(tempPassword),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // tempPassword returned ONCE — never stored in plain text
    return NextResponse.json({
      ok: true,
      id: String(result.insertedId),
      tempPassword,
    });
  } catch (e) {
    return err(e);
  }
}

export async function PUT(request: Request) {
  try {
    const me = await requirePermission("users:write");
    const body = await request.json();
    const id = String(body.id || "");
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
    }
    const $set: Record<string, unknown> = { updatedAt: new Date() };
    if (body.name !== undefined) $set.name = String(body.name).trim();
    if (body.role !== undefined) {
      let role = body.role as AdminRole;
      if (ROLES.indexOf(role) < 0) {
        return NextResponse.json({ ok: false, error: "Invalid role" }, { status: 400 });
      }
      if (role === "superadmin" && me.role !== "superadmin") {
        return NextResponse.json(
          { ok: false, error: "Only superadmin can assign superadmin." },
          { status: 403 },
        );
      }
      $set.role = role;
    }
    if (typeof body.active === "boolean") {
      if (me._id === id && body.active === false) {
        return NextResponse.json(
          { ok: false, error: "Cannot deactivate your own account." },
          { status: 400 },
        );
      }
      $set.active = body.active;
    }
    if (Array.isArray(body.grantPermissions)) $set.grantPermissions = body.grantPermissions;
    if (Array.isArray(body.denyPermissions)) $set.denyPermissions = body.denyPermissions;
    if (body.attributes && typeof body.attributes === "object") $set.attributes = body.attributes;

    // Admin can reset to a NEW temp password
    let tempPassword: string | undefined;
    if (body.resetPassword === true) {
      tempPassword = generateTempPassword();
      $set.passwordHash = await hashPassword(tempPassword);
      $set.mustChangePassword = true;
    }

    const col = await getCollection("admin_users");
    await col.updateOne({ _id: new ObjectId(id) }, { $set });
    return NextResponse.json({
      ok: true,
      ...(tempPassword ? { tempPassword } : {}),
    });
  } catch (e) {
    return err(e);
  }
}

export async function DELETE(request: Request) {
  try {
    const me = await requirePermission("users:write");
    const id = new URL(request.url).searchParams.get("id") || "";
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
    }
    if (me._id === id) {
      return NextResponse.json(
        { ok: false, error: "Cannot delete your own account." },
        { status: 400 },
      );
    }
    const col = await getCollection("admin_users");
    const target = await col.findOne({ _id: new ObjectId(id) });
    if (target && target.role === "superadmin" && me.role !== "superadmin") {
      return NextResponse.json(
        { ok: false, error: "Cannot delete superadmin." },
        { status: 403 },
      );
    }
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return err(e);
  }
}
