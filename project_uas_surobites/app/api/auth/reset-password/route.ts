import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { findValidReset } from "@/lib/password-reset";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  const token = typeof data?.token === "string" ? data.token : "";
  const password = typeof data?.password === "string" ? data.password : "";

  if (password.length < 6 || password.length > 1024) {
    return Response.json({ message: "Password minimal 6 karakter." }, { status: 400 });
  }

  try {
    const reset = await findValidReset(token);
    if (!reset) {
      return Response.json(
        { message: "Link reset tidak valid atau sudah kedaluwarsa. Silakan minta link baru." },
        { status: 400 },
      );
    }

    // ganti password + hapus semua token reset user ini, jadi link-nya cuma bisa dipakai sekali
    await prisma.$transaction([
      prisma.user.update({
        where: { id: reset.userId },
        data: { passwordHash: hashPassword(password) },
      }),
      prisma.passwordReset.deleteMany({ where: { userId: reset.userId } }),
    ]);

    return Response.json({ message: "Password berhasil diubah. Silakan login dengan password baru." });
  } catch (error) {
    console.error("reset-password gagal:", error);
    return Response.json({ message: "Gagal mengubah password. Coba lagi nanti." }, { status: 500 });
  }
}
