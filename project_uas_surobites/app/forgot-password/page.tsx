import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user-auth";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import styles from "@/app/styles/admin-login.module.css";

export const metadata: Metadata = {
  title: "Lupa Password | SuroBites",
};

export default async function ForgotPasswordPage() {
  if (await getCurrentUser()) redirect("/");

  return (
    <main className={`d-flex align-items-center justify-content-center min-vh-100 ${styles.panel}`} id="main-content">
      <ForgotPasswordForm />
    </main>
  );
}
