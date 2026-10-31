"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card, Col, Row } from "react-bootstrap";
import type { Food } from "@/data/foods";
import { useFoods } from "@/lib/useFoods";
import { useFavorites } from "@/lib/favorites";
import FoodModal from "@/components/food/FoodModal";
import styles from "@/app/styles/home.module.css";
import cardStyles from "@/app/styles/food-card.module.css";

export default function HighlightMenu() {
  const foods = useFoods();
  const [selected, setSelected] = useState<Food | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const unggulan = foods.filter((f) => f.featured);

  return (
    <section
      id="rekomendasi-pilihan"
      className={`d-none d-md-block ${styles.highlight}`}
      aria-labelledby="rekomendasi-pilihan-title"
    >
      <h2 id="rekomendasi-pilihan-title" className={styles.sectionTitle}>
        Rekomendasi Pilihan
      </h2>
      <Row xs={1} md={3} className={`g-4 mx-auto ${styles.wide}`}>
        {unggulan.map((f) => {
          const fav = isFavorite(f.id);
          return (
            <Col key={f.id}>
              <Card as="article" className={`h-100 ${cardStyles.foodCard}`}>
                <div className={`position-relative ${cardStyles.cardMedia}`}>
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={cardStyles.cardImg}
                  />
                  <button
                    type="button"
                    className={`position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle border-0 ${cardStyles.favBtn} ${fav ? cardStyles.favActive : ""}`}
                    aria-label={`Favorit ${f.name}`}
                    aria-pressed={fav}
                    onClick={() => toggleFavorite(f.id)}
                  >
                    <i className={fav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  </button>
                </div>
                <Card.Body className="d-flex flex-column align-items-center gap-2 text-center">
                  <h3 className={cardStyles.highlightName}>{f.name}</h3>
                  <Button
                    variant=""
                    className={cardStyles.btnLight}
                    onClick={() => setSelected(f)}
                  >
                    Deskripsi Singkat
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
