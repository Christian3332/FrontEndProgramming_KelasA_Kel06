"use client";

import { useEffect } from "react";

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
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content confirm-box">
            <div className="confirm-box__icon confirm-box__icon--danger">
              <i className={icon}></i>
            </div>
            <h2 id="confirm-title">{title}</h2>
            <p id="confirm-message">{message}</p>
            <div className="confirm-box__actions">
              <button type="button" className="ui-btn ui-btn--ghost" onClick={onCancel}>
                Batal
              </button>
              <button type="button" className="ui-btn ui-btn--danger" onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}
