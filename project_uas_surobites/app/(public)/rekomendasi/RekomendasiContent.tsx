"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { foods, categories, warungs, type Food } from "@/data/foods";
import { getCategory } from "@/lib/helper";
import CategoryFilter from "@/components/CategoryFilter";
import FoodCard from "@/components/FoodCard";
import FoodModal from "@/components/FoodModal";

const PAGE_SIZE = 9;

export default function RekomendasiContent() {
  const raw = useSearchParams().get("kategori");
  const categoryId = raw ? (getCategory(raw)?.id ?? null) : null;
  return <RekomendasiList key={categoryId ?? "all"} categoryId={categoryId} />;
}

function RekomendasiList({ categoryId }: { categoryId: string | null }) {
  const router = useRouter();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Food | null>(null);

    const active = categoryId ? getCategory(categoryId) : undefined;
  const list = active
    ? foods.filter((f) => f.categories.includes(active.id))
    : foods;
  const shown = list.slice(0, limit);

  function choose(id: string | null) {
    router.replace(id ? `/rekomendasi?kategori=${id}` : "/rekomendasi", {
      scroll: false,
    });
    if (window.innerWidth < 992) {
      document
        .getElementById("hasil-rekomendasi")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main id="main-content">
      {/* HERO */}
      <section
        className="container py-5 text-center"
        aria-labelledby="rekomendasi-hero-title"
      >
        <span>✨ Rekomendasi Kuliner</span>
        <h2 id="rekomendasi-hero-title">Temukan Kuliner yang Cocok Untukmu</h2>
        <p>
          Bingung mau makan apa? Pilih kategori sesuai selera dan kebutuhanmu,
          lalu temukan rekomendasi makanan khas Surabaya yang paling pas.
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <strong>{foods.length}</strong> Kuliner
          </li>
          <li className="list-inline-item">
            <strong>{categories.length}</strong> Kategori
          </li>
          <li className="list-inline-item">
            <strong>{warungs.length}</strong> Warung
          </li>
        </ul>
      </section>

      {/* PILIH KATEGORI */}
      <section className="container py-4" aria-labelledby="kategori-title">
        <h2 id="kategori-title">Pilih Sesuai Seleramu</h2>
        <p>
          Klik salah satu kategori untuk melihat rekomendasi. Klik sekali lagi
          untuk menampilkan semua kuliner.
        </p>
        <CategoryFilter active={categoryId} onChange={choose} />
      </section>

      {/* HASIL */}
      <section
        id="hasil-rekomendasi"
        className="container py-4"
        aria-labelledby="hasil-title"
      >
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 id="hasil-title">
              {active
                ? `${active.icon} Rekomendasi ${active.label}`
                : "Semua Kuliner Surabaya"}
            </h2>
            <p aria-live="polite">
              {active
                ? `${list.length} kuliner cocok untuk kamu yang sedang ingin ${active.label.toLowerCase()}.`
                : `${list.length} kuliner khas Surabaya siap kamu jelajahi. Pilih kategori di atas untuk menyaring.`}
            </p>
          </div>
          {active && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => choose(null)}
            >
              Tampilkan Semua
            </button>
          )}
        </div>

        <div className="row g-4">
          {shown.map((food) => (
            <div className="col-12 col-sm-6 col-lg-4" key={food.id}>
              <FoodCard food={food} onOpen={setSelected} showTags />
            </div>
          ))}
        </div>

        {shown.length < list.length && (
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
            >
              Tampilkan Lebih Banyak ↓
            </button>
          </div>
        )}
      </section>

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
