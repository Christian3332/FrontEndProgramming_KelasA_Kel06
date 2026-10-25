"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginStatus } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const loggedIn = useLoginStatus();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loggedIn === false) {
      router.replace("/admin/login?pesan=login");
    }
  }, [loggedIn, router]);

  // dashboard belum ditampilkan sebelum pasti sudah login
  if (!loggedIn) {
    return null;
  }

  return (
    <>
      <a className="skip-link visually-hidden-focusable" href="#admin-main">
        Langsung ke konten utama
      </a>

      <div className={`d-flex min-vh-100 ${styles.layout}`}>
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className={`d-flex flex-column ${styles.mainWrap}`}>
          <AdminTopbar
            sidebarOpen={sidebarOpen}
            onOpenSidebar={() => setSidebarOpen(true)}
          />

          <main id="admin-main" className={styles.content}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
