import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { categories, foods } from "@/data/foods";
import styles from "@/app/styles/home.module.css";

export default function CategoryLinks() {
  return (
    <section
      id="kategori"
      className={styles.kategori}
      aria-labelledby="kategori-title"
    >
      <h2 id="kategori-title" className={styles.sectionTitle}>
        Mau Makan Apa Hari Ini?
      </h2>
      <p className={styles.subtitle}>
        Pilih sesuai selera, nanti SuroBites carikan kuliner Surabaya yang
        paling cocok untukmu.
      </p>
      <Row xs={2} md={3} xl={6} className={`g-3 mx-auto ${styles.narrow}`}>
        {categories.map((c) => {
          const total = foods.filter((f) => f.categories.includes(c.id)).length;
          return (
            <Col key={c.id}>
              <Link
                href={`/rekomendasi?kategori=${c.id}`}
                className={`d-flex flex-column align-items-center text-center h-100 ${styles.kategoriCard}`}
              >
                <span
                  className={`d-flex align-items-center justify-content-center rounded-circle ${styles.kategoriIcon}`}
                  aria-hidden="true"
                >
                  {c.icon}
                </span>
                <span className={styles.kategoriLabel}>{c.label}</span>
                <span className={styles.kategoriDesc}>{c.description}</span>
                <span className={styles.kategoriCount}>{total} kuliner</span>
              </Link>
            </Col>
          );
        })}
      </Row>
    </section>
  );
}
