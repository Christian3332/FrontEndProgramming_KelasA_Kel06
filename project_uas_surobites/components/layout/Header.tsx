"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import FavCount from "@/components/layout/FavCount";
import styles from "@/app/styles/header.module.css";

const menu = [
    { href: "/", label: "Beranda" },
    { href: "/rekomendasi", label: "Rekomendasi" },
    { href: "/katalog", label: "Katalog" },
    { href: "/lokasi", label: "Lokasi Warung" },
];

export function Header () {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={`d-flex flex-wrap align-items-center bg-white shadow-sm sticky-top px-3 py-2 px-lg-5 py-lg-3 ${styles.header}`}>
            <Link href="/" className="order-1 d-flex align-items-center gap-2" aria-label="Surobites - Beranda">
                <Image src="/img/Surobites Logo.png" alt="Logo SuroBites" width={32} height={32}
                />
                <span className={styles.logoText}>SuroBites</span>
            </Link>

            <Link
                href="/favorit"
                className={`order-2 ms-auto me-2 position-relative d-inline-flex align-items-center justify-content-center rounded-circle ${styles.fav}`}
                aria-label="Favorit Saya"
            >
                <i className="fa-regular fa-heart"/>
                <FavCount />
            </Link>

            <button
                type="button"
                className={`order-2 d-lg-none ${styles.menuToggle}`}
                aria-controls="primary-navigation"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>

            <nav
                id="primary-navigation"
                className={`order-3 order-lg-2 justify-content-center d-lg-flex ${menuOpen ? `d-flex ${styles.navOpen}` : "d-none"} ${styles.navbar}`}
            >
                <ul className={`list-unstyled m-0 d-flex flex-column flex-lg-row align-items-center w-100 ${styles.navLinks}`}>
                    {menu.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <li key={item.href} className={styles.navItem}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${active ? styles.active : ""}`}
                                    aria-current={active ? "page" : undefined}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <form className={`order-4 order-lg-3 d-flex justify-content-center mt-1 mt-lg-0 ${styles.search}`} action="/katalog">
                <label className="visually-hidden" htmlFor="search-input">
                    Cari kuliner
                </label>
                <input
                    id="search-input"
                    type="text"
                    name="q"
                    placeholder="Cari kuliner..."
                    className={`form-control rounded-pill ${styles.searchInput}`}
                />
            </form>
        </header>
    );
}