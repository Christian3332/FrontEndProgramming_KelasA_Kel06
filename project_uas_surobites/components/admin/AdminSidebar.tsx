"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Nav, Offcanvas } from "react-bootstrap";
import { admin } from "@/data/admin";
import { foods, warungs } from "@/data/foods";
import { faqs } from "@/data/faqs";
import { logout } from "@/lib/auth";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import styles from "@/app/styles/admin-dashboard.module.css";

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
  { href: "/admin/dashboard/faq", label: "Kelola FAQ", icon: "fa-regular fa-circle-question", count: faqs.length },
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

  function linkClass(href: string) {
    return `d-flex align-items-center w-100 ${styles.navLink} ${pathname === href ? styles.navActive : ""}`;
  }

  function handleLogout() {
    logout();
    router.replace("/admin/login?pesan=logout");
  }

  // di layar besar sidebar selalu tampil, di HP jadi menu geser dari kiri
  return (
    <>
      <Offcanvas
        show={open}
        onHide={onClose}
        responsive="lg"
        id="admin-sidebar"
        aria-label="Navigasi admin"
        className={`d-flex flex-column ${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}
        backdropClassName={styles.backdrop}
      >
        <div className={`d-flex align-items-center ${styles.sidebarBrand}`}>
          <span className={`d-inline-flex align-items-center justify-content-center ${styles.brandMark}`}>
            <Image src="/img/Surobites Logo.png" alt="" width={32} height={32} />
          </span>
          <div>
            <strong className={styles.brandName}>SuroBites</strong>
            <small className={styles.brandSub}>Admin Panel</small>
          </div>
          <button
            type="button"
            className={`d-flex d-lg-none align-items-center justify-content-center ${styles.sidebarClose}`}
            aria-label="Tutup menu admin"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <Nav as="nav" className={`flex-column flex-nowrap ${styles.nav}`}>
          <p className={styles.navLabel}>Menu utama</p>
          {menuUtama.map((menu) => (
            <Nav.Link as={Link} key={menu.href} href={menu.href} className={linkClass(menu.href)} onClick={onClose}>
              <i className={menu.icon}></i>
              <span>{menu.label}</span>
              {menu.count !== undefined && (
                <span className={styles.navBadge}>{menu.count}</span>
              )}
            </Nav.Link>
          ))}

          <p className={styles.navLabel}>Lainnya</p>
          <Nav.Link
            as={Link}
            href="/admin/dashboard/pengaturan"
            className={linkClass("/admin/dashboard/pengaturan")}
            onClick={onClose}
          >
            <i className="fa-solid fa-sliders"></i>
            <span>Pengaturan</span>
          </Nav.Link>
          <Nav.Link href="/" className={`d-flex align-items-center w-100 ${styles.navLink}`} target="_blank" rel="noopener">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Lihat Website</span>
          </Nav.Link>
          <Nav.Link
            as="button"
            type="button"
            className={`d-flex align-items-center w-100 ${styles.navLink} ${styles.navLogout}`}
            onClick={() => setConfirmLogout(true)}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Nav.Link>
        </Nav>

        <div className={`d-flex align-items-center ${styles.sidebarFooter}`}>
          <span className={`d-inline-flex align-items-center justify-content-center ${styles.avatar}`} aria-hidden="true">
            {admin.displayName.charAt(0)}
          </span>
          <div className={styles.user}>
            <strong className={styles.userName}>{admin.displayName}</strong>
            <small className={styles.userRole}>Administrator</small>
          </div>
        </div>
      </Offcanvas>

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
