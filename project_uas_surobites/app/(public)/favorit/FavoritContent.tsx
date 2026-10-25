"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { foods, type Food } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";
import FoodCard from "@/components/food/FoodCard";
import FoodModal from "@/components/food/FoodModal";

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
    <div className="container py-4">
      <section aria-labelledby="favorit-title">
        <div className="text-center mb-4">
          <div className="fs-1 text-danger" aria-hidden="true">
            ♥
          </div>
          <h2 id="favorit-title">Favorit Saya</h2>
          <p className="text-secondary" aria-live="polite">
            {list.length > 0
              ? `Kamu menyimpan ${list.length} kuliner favorit. Klik ikon hati lagi untuk menghapusnya dari daftar.`
              : "Simpan kuliner yang ingin kamu coba agar mudah ditemukan kembali."}
          </p>
          {list.length > 0 && (
            <button
              type="button"
              className="btn btn-link text-danger"
              onClick={() => setConfirmOpen(true)}
            >
              Hapus semua favorit
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div
            className="mx-auto text-center border border-2 rounded-4 p-5"
            style={{ maxWidth: 520 }}
          >
            <div className="fs-1" aria-hidden="true">
              ♡
            </div>
            <h3>Belum ada makanan favorit.</h3>
            <p>Klik ikon hati pada makanan yang ingin kamu simpan.</p>
            <Link href="/katalog" className="btn btn-primary rounded-pill">
              Jelajahi Katalog
            </Link>
          </div>
        ) : (
          <div className="row g-4">
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
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content text-center p-3">
                <div className="fs-1" aria-hidden="true">
                  🗑️
                </div>
                <h2 className="h5" id="confirm-title">
                  Hapus semua favorit?
                </h2>
                <p>
                  Semua kuliner yang kamu simpan akan dihapus dari daftar
                  favorit.
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => setConfirmOpen(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill"
                    onClick={handleClear}
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}
    </div>
  );
}