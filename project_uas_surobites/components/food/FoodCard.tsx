"use client";

import type { Food } from "@/data/foods";
import { getCategory } from "@/lib/helper";
import { useFavorites } from "@/lib/favorites";
import styles from "@/app/styles/food-card.module.css";

type Props = {
  food: Food;
  onOpen: (food: Food) => void;
  showTags?: boolean;
};

export default function FoodCard({ food, onOpen, showTags = false }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(food.id);

  return (
    <article className={`card h-100 ${styles.foodCard} ${styles.katalogCard}`} data-food-id={food.id}>
      <div className={`position-relative ${styles.cardMedia}`}>
        <img
          src={food.image}
          alt={food.name}
          className={styles.cardImg}
          loading="lazy"
        />
        <button
          type="button"
          className={`position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle border-0 ${styles.favBtn} ${fav ? styles.favActive : ""}`}
          aria-label={`Favorit ${food.name}`}
          aria-pressed={fav}
          onClick={() => toggleFavorite(food.id)}
        >
          <i className={fav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </button>
        {showTags && (
          <div className={`d-flex flex-wrap ${styles.cardTags}`}>
            {food.categories.slice(0, 2).map((id) => {
              const c = getCategory(id);
              return c ? (
                <span key={id} className={styles.cardTag}>
                  {c.icon} {c.label}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
      <div className={`card-footer d-flex align-items-center justify-content-between gap-2 ${styles.katalogFooter}`}>
        <h3 className={styles.katalogName}>{food.name}</h3>
        <button
          type="button"
          className={`btn flex-shrink-0 text-nowrap ${styles.btnLight} ${styles.btnSmall}`}
          onClick={() => onOpen(food)}
        >
          Deskripsi Singkat
        </button>
      </div>
    </article>
  );
}
