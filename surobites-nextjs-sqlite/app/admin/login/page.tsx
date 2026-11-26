import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";
import styles from "@/app/styles/admin-login.module.css";

export const metadata: Metadata = {
  title: "Admin Login | SuroBites",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className={`d-flex flex-grow-1 min-vh-100 ${styles.wrapper}`} id="main-content">
      <section
        className={`d-none d-lg-flex flex-column justify-content-between ${styles.brand}`}
        aria-label="Tentang panel admin"
      >
        <Link className={`d-inline-flex align-items-center align-self-start ${styles.brandLogo}`} href="/">
          <span className={`d-inline-flex align-items-center justify-content-center ${styles.brandMark}`}>
            <Image src="/img/Surobites Logo.png" alt="" width={36} height={36} />
          </span>
          <span>SuroBites</span>
        </Link>
        <div className={styles.brandContent}>
          <span className={styles.eyebrow}>Panel Admin</span>
          <h2 className={styles.brandTitle}>Kelola cita rasa Surabaya dari satu tempat.</h2>
          <p className={styles.brandText}>
            Atur katalog makanan, kategori rekomendasi, lokasi warung, FAQ, dan
            konten website SuroBites dengan mudah.
          </p>
          <ul className={`list-unstyled m-0 d-flex flex-column ${styles.features}`}>
            <li className={`d-flex align-items-center ${styles.feature}`}>
              <span className={`d-flex align-items-center justify-content-center ${styles.featureIcon}`} aria-hidden="true">
                <i className="fa-solid fa-bowl-food"></i>
              </span>
              Kelola katalog makanan
            </li>
            <li className={`d-flex align-items-center ${styles.feature}`}>
              <span className={`d-flex align-items-center justify-content-center ${styles.featureIcon}`} aria-hidden="true">
                <i className="fa-regular fa-star"></i>
              </span>
              Atur kategori rekomendasi
            </li>
            <li className={`d-flex align-items-center ${styles.feature}`}>
              <span className={`d-flex align-items-center justify-content-center ${styles.featureIcon}`} aria-hidden="true">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              Perbarui lokasi warung
            </li>
          </ul>
        </div>
      </section>

      <section className={`d-flex align-items-center justify-content-center ${styles.panel}`}>
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
