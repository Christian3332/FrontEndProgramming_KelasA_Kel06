import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createUserSession } from "@/lib/user-auth";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";
  const password = typeof data?.password === "string" ? data.password : "";

  if (!name || name.length > 100) {
    return Response.json({ message: "Nama wajib diisi (maks. 100 karakter)." }, { status: 400 });
  }
  // cek format email yang simpel aja: ada @ dan titik
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return Response.json({ message: "Format email tidak valid." }, { status: 400 });
  }
  if (password.length < 6 || password.length > 1024) {
    return Response.json({ message: "Password minimal 6 karakter." }, { status: 400 });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ message: "Email sudah terdaftar. Silakan login." }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashPassword(password) },
    });

    // habis daftar langsung dianggap login biar gak perlu isi form lagi
    await createUserSession(user.id);
    return Response.json({ message: "Pendaftaran berhasil." }, { status: 201 });
  } catch {
    return Response.json({ message: "Pendaftaran gagal. Coba lagi nanti." }, { status: 500 });
  }
}
