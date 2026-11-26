import { changeAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ message: "Data password tidak valid." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const currentPassword = typeof data.currentPassword === "string" ? data.currentPassword : "";
  const newPassword = typeof data.newPassword === "string" ? data.newPassword : "";
  const confirmPassword = typeof data.confirmPassword === "string" ? data.confirmPassword : "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    return Response.json({ message: "Semua kolom password wajib diisi." }, { status: 400 });
  }

  if (currentPassword.length > 1024 || newPassword.length > 1024) {
    return Response.json({ message: "Password terlalu panjang." }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return Response.json({ message: "Password baru harus memiliki minimal 8 karakter." }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return Response.json({ message: "Konfirmasi password baru tidak sama." }, { status: 400 });
  }

  try {
    const result = await changeAdminPassword(currentPassword, newPassword);

    if (result === "unauthorized") {
      return Response.json({ message: "Sesi admin sudah berakhir. Silakan login kembali." }, { status: 401 });
    }

    if (result === "invalid-password") {
      return Response.json({ message: "Password saat ini salah." }, { status: 400 });
    }

    return Response.json({ message: "Password admin berhasil diubah." });
  } catch {
    return Response.json({ message: "Password gagal diubah. Silakan coba lagi." }, { status: 500 });
  }
}
