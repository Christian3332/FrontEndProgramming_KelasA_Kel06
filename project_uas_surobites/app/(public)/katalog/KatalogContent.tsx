"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Col, Container, Row } from "react-bootstrap";
import type { Food } from "@/data/foods";
import { categoryNames, normalizeText } from "@/lib/helper";
import { useFoods } from "@/lib/useFoods";
import FoodCard from "@/components/food/FoodCard";
import FoodModal from "@/components/food/FoodModal";
import LinkButton from "@/components/ui/LinkButton";
import home from "@/app/styles/home.module.css";
import styles from "@/app/styles/katalog.module.css";

const PAGE_SIZE = 9;

export default function KatalogContent() {
  const foods = useFoods();
  const keyword = useSearchParams().get("q")?.trim() ?? "";
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Food | null>(null);

  const list = keyword
    ? foods.filter((food) => normalizeText([
        food.name,
        food.shortDescription,
        food.taste,
        food.ingredients.join(" "),
        categoryNames(food).join(" "),
      ].join(" ")).includes(normalizeText(keyword)))
    : foods;
  // Kalau lagi mencari, semua hasil langsung ditampilkan
  const shown = keyword ? list : list.slice(0, limit);

  return (
    <Container>
      <section className={home.katalog} aria-labelledby="katalog-title">
        <h2 id="katalog-title" className={home.sectionTitle}>Makanan Khas Surabaya</h2>
        <p className={home.subtitle}>
          Klik <strong>Deskripsi Singkat</strong> untuk mengenal setiap
          hidangan, lalu simpan yang kamu suka dengan ikon hati.
        </p>

        {keyword && (
          <div
            className={`d-flex flex-wrap align-items-center justify-content-between ${styles.searchStatus}`}
            aria-live="polite"
          >
            <span>
              Menampilkan <strong>{list.length}</strong> hasil untuk{" "}
              <strong>&quot;{keyword}&quot;</strong>
            </span>
            <Link href="/katalog" className={styles.clearLink}>✕ Hapus pencarian</Link>
          </div>
        )}

        {list.length === 0 ? (
          <div className={`d-flex flex-column align-items-center text-center ${styles.empty}`}>
            <div className={`d-flex align-items-center justify-content-center ${styles.emptyIcon}`} aria-hidden="true">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <h3 className={styles.emptyTitle}>Kuliner yang kamu cari belum ditemukan.</h3>
            <p className={styles.emptyText}>
              Coba kata kunci lain, misalnya nama makanan, bahan, atau kategori
              seperti &quot;pedas&quot;.
            </p>
            <LinkButton href="/katalog" variant="primary" className={styles.emptyButton}>
              Lihat Semua Kuliner
            </LinkButton>
          </div>
        ) : (
          <Row className={`g-4 justify-content-center mx-auto ${home.katalogGrid}`}>
            {shown.map((food) => (
              <Col xs={12} sm={6} lg={4} key={food.id}>
                <FoodCard food={food} onOpen={setSelected} />
              </Col>
            ))}
          </Row>
        )}

        {shown.length < list.length && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant=""
              className={`d-inline-flex align-items-center gap-2 ${home.btnMore} ${styles.loadMore}`}
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
            >
              Tampilkan Lebih Banyak
              <span className={styles.downArrow} aria-hidden="true">↓</span>
            </Button>
          </div>
        )}
      </section>

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </Container>
  );
}
