import "server-only";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "surobites_admin_session";
const SESSION_DURATION = 60 * 30;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET harus berisi minimal 32 karakter.");
  }

  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");

  if (!/^[a-f0-9]{32}$/i.test(salt) || !/^[a-f0-9]{128}$/i.test(storedHash)) {
    return false;
  }

  const actualHash = scryptSync(password, salt, 64).toString("hex");
  const actualBuffer = Buffer.from(actualHash, "hex");
  const storedBuffer = Buffer.from(storedHash, "hex");

  return actualBuffer.length === storedBuffer.length && timingSafeEqual(actualBuffer, storedBuffer);
}

export async function authenticateAdmin(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return null;
  }

  return admin.id;
}

export async function createAdminSession(adminId: number) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  const payload = Buffer.from(JSON.stringify({ adminId, expiresAt })).toString("base64url");
  const token = `${payload}.${sign(payload)}`;

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

async function getAdminSessionId() {
  try {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (!token) return null;

    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expected = Buffer.from(sign(payload));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

    const session: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session || typeof session !== "object") return null;

    const values = session as Record<string, unknown>;
    if (
      typeof values.adminId !== "number" ||
      !Number.isInteger(values.adminId) ||
      values.adminId < 1 ||
      typeof values.expiresAt !== "number" ||
      !Number.isInteger(values.expiresAt) ||
      values.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    const admin = await prisma.admin.findUnique({
      where: { id: values.adminId },
      select: { id: true },
    });

    return admin?.id ?? null;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated() {
  return (await getAdminSessionId()) !== null;
}

// username admin yang lagi login, null kalau belum login
export async function getAdminUsername() {
  const adminId = await getAdminSessionId();
  if (!adminId) return null;

  const admin = await prisma.admin.findUnique({ where: { id: adminId }, select: { username: true } });
  return admin?.username ?? null;
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const adminId = await getAdminSessionId();
  if (!adminId) return "unauthorized" as const;

  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) return "unauthorized" as const;
  if (!verifyPassword(currentPassword, admin.passwordHash)) {
    return "invalid-password" as const;
  }

  const salt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(newPassword, salt, 64).toString("hex");
  await prisma.admin.update({ where: { id: adminId }, data: { passwordHash: `${salt}:${passwordHash}` } });

  return "success" as const;
}
