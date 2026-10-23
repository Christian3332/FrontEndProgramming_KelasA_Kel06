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
    <article className="card h-100" data-food-id={food.id}>
      <div className="position-relative">
        <img
          src={food.image}
          alt={food.name}
          className="card-img-top"
          loading="lazy"
        />
        <button
          type="button"
          className="btn btn-light position-absolute top-0 end-0 m-2"
          aria-label={`Favorit ${food.name}`}
          aria-pressed={fav}
          onClick={() => toggleFavorite(food.id)}
        >
          {fav ? "♥" : "♡"}
        </button>
        {showTags && (
          <div className="position-absolute bottom-0 start-0 m-2 d-flex gap-1">
            {food.categories.slice(0, 2).map((id) => {
              const c = getCategory(id);
              return c ? (
                <span key={id} className="badge text-bg-light">
                  {c.icon} {c.label}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{food.name}</h3>
        <button
          type="button"
          className="btn btn-primary mt-auto"
          onClick={() => onOpen(food)}
        >
          Deskripsi Singkat
        </button>
      </div>
    </article>
  );
}
