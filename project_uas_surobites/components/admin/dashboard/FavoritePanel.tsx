"use client";

import Image from "next/image";
import Link from "next/link";
import { foods } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";

export default function FavoritePanel() {
  const { favorites } = useFavorites();
  const favoriteFoods = foods.filter((food) => favorites.includes(food.id));

  return (
    <article className="panel panel--wide">
      <div className="panel__header">
        <div>
          <h3 className="panel__title">Makanan favorit pengunjung</h3>
          <p className="panel__subtitle">Disimpan lewat ikon hati di browser ini</p>
        </div>
        <Link href="/favorit" target="_blank" rel="noopener" className="panel__link">
          Lihat halaman favorit ↗
        </Link>
      </div>

      {favoriteFoods.length === 0 ? (
        <p className="panel-empty">Belum ada makanan yang difavoritkan di browser ini.</p>
      ) : (
        <div className="mini-food-grid">
          {favoriteFoods.map((food) => (
            <div className="mini-food" key={food.id}>
              <Image src={food.image} alt={food.name} width={56} height={56} />
              <span>{food.name}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
