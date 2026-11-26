"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card, Col, Row } from "react-bootstrap";
import { foods, type Food } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";
import FoodModal from "@/components/food/FoodModal";
import LinkButton from "@/components/ui/LinkButton";
import styles from "@/app/styles/home.module.css";
import cardStyles from "@/app/styles/food-card.module.css";

const JUMLAH_TAMPIL = 6;

export default function KatalogPreview() {
  const [selected, setSelected] = useState<Food | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const tampil = foods.slice(0, JUMLAH_TAMPIL);

  return (
    <section
      id="katalog"
      className={styles.katalog}
      aria-labelledby="katalog-title"
    >
      <h2 id="katalog-title" className={styles.sectionTitle}>
        Makanan Khas Surabaya
      </h2>
      <Row xs={1} sm={2} lg={3} className={`g-4 justify-content-center mx-auto ${styles.katalogGrid}`}>
        {tampil.map((f) => {
          const fav = isFavorite(f.id);
          return (
            <Col key={f.id}>
              <Card as="article" className={`h-100 ${cardStyles.foodCard} ${cardStyles.katalogCard}`}>
                <div className={`position-relative ${cardStyles.cardMedia}`}>
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(min-width: 992px) 30vw, (min-width: 576px) 45vw, 100vw"
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
                <Card.Footer className={`d-flex align-items-center justify-content-between gap-2 ${cardStyles.katalogFooter}`}>
                  <h3 className={cardStyles.katalogName}>{f.name}</h3>
                  <Button
                    variant=""
                    className={`flex-shrink-0 text-nowrap ${cardStyles.btnLight} ${cardStyles.btnSmall}`}
                    onClick={() => setSelected(f)}
                  >
                    Deskripsi Singkat
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>

      {foods.length > JUMLAH_TAMPIL && (
        <div className="d-flex justify-content-center mt-4">
          <LinkButton href="/katalog" variant="" className={`d-inline-flex align-items-center gap-2 ${styles.btnMore}`}>
            Lihat Semua Katalog
            <span className={styles.btnMoreArrow} aria-hidden="true">
              →
            </span>
          </LinkButton>
        </div>
      )}

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
