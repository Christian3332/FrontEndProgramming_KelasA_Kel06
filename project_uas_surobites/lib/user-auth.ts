import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const USER_COOKIE = "surobites_user_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 hari

function getSecret() {
  // kalau belum ada USER_SESSION_SECRET di .env, pinjem secret admin aja
  const secret = process.env.USER_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("USER_SESSION_SECRET / ADMIN_SESSION_SECRET minimal 32 karakter.");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

// isi cookie: payload.signature, jadi kalau diubah-ubah di browser langsung ketahuan
export async function createUserSession(userId: number) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  const payload = Buffer.from(JSON.stringify({ userId, expiresAt })).toString("base64url");

  (await cookies()).set(USER_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function clearUserSession() {
  (await cookies()).delete(USER_COOKIE);
}

function readUserId(token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (typeof session?.userId !== "number" || typeof session?.expiresAt !== "number") return null;
  if (session.expiresAt <= Math.floor(Date.now() / 1000)) return null;

  return session.userId as number;
}

// user yang lagi login, null kalau belum login / cookie gak valid
export async function getCurrentUser() {
  try {
    const token = (await cookies()).get(USER_COOKIE)?.value;
    const userId = token ? readUserId(token) : null;
    if (!userId) return null;

    return await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
  } catch {
    return null;
  }
}
