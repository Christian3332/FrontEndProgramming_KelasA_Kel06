"use client";

import Image from "next/image";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function WelcomeCard() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`d-flex align-items-center justify-content-between ${styles.welcome}`}>
      <div>
        <p className={styles.welcomeEyebrow}>{today}</p>
        <h2 className={styles.welcomeTitle}>
          Halo, <span>Admin</span>!
        </h2>
        <p className={styles.welcomeText}>
          Kelola konten kuliner Surabaya agar pengunjung SuroBites selalu
          mendapat informasi terbaru.
        </p>
        <div className={`d-flex flex-wrap ${styles.welcomeActions}`}>
          <button type="button" className={`btn btn-primary ${ui.btn} ${ui.btnPrimary}`}>
            + Tambah Makanan
          </button>
          <button type="button" className={`btn ${ui.btn} ${ui.btnLight}`}>
            + Tambah Warung
          </button>
        </div>
      </div>
      <span className={`d-none d-md-block ${styles.welcomeArt}`} aria-hidden="true">
        <Image
          src="/img/Surobites Logo.png"
          alt=""
          width={90}
          height={90}
          className={`w-100 h-100 ${styles.welcomeArtImg}`}
        />
      </span>
    </div>
  );
}
