"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { foods, type Food } from "@/data/foods";
import { searchFoods } from "@/lib/helper";
import FoodCard from "@/components/food/FoodCard";
import FoodModal from "@/components/food/FoodModal";
import home from "@/app/styles/home.module.css";
import styles from "@/app/styles/katalog.module.css";

const PAGE_SIZE = 9;

export default function KatalogContent() {
  const keyword = useSearchParams().get("q")?.trim() ?? "";
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Food | null>(null);

  const list = keyword ? searchFoods(keyword) : foods;
  // Kalau lagi mencari, semua hasil langsung ditampilkan
  const shown = keyword ? list : list.slice(0, limit);

  return (
    <div className="container">
      <section className={home.katalog} aria-labelledby="katalog-title">
        <h2 id="katalog-title" className={home.sectionTitle}>Makanan Khas Surabaya</h2>
        <p className={home.subtitle}>
          Klik <strong>Deskripsi Singkat</strong> untuk mengenal setiap
          hidangan, lalu simpan yang kamu suka dengan ikon hati.
        </p>

        {keyword && (
          <div
            className={`d-flex flex-wrap align-items-center justify-content-between ${styles.searchStatus}`}
            aria-live="polite"
          >
            <span>
              Menampilkan <strong>{list.length}</strong> hasil untuk{" "}
              <strong>&quot;{keyword}&quot;</strong>
            </span>
            <Link href="/katalog" className={styles.clearLink}>✕ Hapus pencarian</Link>
          </div>
        )}

        {list.length === 0 ? (
          <div className={`d-flex flex-column align-items-center text-center ${styles.empty}`}>
            <div className={`d-flex align-items-center justify-content-center ${styles.emptyIcon}`} aria-hidden="true">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <h3 className={styles.emptyTitle}>Kuliner yang kamu cari belum ditemukan.</h3>
            <p className={styles.emptyText}>
              Coba kata kunci lain, misalnya nama makanan, bahan, atau kategori
              seperti &quot;pedas&quot;.
            </p>
            <Link href="/katalog" className={`btn btn-primary ${styles.emptyButton}`}>
              Lihat Semua Kuliner
            </Link>
          </div>
        ) : (
          <div className={`row g-4 justify-content-center mx-auto ${home.katalogGrid}`}>
            {shown.map((food) => (
              <div className="col-12 col-sm-6 col-lg-4" key={food.id}>
                <FoodCard food={food} onOpen={setSelected} />
              </div>
            ))}
          </div>
        )}

        {shown.length < list.length && (
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className={`btn d-inline-flex align-items-center gap-2 ${home.btnMore} ${styles.loadMore}`}
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
            >
              Tampilkan Lebih Banyak
              <span className={styles.downArrow} aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </section>

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
