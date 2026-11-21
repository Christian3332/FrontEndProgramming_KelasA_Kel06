import "server-only";
import nodemailer from "nodemailer";

type Mail = { to: string; subject: string; text: string; html: string };

// kirim email lewat SMTP (isi SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM di .env)
// kalau SMTP belum diatur, isi email dicetak di terminal aja biar tetap bisa dites waktu development
export async function sendMail({ to, subject, text, html }: Mail) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP_HOST belum diatur, email tidak bisa dikirim.");
    }
    console.info(`\n[email dev] ke: ${to}\n[email dev] subjek: ${subject}\n${text}\n`);
    return;
  }

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL langsung, 587 = STARTTLS
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: SMTP_FROM ?? SMTP_USER ?? "SuroBites <no-reply@surobites.local>",
    to,
    subject,
    text,
    html,
  });
}
