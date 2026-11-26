"use client";

import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { foods, type Food } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";
import FoodCard from "@/components/food/FoodCard";
import FoodModal from "@/components/food/FoodModal";
import LinkButton from "@/components/ui/LinkButton";
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

  function handleClear() {
    clearFavorites();
    setConfirmOpen(false);
  }

  return (
    <Container>
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
            <LinkButton href="/katalog" variant="primary" className={katalog.emptyButton}>
              Jelajahi Katalog
            </LinkButton>
          </div>
        ) : (
          <Row className={`g-4 justify-content-center mx-auto ${home.katalogGrid}`}>
            {list.map((food) => (
              <Col xs={12} sm={6} lg={4} key={food.id}>
                <FoodCard food={food} onOpen={setSelected} />
              </Col>
            ))}
          </Row>
        )}
      </section>

      <FoodModal food={selected} onClose={() => setSelected(null)} />

      <Modal
        show={confirmOpen}
        onHide={() => setConfirmOpen(false)}
        centered
        animation={false}
        aria-labelledby="confirm-title"
        dialogClassName={confirm.dialog}
        contentClassName={`text-center ${confirm.box}`}
        backdropClassName={confirm.backdrop}
      >
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
          <Button
            variant=""
            className={confirm.btnGhost}
            onClick={() => setConfirmOpen(false)}
          >
            Batal
          </Button>
          <Button
            variant=""
            className={confirm.btnDanger}
            onClick={handleClear}
          >
            Ya, Hapus
          </Button>
        </div>
      </Modal>
    </Container>
  );
}
