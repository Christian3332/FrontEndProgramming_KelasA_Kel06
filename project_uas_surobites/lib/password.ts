import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// format yang disimpan di database: "salt:hash" (sama kayak password admin)
export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");
  if (!salt || !storedHash) return false;

  const actual = scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHash, "hex");

  // timingSafeEqual biar waktu cek password gak bisa dipakai buat nebak
  return actual.length === stored.length && timingSafeEqual(actual, stored);
}
