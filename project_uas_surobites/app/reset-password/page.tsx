import type { Metadata } from "next";
import Link from "next/link";
import { findValidReset } from "@/lib/password-reset";
import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-login.module.css";

export const metadata: Metadata = {
  title: "Reset Password | SuroBites",
};

type Props = { searchParams: Promise<{ token?: string | string[] }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const value = typeof token === "string" ? token : "";

  // cek token dulu di server, biar user gak capek isi form kalau link-nya ternyata udah gak berlaku
  const reset = await findValidReset(value).catch(() => null);

  return (
    <main className={`d-flex align-items-center justify-content-center min-vh-100 ${styles.panel}`} id="main-content">
      {reset ? (
        <ResetPasswordForm token={value} />
      ) : (
        <AuthCard title="Link Tidak Berlaku" text="Link reset password ini salah, sudah dipakai, atau sudah kedaluwarsa.">
          <Link href="/forgot-password" className={`btn w-100 ${ui.btn} ${ui.btnPrimary} ${styles.submit}`}>
            Minta Link Baru
          </Link>
        </AuthCard>
      )}
    </main>
  );
}
