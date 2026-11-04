import { Button } from "react-bootstrap";
import { connection } from "next/server";
import LinkButton from "@/components/ui/LinkButton";
import { getSiteContent } from "@/lib/site-content";
import styles from "@/app/styles/home.module.css";

export default async function Hero() {
  await connection();
  const content = await getSiteContent();

  return (
    <section id="beranda" className={`d-flex flex-column justify-content-center ${styles.hero}`}>
      <div className={`d-flex flex-column ${styles.heroContent}`}>
        <h2 className={styles.heroTitle}>{content.heroTitle}</h2>
        <p className={styles.heroText}>{content.heroDescription}</p>
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
