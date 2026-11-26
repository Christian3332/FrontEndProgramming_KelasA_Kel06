import { Button } from "react-bootstrap";
import LinkButton from "@/components/ui/LinkButton";
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
          <Button href="#katalog" variant="primary" className={styles.heroButton}>
            Eksplorasi Menu
          </Button>
          <LinkButton
            href="/rekomendasi"
            variant=""
            className={`d-none d-md-inline-block ${styles.heroButton} ${styles.heroSecondary}`}
          >
            Rekomendasi
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
