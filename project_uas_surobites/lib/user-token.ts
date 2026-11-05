import { createHmac, timingSafeEqual } from "node:crypto";

// sengaja dipisah dari user-auth.ts (gak pakai prisma/next/headers) biar bisa dipakai juga di proxy.ts
export const USER_COOKIE = "surobites_user_session";

function getSecret() {
  // kalau belum ada USER_SESSION_SECRET di .env, pinjem secret admin aja
  const secret = process.env.USER_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("USER_SESSION_SECRET / ADMIN_SESSION_SECRET minimal 32 karakter.");
  }
  return secret;
}

export function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

// balikin id user kalau token valid & belum expired, selain itu null
export function readUserId(token: string) {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expected = Buffer.from(sign(payload));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof session?.userId !== "number" || typeof session?.expiresAt !== "number") return null;
    if (session.expiresAt <= Math.floor(Date.now() / 1000)) return null;

    return session.userId as number;
  } catch {
    return null;
  }
}
