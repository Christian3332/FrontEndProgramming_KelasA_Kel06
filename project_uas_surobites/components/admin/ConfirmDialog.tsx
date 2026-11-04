"use client";

import { Button, Modal } from "react-bootstrap";
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
  return (
    <Modal
      show={open}
      onHide={onCancel}
      centered
      animation={false}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      dialogClassName={styles.dialog}
      contentClassName={`text-center ${styles.box}`}
      backdropClassName={styles.backdrop}
    >
      <div className={`d-flex align-items-center justify-content-center ${styles.icon} ${styles.iconDanger}`}>
        <i className={icon}></i>
      </div>
      <h2 className={styles.title} id="confirm-title">{title}</h2>
      <p className={styles.text} id="confirm-message">{message}</p>
      <div className={`d-flex ${styles.actions}`}>
        <Button variant="" className={styles.btnGhost} onClick={onCancel}>
          Batal
        </Button>
        <Button variant="" className={styles.btnDanger} onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
