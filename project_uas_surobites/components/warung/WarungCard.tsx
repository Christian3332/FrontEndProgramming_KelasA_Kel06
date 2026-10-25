"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import type { Food, Warung } from "@/data/foods";
import { findFood, formatTime, isWarungOpen } from "@/lib/helper";

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
    <article id={warung.id} data-warung className="card h-100 overflow-hidden">
      <div className="position-relative">
        <div className="ratio ratio-16x9">
          <Image
            src={warung.image}
            alt={warung.name}
            fill
            sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        {open !== null && (
          <span
            className={`badge rounded-pill position-absolute top-0 start-0 m-2 ${
              open ? "text-bg-success" : "text-bg-secondary"
            }`}
          >
            {open ? "Buka sekarang" : "Sedang tutup"}
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column gap-2">
        <h3 className="card-title h5 mb-0">{warung.name}</h3>

        <ul className="list-unstyled small mb-0">
          <li className="d-flex gap-2 mb-1">
            <i className="fa-solid fa-location-dot mt-1" aria-hidden="true" />
            <span>{warung.address}</span>
          </li>
          <li className="d-flex gap-2">
            <i className="fa-regular fa-clock mt-1" aria-hidden="true" />
            <span>
              {warung.openDays}, {formatTime(warung.openTime)} –{" "}
              {formatTime(warung.closeTime)} WIB
            </span>
          </li>
        </ul>

        <p className="small text-secondary mb-0">{warung.description}</p>

        <div className="d-flex flex-wrap align-items-center gap-1">
          <span className="small fw-bold me-1">Menu:</span>
          {foodList.map((food) => (
            <button
              key={food.id}
              type="button"
              className="btn btn-sm btn-outline-primary rounded-pill"
              onClick={() => onOpenFood(food)}
            >
              {food.name}
            </button>
          ))}
          {warung.otherMenu.map((item) => (
            <span key={item} className="badge rounded-pill text-bg-light border">
              {item}
            </span>
          ))}
        </div>

        <div className="d-flex flex-wrap gap-2 mt-auto pt-2">
          <button
            type="button"
            className="btn btn-outline-primary rounded-pill flex-fill"
            onClick={() => onOpenMap(warung)}
          >
            Lihat Peta
          </button>
          <a
            href={warung.mapsUrl}
            className="btn btn-primary rounded-pill flex-fill"
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