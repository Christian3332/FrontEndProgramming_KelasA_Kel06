"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { foods, type Food } from "@/data/foods";
import FoodModal from "@/components/food/FoodModal";

const JUMLAH_TAMPIL = 6;

export default function KatalogPreview() {
  const [selected, setSelected] = useState<Food | null>(null);
  const tampil = foods.slice(0, JUMLAH_TAMPIL);

  return (
    <section
      id="katalog"
      className="katalog-section"
      aria-labelledby="katalog-title"
    >
      <h2 id="katalog-title" className="section-title">
        Makanan Khas Surabaya
      </h2>
      <div className="katalog-grid">
        {tampil.map((f) => (
          <article className="card" key={f.id}>
            <div
              className="card-img-wrapper"
              style={{ position: "relative", aspectRatio: "16 / 10" }}
            >
              <Image
                src={f.image}
                alt={f.name}
                fill
                sizes="(min-width: 992px) 30vw, (min-width: 576px) 45vw, 100vw"
                className="card-img"
              />
            </div>
            <div className="card-footer">
              <h3 className="card-title">{f.name}</h3>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setSelected(f)}
              >
                Deskripsi Singkat
              </button>
            </div>
          </article>
        ))}
      </div>

      {foods.length > JUMLAH_TAMPIL && (
        <div className="section-cta">
          <Link href="/katalog" className="btn-more">
            Lihat Semua Katalog
            <span className="btn-more__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      )}

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </section>
  );
}