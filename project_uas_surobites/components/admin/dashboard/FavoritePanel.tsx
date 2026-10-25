"use client";

import Image from "next/image";
import Link from "next/link";
import { foods } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function FavoritePanel() {
  const { favorites } = useFavorites();
  const favoriteFoods = foods.filter((food) => favorites.includes(food.id));

  return (
    <article className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>Makanan favorit pengunjung</h3>
          <p className={ui.panelSubtitle}>Disimpan lewat ikon hati di browser ini</p>
        </div>
        <Link href="/favorit" target="_blank" rel="noopener" className={ui.panelLink}>
          Lihat halaman favorit ↗
        </Link>
      </div>

      {favoriteFoods.length === 0 ? (
        <p className={ui.panelEmpty}>Belum ada makanan yang difavoritkan di browser ini.</p>
      ) : (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-6 g-3">
          {favoriteFoods.map((food) => (
            <div className="col" key={food.id}>
              <div className={`h-100 ${styles.miniFood}`}>
                <Image
                  src={food.image}
                  alt={food.name}
                  width={200}
                  height={125}
                  className={`w-100 h-auto ${styles.miniImg}`}
                />
                <span className={`d-flex align-items-center ${styles.miniName}`}>{food.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
