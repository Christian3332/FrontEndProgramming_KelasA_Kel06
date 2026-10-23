"use client";

import { useEffect } from "react";
import Link from "next/link";
import { warungs, type Food } from "@/data/foods";
import { getCategory, getPrice, getTime } from "@/lib/helper";
import { useFavorites } from "@/lib/favorites";

type Props = { food: Food | null; onClose: () => void };

export default function FoodModal({ food, onClose }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!food) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [food, onClose]);

  if (!food) return null;

  const fav = isFavorite(food.id);
  const price = getPrice(food.priceCategory);
  const warungList = warungs.filter((w) => w.foodIds.includes(food.id));
  const timeText = food.timeCategory
    .map((id) => {
      const t = getTime(id);
      return t ? `${t.icon} ${t.label}` : id;
    })
    .join(", ");

  return (
    <>
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-modal-title"
        tabIndex={-1}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h4" id="food-modal-title">
                {food.name}
              </h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Tutup"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              <img
                src={food.image}
                alt={food.name}
                className="img-fluid rounded mb-3"
              />
              <p className="fw-semibold">
                💰 {price?.label} · {food.priceRange}
              </p>

              <div className="d-flex flex-wrap gap-2 mb-3">
                {food.categories.map((id) => {
                  const c = getCategory(id);
                  return c ? (
                    <Link
                      key={id}
                      href={`/rekomendasi?kategori=${c.id}`}
                      className="badge text-bg-secondary text-decoration-none"
                      onClick={onClose}
                    >
                      {c.icon} {c.label}
                    </Link>
                  ) : null;
                })}
              </div>

              <p>{food.shortDescription}</p>

              <details open className="mb-2">
                <summary>🧾 Bahan Utama</summary>
                <ul>
                  {food.ingredients.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>

              <details className="mb-2">
                <summary>😋 Karakteristik dan Waktu Terbaik</summary>
                <p className="mb-1">
                  <strong>Karakteristik:</strong> {food.taste}
                </p>
                <p>
                  <strong>Waktu terbaik:</strong> {timeText}
                </p>
              </details>

              <details className="mb-2">
                <summary>📜 Kisah Rasa</summary>
                <p>{food.story}</p>
              </details>

              {warungList.length > 0 && (
                <details className="mb-2">
                  <summary>📍 Tersedia di</summary>
                  <ul>
                    {warungList.map((w) => (
                      <li key={w.id}>
                        <Link href={`/lokasi#${w.id}`} onClick={onClose}>
                          {w.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className={`btn ${fav ? "btn-danger" : "btn-outline-danger"}`}
                onClick={() => toggleFavorite(food.id)}
              >
                {fav ? "♥ Tersimpan di Favorit" : "♡ Simpan ke Favorit"}
              </button>
              <Link
                href={`/rekomendasi?kategori=${food.categories[0]}`}
                className="btn btn-outline-primary"
                onClick={onClose}
              >
                Lihat yang Serupa
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}
