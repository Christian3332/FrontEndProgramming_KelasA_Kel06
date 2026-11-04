"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { Form, Nav, Navbar } from "react-bootstrap";
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
        <header className={`sticky-top bg-white shadow-sm ${styles.header}`}>
            <Navbar
                expand="lg"
                expanded={menuOpen}
                onToggle={setMenuOpen}
                collapseOnSelect
                className={`px-3 py-2 px-lg-5 py-lg-3 ${styles.navbar}`}
            >
                <Navbar.Brand as={Link} href="/" className="order-1 d-flex align-items-center gap-2 p-0 me-0" aria-label="Surobites - Beranda">
                    <Image src="/img/Surobites Logo.png" alt="Logo SuroBites" width={32} height={32}
                    />
                    <span className={styles.logoText}>SuroBites</span>
                </Navbar.Brand>

                <Link
                    href="/favorit"
                    className={`order-2 order-lg-4 ms-auto ms-lg-3 me-2 me-lg-0 position-relative d-inline-flex align-items-center justify-content-center rounded-circle ${styles.fav}`}
                    aria-label="Favorit Saya"
                >
                    <i className="fa-regular fa-heart"/>
                    <FavCount />
                </Link>

                <Navbar.Toggle
                    className={`order-2 ${styles.menuToggle}`}
                    aria-controls="primary-navigation"
                    aria-expanded={menuOpen}
                    label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </Navbar.Toggle>

                <Navbar.Collapse id="primary-navigation" className="order-3 order-lg-2 justify-content-lg-center">
                    <Nav as="ul" className={styles.navLinks}>
                        {menu.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Nav.Item as="li" key={item.href}>
                                    <Nav.Link
                                        as={Link}
                                        href={item.href}
                                        active={active}
                                        className={styles.navLink}
                                        aria-current={active ? "page" : undefined}
                                    >
                                        {item.label}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                </Navbar.Collapse>

                <Form className="col-12 col-lg-auto order-4 order-lg-3 d-flex justify-content-center mt-3 mt-lg-0" action="/katalog">
                    <Form.Label visuallyHidden htmlFor="search-input">
                        Cari kuliner
                    </Form.Label>
                    <Form.Control
                        id="search-input"
                        type="text"
                        name="q"
                        placeholder="Cari kuliner..."
                        className={`rounded-pill ${styles.searchInput}`}
                    />
                </Form>
            </Navbar>
        </header>
    );
}
