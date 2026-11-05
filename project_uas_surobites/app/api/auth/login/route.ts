import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createUserSession } from "@/lib/user-auth";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  const email = typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";
  const password = typeof data?.password === "string" ? data.password : "";

  if (!email || !password || password.length > 1024) {
    return Response.json({ message: "Email dan password wajib diisi." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // pesan errornya sengaja disamain, biar orang gak bisa nebak email mana yang terdaftar
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return Response.json({ message: "Email atau password salah." }, { status: 401 });
    }

    await createUserSession(user.id);
    return Response.json({ message: "Login berhasil." });
  } catch {
    return Response.json({ message: "Login gagal. Coba lagi nanti." }, { status: 500 });
  }
}
