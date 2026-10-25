"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { admin } from "@/data/admin";

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
    <header className="admin-topbar">
      <button
        type="button"
        className="admin-menu-btn"
        aria-controls="admin-sidebar"
        aria-expanded={sidebarOpen}
        aria-label="Buka menu admin"
        onClick={onOpenSidebar}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className="admin-topbar__title">
        <p className="admin-breadcrumb">
          Admin <span aria-hidden="true">/</span> <span>{title}</span>
        </p>
        <h1>{title}</h1>
      </div>

      <div className="admin-topbar__actions">
        <Link
          href="/"
          target="_blank"
          rel="noopener"
          className="ui-btn ui-btn--ghost ui-btn--sm hide-mobile"
        >
          Lihat Website ↗
        </Link>
        <span className="admin-avatar" title="Admin">
          {admin.displayName.charAt(0)}
        </span>
      </div>
    </header>
  );
}
