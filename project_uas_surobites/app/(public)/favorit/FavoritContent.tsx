"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { foods, type Food } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";
import FoodCard from "@/components/food/FoodCard";
import FoodModal from "@/components/food/FoodModal";
import home from "@/app/styles/home.module.css";
import katalog from "@/app/styles/katalog.module.css";
import confirm from "@/app/styles/confirm.module.css";
import styles from "@/app/styles/favorit.module.css";

export default function FavoritContent() {
  const { favorites, clearFavorites } = useFavorites();
  const [selected, setSelected] = useState<Food | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Urutan mengikuti katalog; id lama yang sudah tidak ada di data diabaikan
  const list = foods.filter((f) => favorites.includes(f.id));

  // Modal konfirmasi: tutup dengan Escape dan kunci scroll halaman
  useEffect(() => {
    if (!confirmOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConfirmOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [confirmOpen]);

  function handleClear() {
    clearFavorites();
    setConfirmOpen(false);
  }

  return (
    <div className="container">
      <section className={home.katalog} aria-labelledby="favorit-title">
        <div className={`text-center ${styles.heading}`}>
          <span
            className={`d-inline-flex align-items-center justify-content-center ${styles.headingIcon}`}
            aria-hidden="true"
          >
            <i className="fa-solid fa-heart"></i>
          </span>
          <h2 id="favorit-title" className={styles.title}>Favorit Saya</h2>
          <p className={styles.summary} aria-live="polite">
            {list.length > 0
              ? `Kamu menyimpan ${list.length} kuliner favorit. Klik ikon hati lagi untuk menghapusnya dari daftar.`
              : "Simpan kuliner yang ingin kamu coba agar mudah ditemukan kembali."}
          </p>
          {list.length > 0 && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setConfirmOpen(true)}
            >
              Hapus semua favorit
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className={`d-flex flex-column align-items-center text-center ${katalog.empty}`}>
            <div
              className={`d-flex align-items-center justify-content-center ${katalog.emptyIcon}`}
              aria-hidden="true"
            >
              <i className="fa-regular fa-heart"></i>
            </div>
            <h3 className={katalog.emptyTitle}>Belum ada makanan favorit.</h3>
            <p className={katalog.emptyText}>Klik ikon hati pada makanan yang ingin kamu simpan.</p>
            <Link href="/katalog" className={`btn btn-primary ${katalog.emptyButton}`}>
              Jelajahi Katalog
            </Link>
          </div>
        ) : (
          <div className={`row g-4 justify-content-center mx-auto ${home.katalogGrid}`}>
            {list.map((food) => (
              <div className="col-12 col-sm-6 col-lg-4" key={food.id}>
                <FoodCard food={food} onOpen={setSelected} />
              </div>
            ))}
          </div>
        )}
      </section>

      <FoodModal food={selected} onClose={() => setSelected(null)} />

      {confirmOpen && (
        <>
          <div
            className="modal d-block"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            tabIndex={-1}
            onClick={() => setConfirmOpen(false)}
          >
            <div
              className={`modal-dialog modal-dialog-centered ${confirm.dialog}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`modal-content text-center ${confirm.box}`}>
                <div
                  className={`d-flex align-items-center justify-content-center ${confirm.icon} ${confirm.iconDanger}`}
                  aria-hidden="true"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </div>
                <h2 className={confirm.title} id="confirm-title">
                  Hapus semua favorit?
                </h2>
                <p className={confirm.text}>
                  Semua kuliner yang kamu simpan akan dihapus dari daftar
                  favorit.
                </p>
                <div className={`d-flex ${confirm.actions}`}>
                  <button
                    type="button"
                    className={`btn ${confirm.btnGhost}`}
                    onClick={() => setConfirmOpen(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className={`btn ${confirm.btnDanger}`}
                    onClick={handleClear}
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`modal-backdrop show ${confirm.backdrop}`} />
        </>
      )}
    </div>
  );
}