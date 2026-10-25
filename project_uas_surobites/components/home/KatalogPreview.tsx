"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { foods, type Food } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";
import FoodModal from "@/components/food/FoodModal";
import styles from "@/app/styles/home.module.css";

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
      <div className={`row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 justify-content-center mx-auto ${styles.katalogGrid}`}>
        {tampil.map((f) => {
          const fav = isFavorite(f.id);
          return (
            <div className="col" key={f.id}>
              <article className={`card h-100 ${styles.foodCard} ${styles.katalogCard}`}>
                <div className={`position-relative ${styles.cardMedia}`}>
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(min-width: 992px) 30vw, (min-width: 576px) 45vw, 100vw"
                    className={styles.cardImg}
                  />
                  <button
                    type="button"
                    className={`position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle border-0 ${styles.favBtn} ${fav ? styles.favActive : ""}`}
                    aria-label={`Favorit ${f.name}`}
                    aria-pressed={fav}
                    onClick={() => toggleFavorite(f.id)}
                  >
                    <i className={fav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  </button>
                </div>
                <div className={`card-footer d-flex align-items-center justify-content-between gap-2 ${styles.katalogFooter}`}>
                  <h3 className={styles.katalogName}>{f.name}</h3>
                  <button
                    type="button"
                    className={`btn flex-shrink-0 text-nowrap ${styles.btnLight} ${styles.btnSmall}`}
                    onClick={() => setSelected(f)}
                  >
                    Deskripsi Singkat
                  </button>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {foods.length > JUMLAH_TAMPIL && (
        <div className="d-flex justify-content-center mt-4">
          <Link href="/katalog" className={`btn d-inline-flex align-items-center gap-2 ${styles.btnMore}`}>
            Lihat Semua Katalog
            <span className={styles.btnMoreArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      )}

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
