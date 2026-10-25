import Link from "next/link";
import styles from "@/app/styles/home.module.css";

export default function Hero() {
  return (
    <section id="beranda" className={`d-flex flex-column justify-content-center ${styles.hero}`}>
      <div className={`d-flex flex-column ${styles.heroContent}`}>
        <h2 className={styles.heroTitle}>JELAJAHI CITA RASA LEGENDARIS SURABAYA</h2>
        <p className={styles.heroText}>
          Nikmati Kelezatan Kuliner Warisan Kota Pahlawan. Dari pekatnya kuah
          Rawon daging hingga segarnya bumbu petis Rujak Cingur dan Lontong
          Balap. Temukan sejarah, bahan rahasia, dan rekomendasi warung asli di
          satu tempat.
        </p>
        <div className={`d-flex flex-column flex-sm-row mt-2 ${styles.heroButtons}`}>
          <a href="#katalog" className={`btn btn-primary ${styles.heroButton}`}>
            Eksplorasi Menu
          </a>
          <Link
            href="/rekomendasi"
            className={`btn d-none d-md-inline-block ${styles.heroButton} ${styles.heroSecondary}`}
          >
            Rekomendasi
          </Link>
        </div>
      </div>
    </section>
  );
}
