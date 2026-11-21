import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { RESET_DURATION_MINUTES, createResetToken, getAppUrl } from "@/lib/password-reset";

// pesannya selalu sama, biar orang gak bisa ngecek email mana yang terdaftar
const GENERIC_MESSAGE = "Kalau email tersebut terdaftar, link untuk reset password sudah kami kirim. Cek inbox atau folder spam.";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  const email = typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return Response.json({ message: "Format email tidak valid." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return Response.json({ message: GENERIC_MESSAGE });

    const token = await createResetToken(user.id);
    if (!token) return Response.json({ message: GENERIC_MESSAGE }); // masih cooldown, gak kirim ulang

    const link = `${getAppUrl(request)}/reset-password?token=${encodeURIComponent(token)}`;

    await sendMail({
      to: user.email,
      subject: "Reset password akun SuroBites",
      text:
        `Halo ${user.name},\n\n` +
        `Kami menerima permintaan untuk reset password akun SuroBites kamu.\n` +
        `Buka link berikut untuk membuat password baru (berlaku ${RESET_DURATION_MINUTES} menit):\n\n${link}\n\n` +
        `Kalau kamu tidak merasa meminta reset password, abaikan saja email ini.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
          <p>Halo <b>${escapeHtml(user.name)}</b>,</p>
          <p>Kami menerima permintaan untuk reset password akun SuroBites kamu.
             Klik tombol di bawah untuk membuat password baru. Link ini berlaku ${RESET_DURATION_MINUTES} menit.</p>
          <p><a href="${link}" style="display: inline-block; padding: 12px 22px; border-radius: 10px; background: #0D47A1; color: #fff; text-decoration: none; font-weight: bold;">Reset Password</a></p>
          <p style="font-size: 13px; color: #555;">Atau salin link ini ke browser:<br>${link}</p>
          <p style="font-size: 13px; color: #555;">Kalau kamu tidak merasa meminta reset password, abaikan saja email ini.</p>
        </div>`,
    });

    return Response.json({ message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("forgot-password gagal:", error);
    return Response.json({ message: "Gagal mengirim email reset. Coba lagi nanti." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}
