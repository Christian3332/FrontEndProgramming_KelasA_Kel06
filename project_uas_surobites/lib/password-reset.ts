import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const RESET_DURATION_MINUTES = 30;
// jeda minimal antar permintaan reset per akun, biar gak dipakai buat nyepam email orang
const RESEND_COOLDOWN_SECONDS = 60;

// yang masuk database cuma hash-nya, jadi kalau database bocor token-nya tetap gak bisa dipakai
export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

// bikin token baru buat user, balikin null kalau barusan aja minta (masih cooldown)
export async function createResetToken(userId: number) {
  const latest = await prisma.passwordReset.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  if (latest && Date.now() - latest.createdAt.getTime() < RESEND_COOLDOWN_SECONDS * 1000) {
    return null;
  }

  const token = randomBytes(32).toString("base64url");

  // token lama dihapus, jadi yang berlaku cuma link paling baru
  await prisma.$transaction([
    prisma.passwordReset.deleteMany({ where: { userId } }),
    prisma.passwordReset.create({
      data: {
        userId,
        tokenHash: hashResetToken(token),
        expiresAt: new Date(Date.now() + RESET_DURATION_MINUTES * 60 * 1000),
      },
    }),
  ]);

  return token;
}

// cari data reset yang masih berlaku, null kalau token salah / sudah kedaluwarsa
export async function findValidReset(token: string) {
  if (!token || token.length > 200) return null;

  const reset = await prisma.passwordReset.findUnique({
    where: { tokenHash: hashResetToken(token) },
  });
  if (!reset || reset.expiresAt <= new Date()) return null;
  return reset;
}

// alamat dasar buat link di email. APP_URL diutamakan biar gak bisa dibelokin lewat header Host
export function getAppUrl(request: Request) {
  const fromEnv = process.env.APP_URL?.replace(/\/+$/, "");
  return fromEnv || new URL(request.url).origin;
}
