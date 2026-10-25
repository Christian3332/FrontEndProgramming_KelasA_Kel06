"use client";

import { useEffect, useState } from "react";
import { warungs, type Food, type Warung } from "@/data/foods";
import { findFood, searchItems } from "@/lib/helper";
import WarungCard from "@/components/warung/WarungCard";
import MapModal from "@/components/warung/MapModal";
import FoodModal from "@/components/food/FoodModal";
import katalog from "@/app/styles/katalog.module.css";
import styles from "@/app/styles/lokasi.module.css";

const HIGHLIGHT = [styles.highlighted];

function warungSearchText(w: Warung): string {
  const foodNames = w.foodIds.map((id) => findFood(id)?.name ?? "");
  return [w.name, w.address, w.description, ...foodNames, ...w.otherMenu].join(
    " ",
  );
}

export default function LokasiContent() {
  const [keyword, setKeyword] = useState("");
  const [mapWarung, setMapWarung] = useState<Warung | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const list = searchItems(warungs, keyword, warungSearchText);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let target: HTMLElement | null = null;

    const highlight = () => {
      target?.classList.remove(...HIGHLIGHT);
      clearTimeout(timer);

      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el || !el.hasAttribute("data-warung")) return;

      target = el;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add(...HIGHLIGHT);
      timer = setTimeout(() => el.classList.remove(...HIGHLIGHT), 3000);
    };

    highlight();
    window.addEventListener("hashchange", highlight);
    return () => {
      window.removeEventListener("hashchange", highlight);
      clearTimeout(timer);
      target?.classList.remove(...HIGHLIGHT);
    };
  }, []);

  return (
    <div className="container">
      <section className={styles.section} aria-labelledby="lokasi-title">
        <div className={`text-center ${styles.heading}`}>
          <h2 id="lokasi-title" className={styles.title}>Lokasi Warung Kuliner Surabaya</h2>
          <p className={styles.subtitle}>
            Temukan warung legendaris, cek jam bukanya, lalu langsung arahkan
            perjalananmu lewat Google Maps.
          </p>
        </div>

        <div className={`d-flex flex-column align-items-center mx-auto ${styles.toolbar}`}>
          <div className="position-relative w-100">
            <i
              className={`fa-solid fa-magnifying-glass position-absolute top-0 bottom-0 d-flex align-items-center ${styles.filterIcon}`}
              aria-hidden="true"
            ></i>
            <input
              id="warung-filter"
              type="search"
              className={`form-control rounded-pill ${styles.filterInput}`}
              placeholder="Cari nama warung, alamat, atau menu..."
              aria-label="Cari warung"
              autoComplete="off"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <p className={styles.count} aria-live="polite">
            {keyword.trim()
              ? `${list.length} dari ${warungs.length} warung cocok dengan pencarianmu`
              : `${warungs.length} warung kuliner pilihan di Surabaya`}
          </p>
        </div>

        {list.length === 0 ? (
          <div className={`d-flex flex-column align-items-center text-center ${katalog.empty}`}>
            <div
              className={`d-flex align-items-center justify-content-center ${katalog.emptyIcon}`}
              aria-hidden="true"
            >
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3 className={katalog.emptyTitle}>Warung belum ditemukan</h3>
            <p className={katalog.emptyText}>Coba cari dengan nama warung, alamat, atau menu lain.</p>
          </div>
        ) : (
          <div className={`row g-4 mx-auto ${styles.grid}`}>
            {list.map((w) => (
              <div className="col-12 col-md-6 col-xl-4" key={w.id}>
                <WarungCard
                  warung={w}
                  onOpenMap={setMapWarung}
                  onOpenFood={setSelectedFood}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <MapModal warung={mapWarung} onClose={() => setMapWarung(null)} />
      <FoodModal food={selectedFood} onClose={() => setSelectedFood(null)} />
    </div>
  );
}