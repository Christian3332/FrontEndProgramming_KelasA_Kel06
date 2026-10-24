"use client";

import { useState } from "react";
import Image from "next/image";
import { foods, type Food } from "@/data/foods";
import FoodModal from "@/components/FoodModal";

export default function HighlightMenu() {
  const [selected, setSelected] = useState<Food | null>(null);
  const unggulan = foods.filter((f) => f.featured);

  return (
    <section
      id="rekomendasi-pilihan"
      className="highlight-section desktop-section"
      aria-labelledby="rekomendasi-pilihan-title"
    >
      <h2 id="rekomendasi-pilihan-title" className="section-title">
        Rekomendasi Pilihan
      </h2>
      <div className="card-container">
        {unggulan.map((f) => (
          <article className="card" key={f.id}>
            <div
              className="card-img-wrapper"
              style={{ position: "relative", aspectRatio: "16 / 10" }}
            >
              <Image
                src={f.image}
                alt={f.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="card-img"
              />
            </div>
            <div className="card-body">
              <h3>{f.name}</h3>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setSelected(f)}
              >
                Deskripsi Singkat
              </button>
            </div>
          </article>
        ))}
      </div>

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </section>
  );
}