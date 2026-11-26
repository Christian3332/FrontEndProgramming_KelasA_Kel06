"use client";

import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useFoods } from "@/lib/useFoods";
import { useCategories } from "@/lib/useCategories";
import styles from "@/app/styles/home.module.css";

export default function CategoryLinks() {
  const foods = useFoods();
  const categories = useCategories();
  return (
    <section
      id="kategori"
      className={styles.category}
      aria-labelledby="kategori-title"
    >
      <h2 id="kategori-title" className={styles.sectionTitle}>
        Mau Makan Apa Hari Ini?
      </h2>
      <p className={styles.subtitle}>
        Pilih sesuai selera, nanti SuroBites carikan kuliner Surabaya yang
        paling cocok untukmu.
      </p>
      {/* justify-content-center biar baris terakhir yang gak penuh tetap di tengah,
          jadi aman berapapun jumlah kategori yang ditambah admin */}
      <Row xs={2} md={3} xl={6} className={`g-3 mx-auto justify-content-center ${styles.narrow}`}>
        {categories.map((c) => {
          const total = foods.filter((f) => f.categories.includes(c.id)).length;
          return (
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
                <span className={styles.categoryLabel}>{c.label}</span>
                <span className={styles.categoryDesc}>{c.description}</span>
                <span className={styles.categoryCount}>{total} kuliner</span>
              </Link>
            </Col>
          );
        })}
      </Row>
    </section>
  );
}
