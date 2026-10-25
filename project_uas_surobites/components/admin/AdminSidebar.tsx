"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { admin } from "@/data/admin";
import { foods, warungs } from "@/data/foods";
import { logout } from "@/lib/auth";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

type MenuItem = {
  href: string;
  label: string;
  icon: string;
  count?: number;
};

const menuUtama: MenuItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "fa-solid fa-table-cells-large" },
  { href: "/admin/dashboard/makanan", label: "Kelola Makanan", icon: "fa-solid fa-bowl-food", count: foods.length },
  { href: "/admin/dashboard/rekomendasi", label: "Kelola Rekomendasi", icon: "fa-regular fa-star" },
  { href: "/admin/dashboard/warung", label: "Kelola Warung", icon: "fa-solid fa-location-dot", count: warungs.length },
  { href: "/admin/dashboard/faq", label: "Kelola FAQ", icon: "fa-regular fa-circle-question" },
  { href: "/admin/dashboard/konten", label: "Kelola Konten", icon: "fa-regular fa-file-lines" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [confirmLogout, setConfirmLogout] = useState(false);

  // body dikunci biar halaman belakang tidak ikut scroll waktu sidebar terbuka di HP
  useEffect(() => {
    document.body.classList.toggle("sidebar-open", open);
    return () => document.body.classList.remove("sidebar-open");
  }, [open]);

  function linkClass(href: string) {
    return `admin-nav__link ${pathname === href ? "is-active" : ""}`;
  }

  function handleLogout() {
    logout();
    router.replace("/admin/login?pesan=logout");
  }

  return (
    <>
      <aside
        className={`admin-sidebar ${open ? "is-open" : ""}`}
        id="admin-sidebar"
        aria-label="Navigasi admin"
      >
        <div className="admin-sidebar__brand">
          <span className="brand-mark">
            <Image src="/img/Surobites Logo.png" alt="" width={32} height={32} />
          </span>
          <div className="brand-text">
            <strong>SuroBites</strong>
            <small>Admin Panel</small>
          </div>
          <button
            type="button"
            className="sidebar-close"
            aria-label="Tutup menu admin"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav__label">Menu utama</p>
          {menuUtama.map((menu) => (
            <Link key={menu.href} href={menu.href} className={linkClass(menu.href)} onClick={onClose}>
              <i className={menu.icon}></i>
              <span>{menu.label}</span>
              {menu.count !== undefined && (
                <span className="admin-nav__badge">{menu.count}</span>
              )}
            </Link>
          ))}

          <p className="admin-nav__label">Lainnya</p>
          <Link
            href="/admin/dashboard/pengaturan"
            className={linkClass("/admin/dashboard/pengaturan")}
            onClick={onClose}
          >
            <i className="fa-solid fa-sliders"></i>
            <span>Pengaturan</span>
          </Link>
          <Link href="/" className="admin-nav__link" target="_blank" rel="noopener">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Lihat Website</span>
          </Link>
          <button
            type="button"
            className="admin-nav__link admin-nav__link--logout"
            onClick={() => setConfirmLogout(true)}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </nav>

        <div className="admin-sidebar__footer">
          <span className="admin-avatar" aria-hidden="true">
            {admin.displayName.charAt(0)}
          </span>
          <div className="admin-user">
            <strong>{admin.displayName}</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <div
        className={`sidebar-backdrop ${open ? "is-visible" : ""}`}
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <ConfirmDialog
        open={confirmLogout}
        title="Keluar dari dashboard?"
        message="Kamu perlu login kembali untuk mengelola konten SuroBites."
        confirmText="Ya, Logout"
        icon="fa-regular fa-hand"
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      />
    </>
  );
}
