"use client";

import { useEffect } from "react";
import type { Warung } from "@/data/foods";

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
          className="modal-dialog modal-dialog-centered modal-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content overflow-hidden">
            <div className="modal-header">
              <h2 className="modal-title h5" id="map-modal-title">
                {warung.name}
              </h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Tutup"
                onClick={onClose}
              />
            </div>

            <div className="ratio ratio-4x3">
              <iframe
                src={getMapsEmbed(warung)}
                title={`Peta ${warung.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="modal-body">
              <p className="mb-3">{warung.address}</p>
              <a
                href={warung.mapsUrl}
                className="btn btn-primary rounded-pill"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka di Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}