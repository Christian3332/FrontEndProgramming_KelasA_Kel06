"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
