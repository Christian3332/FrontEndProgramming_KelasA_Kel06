import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { getCurrentUser } from "@/lib/user-auth";

export const dynamic = "force-dynamic";

// dipakai navbar buat tau user siapa yang lagi login
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "Belum login." }, { status: 401 });
  }
  return Response.json(user);
}

// edit profil: nama, email, foto, dan (opsional) ganti password
export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "Belum login." }, { status: 401 });
  }

  const data = await request.json().catch(() => null);
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";
  const image = typeof data?.image === "string" ? data.image : "";
  const currentPassword = typeof data?.currentPassword === "string" ? data.currentPassword : "";
  const newPassword = typeof data?.newPassword === "string" ? data.newPassword : "";

  if (!name || name.length > 100) {
    return Response.json({ message: "Nama wajib diisi (maks. 100 karakter)." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return Response.json({ message: "Format email tidak valid." }, { status: 400 });
  }
  // foto cuma boleh dari hasil upload kita sendiri (atau kosong = hapus foto)
  if (image && !/^\/uploads\/[\w-]+\.(jpg|png|webp)$/.test(image)) {
    return Response.json({ message: "Foto profil tidak valid." }, { status: 400 });
  }

  const emailOwner = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (emailOwner && emailOwner.id !== user.id) {
    return Response.json({ message: "Email sudah dipakai akun lain." }, { status: 409 });
  }

  let passwordHash: string | undefined;
  if (newPassword) {
    if (newPassword.length < 6 || newPassword.length > 1024) {
      return Response.json({ message: "Password baru minimal 6 karakter." }, { status: 400 });
    }

    // ganti password wajib masukin password lama dulu
    const account = await prisma.user.findUnique({ where: { id: user.id }, select: { passwordHash: true } });
    if (!account || !verifyPassword(currentPassword, account.passwordHash)) {
      return Response.json({ message: "Password lama salah." }, { status: 400 });
    }
    passwordHash = hashPassword(newPassword);
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { name, email, image: image || null, passwordHash },
    select: { id: true, name: true, email: true, image: true },
  });

  return Response.json(updated);
}
