import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | SuroBites",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="login-wrapper" id="main-content">
      <section className="login-brand" aria-label="Tentang panel admin">
        <Link className="login-brand__logo" href="/">
          <span className="brand-mark">
            <Image src="/img/Surobites Logo.png" alt="" width={36} height={36} />
          </span>
          <span>SuroBites</span>
        </Link>
        <div className="login-brand__content">
          <span className="login-brand__eyebrow">Panel Admin</span>
          <h2>Kelola cita rasa Surabaya dari satu tempat.</h2>
          <p>
            Atur katalog makanan, kategori rekomendasi, lokasi warung, FAQ, dan
            konten website SuroBites dengan mudah.
          </p>
          <ul className="login-brand__features">
            <li><span aria-hidden="true"></span> Kelola katalog makanan</li>
            <li><span aria-hidden="true"></span> Atur kategori rekomendasi</li>
            <li><span aria-hidden="true"></span> Perbarui lokasi warung</li>
          </ul>
        </div>
      </section>

      <section className="login-panel">
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
