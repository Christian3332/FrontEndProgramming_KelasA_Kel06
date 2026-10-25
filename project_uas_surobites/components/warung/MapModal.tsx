"use client";

import { useEffect } from "react";
import type { Warung } from "@/data/foods";
import styles from "@/app/styles/food-modal.module.css";

type Props = { warung: Warung | null; onClose: () => void };

function getMapsEmbed(w: Warung): string {
  const q = encodeURIComponent(`${w.name}, ${w.address}`);
  return `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
}

export default function MapModal({ warung, onClose }: Props) {
  useEffect(() => {
    if (!warung) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [warung, onClose]);

  if (!warung) return null;

  return (
    <>
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-modal-title"
        tabIndex={-1}
        onClick={onClose}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${styles.dialog} ${styles.mapDialog}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`modal-content ${styles.mapContent}`}>
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center rounded-circle border-0 ${styles.close}`}
              aria-label="Tutup"
              onClick={onClose}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className={`position-relative ${styles.mapFrame}`}>
              <iframe
                src={getMapsEmbed(warung)}
                title={`Peta ${warung.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="position-absolute top-0 start-0 w-100 h-100 border-0"
              />
            </div>

            <div className={`d-flex flex-column ${styles.mapBody}`}>
              <h2 className={styles.mapTitle} id="map-modal-title">
                {warung.name}
              </h2>
              <p className={styles.mapText}>{warung.address}</p>
              <a
                href={warung.mapsUrl}
                className={`btn align-self-start ${styles.btnDark}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka di Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop show ${styles.backdrop}`} />
    </>
  );
}
