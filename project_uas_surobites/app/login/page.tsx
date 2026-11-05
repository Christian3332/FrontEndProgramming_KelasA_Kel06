import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user-auth";
import AuthForm from "@/components/auth/AuthForm";
import styles from "@/app/styles/admin-login.module.css";

export const metadata: Metadata = {
  title: "Login | SuroBites",
};

export default async function LoginPage() {
  // udah login? langsung balik ke beranda
  if (await getCurrentUser()) redirect("/");

  return (
    <main className={`d-flex align-items-center justify-content-center min-vh-100 ${styles.panel}`} id="main-content">
      <Suspense>
        <AuthForm mode="login" />
      </Suspense>
    </main>
  );
}
