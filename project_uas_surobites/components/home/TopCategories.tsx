"use client";

import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useFoods } from "@/lib/useFoods";
import { useCategories } from "@/lib/useCategories";
import { useFavorites } from "@/lib/favorites";
import styles from "@/app/styles/home.module.css";

export default function TopCategories() {
  const foods = useFoods();
  const categories = useCategories();
  const { likeCount } = useFavorites();

  // total love kategori = jumlah love semua makanan yang masuk kategori itu
  const ranking = categories
    .map((c) => ({
      ...c,
      total: foods
        .filter((f) => f.categories.includes(c.id))
        .reduce((sum, f) => sum + likeCount(f), 0),
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return (
    <section id="kategori-favorit" className={styles.category} aria-labelledby="kategori-favorit-title">
      <h2 id="kategori-favorit-title" className={styles.sectionTitle}>
        Kategori Paling Disukai
      </h2>

      {ranking.length === 0 ? (
        <p className={styles.subtitle}>Belum ada love dari pengguna. Yuk jadi yang pertama!</p>
      ) : (
        <Row xs={1} sm={3} className={`g-3 mx-auto justify-content-center ${styles.narrow}`}>
          {ranking.map((c, index) => (
            <Col key={c.id}>
              <Link
                href={`/rekomendasi?kategori=${c.id}`}
                className={`d-flex flex-column align-items-center text-center h-100 ${styles.categoryCard}`}
              >
                <span
                  className={`d-flex align-items-center justify-content-center rounded-circle ${styles.categoryIcon}`}
                  aria-hidden="true"
                >
                  {c.icon}
                </span>
                <span className={styles.categoryLabel}>
                  #{index + 1} {c.label}
                </span>
                <span className={styles.categoryCount}>
                  <i className="fa-solid fa-heart" aria-hidden="true"></i> {c.total} love
                </span>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
}
