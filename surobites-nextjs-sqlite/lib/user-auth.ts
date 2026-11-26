import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { USER_COOKIE, readUserId, sign } from "@/lib/user-token";

const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 hari

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

// user yang lagi login, null kalau belum login / cookie gak valid
export async function getCurrentUser() {
  try {
    const token = (await cookies()).get(USER_COOKIE)?.value;
    const userId = token ? readUserId(token) : null;
    if (!userId) return null;

    return await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, image: true },
    });
  } catch (error) {
    // dicatat di terminal biar ketauan kalau ada masalah (mis. lupa restart server habis prisma generate)
    console.error("getCurrentUser gagal:", error);
    return null;
  }
}
