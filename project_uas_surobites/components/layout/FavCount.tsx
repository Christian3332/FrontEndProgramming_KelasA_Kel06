"use client";

import { foods } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";

export default function FavCount() {
  const { favorites } = useFavorites();
  const total = foods.filter((f) => favorites.includes(f.id)).length;
  if (total === 0) return null;

  return (
    <span className="header-fav__count" aria-label={`${total} favorit`}>
      {total}
    </span>
  );
}