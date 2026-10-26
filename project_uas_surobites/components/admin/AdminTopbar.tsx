"use client";

import { usePathname } from "next/navigation";
import { Button } from "react-bootstrap";
import { admin } from "@/data/admin";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

const sectionTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/dashboard/makanan": "Kelola Makanan",
  "/admin/dashboard/rekomendasi": "Kelola Rekomendasi",
  "/admin/dashboard/warung": "Kelola Warung",
  "/admin/dashboard/faq": "Kelola FAQ",
  "/admin/dashboard/konten": "Kelola Konten",
  "/admin/dashboard/pengaturan": "Pengaturan",
};

type Props = {
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
};

export default function AdminTopbar({ sidebarOpen, onOpenSidebar }: Props) {
  const pathname = usePathname();
  const title = sectionTitles[pathname] ?? "Dashboard";

  return (
    <header className={`d-flex align-items-center ${styles.topbar}`}>
      <button
        type="button"
        className={`d-flex d-lg-none align-items-center justify-content-center ${styles.menuBtn}`}
        aria-controls="admin-sidebar"
        aria-expanded={sidebarOpen}
        aria-label="Buka menu admin"
        onClick={onOpenSidebar}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className={styles.topTitle}>
        <p className={styles.breadcrumb}>
          Admin <span aria-hidden="true">/</span> <span>{title}</span>
        </p>
        <h1 className={styles.topHeading}>{title}</h1>
      </div>

      <div className={`d-flex align-items-center ${styles.topActions}`}>
        <Button
          href="/"
          target="_blank"
          rel="noopener"
          variant=""
          className={`d-none d-md-inline-flex ${ui.btn} ${ui.btnSm} ${ui.btnGhost}`}
        >
          Lihat Website ↗
        </Button>
        <span className={`d-inline-flex align-items-center justify-content-center ${styles.avatar}`} title="Admin">
          {admin.displayName.charAt(0)}
        </span>
      </div>
    </header>
  );
}
