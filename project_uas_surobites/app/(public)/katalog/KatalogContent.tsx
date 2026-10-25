"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { foods, type Food } from "@/data/foods";
import { searchFoods } from "@/lib/helper";
import FoodCard from "@/components/food/FoodCard";
import FoodModal from "@/components/food/FoodModal";

const PAGE_SIZE = 9;

export default function KatalogContent() {
  const keyword = useSearchParams().get("q")?.trim() ?? "";
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Food | null>(null);

  const list = keyword ? searchFoods(keyword) : foods;
  // Kalau lagi mencari, semua hasil langsung ditampilkan
  const shown = keyword ? list : list.slice(0, limit);

  return (
    <div className="container py-4">
      <section aria-labelledby="katalog-title">
        <h2 id="katalog-title">Makanan Khas Surabaya</h2>
        <p>
          Klik <strong>Deskripsi Singkat</strong> untuk mengenal setiap
          hidangan, lalu simpan yang kamu suka dengan ikon hati.
        </p>

        {keyword && (
          <div
            className="alert alert-light d-flex justify-content-between"
            aria-live="polite"
          >
            <span>
              Menampilkan <strong>{list.length}</strong> hasil untuk{" "}
              <strong>&quot;{keyword}&quot;</strong>
            </span>
            <Link href="/katalog">✕ Hapus pencarian</Link>
          </div>
        )}

        {list.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1">🔍</div>
            <h3>Kuliner yang kamu cari belum ditemukan.</h3>
            <p>
              Coba kata kunci lain, misalnya nama makanan, bahan, atau kategori
              seperti &quot;pedas&quot;.
            </p>
            <Link href="/katalog" className="btn btn-primary">
              Lihat Semua Kuliner
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {shown.map((food) => (
              <div className="col-12 col-sm-6 col-lg-4" key={food.id}>
                <FoodCard food={food} onOpen={setSelected} />
              </div>
            ))}
          </div>
        )}

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
    </div>
  );
}
