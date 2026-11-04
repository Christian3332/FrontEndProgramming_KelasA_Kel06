"use client";

import { Button, Modal } from "react-bootstrap";
import type { Warung } from "@/data/foods";
import styles from "@/app/styles/food-modal.module.css";

type Props = { warung: Warung | null; onClose: () => void };

function getMapsEmbed(w: Warung): string {
  const q = encodeURIComponent(`${w.name}, ${w.address}`);
  return `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
}

export default function MapModal({ warung, onClose }: Props) {
  if (!warung) return null;

  return (
    <Modal
      show
      onHide={onClose}
      centered
      animation={false}
      aria-labelledby="map-modal-title"
      dialogClassName={`${styles.dialog} ${styles.mapDialog}`}
      contentClassName={styles.mapContent}
      backdropClassName={styles.backdrop}
    >
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
        <Button
          href={warung.mapsUrl}
          variant=""
          className={`align-self-start ${styles.btnDark}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buka di Google Maps ↗
        </Button>
      </div>
    </Modal>
  );
}
