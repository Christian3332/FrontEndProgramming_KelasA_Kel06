"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import type { Food, Warung } from "@/data/foods";
import { findFood, formatTime, isWarungOpen } from "@/lib/helper";
import styles from "@/app/styles/lokasi.module.css";

const noop = () => () => {};

type Props = {
  warung: Warung;
  onOpenMap: (warung: Warung) => void;
  onOpenFood: (food: Food) => void;
};

export default function WarungCard({ warung, onOpenMap, onOpenFood }: Props) {
  const open = useSyncExternalStore(
    noop,
    () => isWarungOpen(warung),
    () => null,
  );

  const foodList = warung.foodIds
    .map((id) => findFood(id))
    .filter((f): f is Food => Boolean(f));

  return (
    <article id={warung.id} data-warung className={`card h-100 ${styles.card}`}>
      <div className={styles.media}>
        <Image
          src={warung.image}
          alt={warung.name}
          fill
          sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
        />
        {open !== null && (
          <span className={`${styles.status} ${open ? styles.open : styles.closed}`}>
            {open ? "Buka sekarang" : "Sedang tutup"}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={`h5 ${styles.title}`}>{warung.name}</h3>

        <ul className={styles.info}>
          <li>
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            <span>{warung.address}</span>
          </li>
          <li>
            <i className="fa-regular fa-clock" aria-hidden="true" />
            <span>
              {warung.openDays}, {formatTime(warung.openTime)} –{" "}
              {formatTime(warung.closeTime)} WIB
            </span>
          </li>
        </ul>

        <p className={styles.desc}>{warung.description}</p>

        <div className={styles.menu}>
          <span className={styles.menuLabel}>Menu:</span>
          {foodList.map((food) => (
            <button
              key={food.id}
              type="button"
              className={`${styles.chip} ${styles.chipButton}`}
              onClick={() => onOpenFood(food)}
            >
              {food.name}
            </button>
          ))}
          {warung.otherMenu.map((item) => (
            <span key={item} className={styles.chip}>
              {item}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn-outline-primary rounded-pill"
            onClick={() => onOpenMap(warung)}
          >
            Lihat Peta
          </button>
          <a
            href={warung.mapsUrl}
            className="btn btn-primary rounded-pill"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka Google Maps
          </a>
        </div>
      </div>
    </article>
  );
}