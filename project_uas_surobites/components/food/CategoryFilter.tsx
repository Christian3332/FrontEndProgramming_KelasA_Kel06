"use client";

import { Col, Row } from "react-bootstrap";
import { categories, type Food } from "@/data/foods";
import styles from "@/app/styles/home.module.css";

type Props = { foods: Food[]; active: string | null; onChange: (id: string | null) => void };

export default function CategoryFilter({ foods, active, onChange }: Props) {
  return (
    <Row
      xs={2}
      md={3}
      xl={6}
      className={`g-3 mx-auto ${styles.narrow}`}
      role="group"
      aria-label="Kategori rekomendasi"
    >
      {categories.map((c) => {
        const total = foods.filter((f) => f.categories.includes(c.id)).length;
        const isActive = c.id === active;
        return (
          <Col key={c.id}>
            <button
              type="button"
              className={`d-flex flex-column align-items-center text-center w-100 h-100 ${styles.kategoriCard} ${isActive ? styles.kategoriActive : ""}`}
              aria-pressed={isActive}
              onClick={() => onChange(isActive ? null : c.id)}
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
            </button>
          </Col>
        );
      })}
    </Row>
  );
}
