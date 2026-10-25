"use client";

import { useEffect } from "react";
import Link from "next/link";
import { warungs, type Food } from "@/data/foods";
import { getCategory, getPrice, getTime } from "@/lib/helper";
import { useFavorites } from "@/lib/favorites";
import styles from "@/app/styles/food-modal.module.css";

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

  const ingredients = (
    <ul className={`list-unstyled m-0 d-flex flex-wrap ${styles.ingredients}`}>
      {food.ingredients.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );

  const warungLinks = (
    <ul className={`list-unstyled m-0 d-flex flex-column ${styles.warungLinks}`}>
      {warungList.map((w) => (
        <li key={w.id}>
          <Link href={`/lokasi#${w.id}`} onClick={onClose}>
            <i className="fa-solid fa-location-dot"></i>
            {w.name}
          </Link>
        </li>
      ))}
    </ul>
  );

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
          className={`modal-dialog modal-dialog-centered ${styles.dialog}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`modal-content flex-md-row ${styles.content}`}>
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center rounded-circle border-0 ${styles.close}`}
              aria-label="Tutup"
              onClick={onClose}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className={`position-relative col-md-5 ${styles.media}`}>
              <img src={food.image} alt={food.name} className={`w-100 h-100 ${styles.mediaImg}`} />
              <span className={styles.price}>
                <i className="fa-solid fa-coins"></i> {price?.label} · {food.priceRange}
              </span>
            </div>

            <div className={`d-flex flex-column col-md-7 ${styles.body}`}>
              <div className={`d-flex flex-column ${styles.intro}`}>
                <p className={styles.eyebrow}>Deskripsi Singkat</p>
                <h2 className={styles.title} id="food-modal-title">
                  {food.name}
                </h2>
                <div className={`d-flex flex-wrap ${styles.chipList}`}>
                  {food.categories.map((id) => {
                    const c = getCategory(id);
                    return c ? (
                      <Link
                        key={id}
                        href={`/rekomendasi?kategori=${c.id}`}
                        className={styles.chip}
                        onClick={onClose}
                      >
                        {c.icon} {c.label}
                      </Link>
                    ) : null;
                  })}
                </div>
                <p className={styles.desc}>{food.shortDescription}</p>
              </div>

              <div className={`d-flex d-md-none flex-column ${styles.mobileDetail}`}>
                <div className="row g-2">
                  <div className="col-12">
                    <div className={styles.infoCard}>
                      <h3 className={styles.infoTitle}>Bahan Utama</h3>
                      {ingredients}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className={`h-100 ${styles.infoCard}`}>
                      <h3 className={styles.infoTitle}>Karakteristik</h3>
                      <p className={styles.infoText}>{food.taste}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className={`h-100 ${styles.infoCard}`}>
                      <h3 className={styles.infoTitle}>Waktu Terbaik</h3>
                      <p className={styles.infoText}>{timeText}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.story}>
                  <h3 className={styles.storyTitle}>
                    <i className="fa-solid fa-scroll"></i> Kisah Rasa
                  </h3>
                  <p className={styles.storyText}>{food.story}</p>
                </div>

                {warungList.length > 0 && (
                  <div>
                    <h3 className={styles.infoTitle}>Tersedia di</h3>
                    {warungLinks}
                  </div>
                )}
              </div>

              <div className={`d-none d-md-flex flex-column ${styles.detailList}`}>
                <details className={styles.detailItem} open>
                  <summary className={styles.detailToggle}>
                    <span className={styles.detailLabel}>
                      <span className={styles.detailIcon}>
                        <i className="fa-solid fa-receipt"></i>
                      </span>
                      Bahan Utama
                    </span>
                    <span className={styles.plusIcon}></span>
                  </summary>
                  <div className={styles.detailContent}>{ingredients}</div>
                </details>

                <details className={styles.detailItem}>
                  <summary className={styles.detailToggle}>
                    <span className={styles.detailLabel}>
                      <span className={styles.detailIcon}>
                        <i className="fa-regular fa-face-smile"></i>
                      </span>
                      Karakteristik &amp; Waktu Terbaik
                    </span>
                    <span className={styles.plusIcon}></span>
                  </summary>
                  <div className={`row g-2 mx-0 ${styles.detailContent} ${styles.detailFacts}`}>
                    <div className="col-6">
                      <div className={`h-100 ${styles.infoCard}`}>
                        <h4 className={styles.infoTitle}>Karakteristik</h4>
                        <p className={styles.infoText}>{food.taste}</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className={`h-100 ${styles.infoCard}`}>
                        <h4 className={styles.infoTitle}>Waktu Terbaik</h4>
                        <p className={styles.infoText}>{timeText}</p>
                      </div>
                    </div>
                  </div>
                </details>

                <details className={styles.detailItem}>
                  <summary className={styles.detailToggle}>
                    <span className={styles.detailLabel}>
                      <span className={styles.detailIcon}>
                        <i className="fa-solid fa-scroll"></i>
                      </span>
                      Kisah Rasa
                    </span>
                    <span className={styles.plusIcon}></span>
                  </summary>
                  <div className={styles.detailContent}>
                    <p className={styles.storyText}>{food.story}</p>
                  </div>
                </details>

                {warungList.length > 0 && (
                  <details className={styles.detailItem}>
                    <summary className={styles.detailToggle}>
                      <span className={styles.detailLabel}>
                        <span className={styles.detailIcon}>
                          <i className="fa-solid fa-location-dot"></i>
                        </span>
                        Tersedia di
                      </span>
                      <span className={styles.plusIcon}></span>
                    </summary>
                    <div className={styles.detailContent}>{warungLinks}</div>
                  </details>
                )}
              </div>

              <div className={`d-flex flex-wrap ${styles.actions}`}>
                <button
                  type="button"
                  className={`btn ${styles.btnFav} ${fav ? styles.btnFavActive : ""}`}
                  onClick={() => toggleFavorite(food.id)}
                >
                  <i className={fav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  {fav ? "Tersimpan di Favorit" : "Simpan ke Favorit"}
                </button>
                <Link
                  href={`/rekomendasi?kategori=${food.categories[0]}`}
                  className={`btn ${styles.btnSimilar}`}
                  onClick={onClose}
                >
                  Lihat yang Serupa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop show ${styles.backdrop}`} />
    </>
  );
}
