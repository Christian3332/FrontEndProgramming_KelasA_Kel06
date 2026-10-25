"use client";

import { useEffect, useState } from "react";
import { warungs, type Food, type Warung } from "@/data/foods";
import { findFood, searchItems } from "@/lib/helper";
import WarungCard from "@/components/warung/WarungCard";
import MapModal from "@/components/warung/MapModal";
import FoodModal from "@/components/food/FoodModal";

const HIGHLIGHT = ["border-primary", "border-3", "shadow-lg"];

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
    <div className="container py-4">
      <section aria-labelledby="lokasi-title">
        <div className="text-center mb-4">
          <h2 id="lokasi-title">Lokasi Warung Kuliner Surabaya</h2>
          <p className="text-secondary">
            Temukan warung legendaris, cek jam bukanya, lalu langsung arahkan
            perjalananmu lewat Google Maps.
          </p>
        </div>

        <div className="mx-auto mb-4 text-center" style={{ maxWidth: 520 }}>
          <div className="mb-2">
            <input
              id="warung-filter"
              type="search"
              className="form-control form-control-lg rounded-pill"
              placeholder="Cari nama warung, alamat, atau menu..."
              aria-label="Cari warung"
              autoComplete="off"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <p className="small text-secondary mb-0" aria-live="polite">
            {keyword.trim()
              ? `${list.length} dari ${warungs.length} warung cocok dengan pencarianmu`
              : `${warungs.length} warung kuliner pilihan di Surabaya`}
          </p>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1">📍</div>
            <h3>Warung belum ditemukan</h3>
            <p>Coba cari dengan nama warung, alamat, atau menu lain.</p>
          </div>
        ) : (
          <div className="row g-4">
            {list.map((w) => (
              <div className="col-12 col-md-6 col-lg-4" key={w.id}>
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