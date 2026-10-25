"use client";

import { useEffect } from "react";
import styles from "@/app/styles/confirm.module.css";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  icon: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText,
  icon,
  onConfirm,
  onCancel,
}: Props) {
  // tombol Esc buat menutup, dan halaman belakang dikunci selama dialog terbuka
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        onClick={onCancel}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${styles.dialog}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`modal-content text-center ${styles.box}`}>
            <div className={`d-flex align-items-center justify-content-center ${styles.icon} ${styles.iconDanger}`}>
              <i className={icon}></i>
            </div>
            <h2 className={styles.title} id="confirm-title">{title}</h2>
            <p className={styles.text} id="confirm-message">{message}</p>
            <div className={`d-flex ${styles.actions}`}>
              <button type="button" className={`btn ${styles.btnGhost}`} onClick={onCancel}>
                Batal
              </button>
              <button type="button" className={`btn ${styles.btnDanger}`} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop show ${styles.backdrop}`}></div>
    </>
  );
}
