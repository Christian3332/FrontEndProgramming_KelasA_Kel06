"use client";

import type { Food } from "@/data/foods";
import { getCategory } from "@/lib/helper";
import { useFavorites } from "@/lib/favorites";

type Props = {
  food: Food;
  onOpen: (food: Food) => void;
  showTags?: boolean;
};

export default function FoodCard({ food, onOpen, showTags = false }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(food.id);

  return (
    <article className="card" data-food-id={food.id}>
      <div className="card-img-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={food.image}
          alt={food.name}
          className="card-img"
          loading="lazy"
        />
        <button
          type="button"
          className={`fav-btn${fav ? " is-active" : ""}`}
          aria-label={`Favorit ${food.name}`}
          aria-pressed={fav}
          onClick={() => toggleFavorite(food.id)}
        >
          <i className={fav ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
        </button>
        {showTags && (
          <div className="card-tags">
            {food.categories.slice(0, 2).map((id) => {
              const c = getCategory(id);
              return c ? (
                <span key={id} className="card-tag">
                  {c.icon} {c.label}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
      <div className="card-footer">
        <h3 className="card-title">{food.name}</h3>
        <button
          type="button"
          className="btn-primary"
          onClick={() => onOpen(food)}
        >
          Deskripsi Singkat
        </button>
      </div>
    </article>
  );
}
