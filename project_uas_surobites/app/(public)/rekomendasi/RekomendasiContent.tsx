"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Col, Row } from "react-bootstrap";
import { categories, warungs, type Food } from "@/data/foods";
import { useFoods } from "@/lib/useFoods";
import { getCategory } from "@/lib/helper";
import CategoryFilter from "@/components/food/CategoryFilter";
import FoodCard from "@/components/food/FoodCard";
import FoodModal from "@/components/food/FoodModal";
import home from "@/app/styles/home.module.css";
import card from "@/app/styles/food-card.module.css";
import katalog from "@/app/styles/katalog.module.css";
import styles from "@/app/styles/rekomendasi.module.css";

const PAGE_SIZE = 9;

export default function RekomendasiContent() {
  const raw = useSearchParams().get("kategori");
  const categoryId = raw ? (getCategory(raw)?.id ?? null) : null;
  return <RekomendasiList key={categoryId ?? "all"} categoryId={categoryId} />;
}

function RekomendasiList({ categoryId }: { categoryId: string | null }) {
  const foods = useFoods();
  const router = useRouter();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Food | null>(null);

    const active = categoryId ? getCategory(categoryId) : undefined;
  const list = active
    ? foods.filter((f) => f.categories.includes(active.id))
    : foods;
  const shown = list.slice(0, limit);

  function choose(id: string | null) {
    router.replace(id ? `/rekomendasi?kategori=${id}` : "/rekomendasi", {
      scroll: false,
    });
    if (window.innerWidth < 992) {
      document
        .getElementById("hasil-rekomendasi")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div>
      {/* HERO */}
      <section
        className={`d-flex flex-column justify-content-center ${home.hero} ${home.heroCompact}`}
        aria-labelledby="rekomendasi-hero-title"
      >
        <div className={`d-flex flex-column ${home.heroContent}`}>
          <span className={`align-self-start ${styles.eyebrow}`}>
            <i className="fa-solid fa-wand-magic-sparkles"></i> Rekomendasi Kuliner
          </span>
          <h2 id="rekomendasi-hero-title" className={home.heroTitle}>Temukan Kuliner yang Cocok Untukmu</h2>
          <p className={home.heroText}>
            Bingung mau makan apa? Pilih kategori sesuai selera dan kebutuhanmu,
            lalu temukan rekomendasi makanan khas Surabaya yang paling pas.
          </p>
          <ul className={`list-unstyled d-flex flex-wrap m-0 ${styles.stats}`}>
            <li className={`d-flex align-items-baseline ${styles.stat}`}>
              <strong>{foods.length}</strong> Kuliner
            </li>
            <li className={`d-flex align-items-baseline ${styles.stat}`}>
              <strong>{categories.length}</strong> Kategori
            </li>
            <li className={`d-flex align-items-baseline ${styles.stat}`}>
              <strong>{warungs.length}</strong> Warung
            </li>
          </ul>
        </div>
      </section>

      {/* PILIH KATEGORI */}
      <section className={home.kategori} aria-labelledby="kategori-title">
        <h2 id="kategori-title" className={home.sectionTitle}>Pilih Sesuai Seleramu</h2>
        <p className={home.subtitle}>
          Klik salah satu kategori untuk melihat rekomendasi. Klik sekali lagi
          untuk menampilkan semua kuliner.
        </p>
        <CategoryFilter foods={foods} active={categoryId} onChange={choose} />
      </section>

      {/* HASIL */}
      <section
        id="hasil-rekomendasi"
        className={home.katalog}
        aria-labelledby="hasil-title"
      >
        <div className={`d-flex flex-wrap align-items-end justify-content-between ${styles.resultsToolbar}`}>
          <div>
            <h2 id="hasil-title" className={styles.resultsTitle}>
              {active
                ? `${active.icon} Rekomendasi ${active.label}`
                : "Semua Kuliner Surabaya"}
            </h2>
            <p className={styles.resultsSubtitle} aria-live="polite">
              {active
                ? `${list.length} kuliner cocok untuk kamu yang sedang ingin ${active.label.toLowerCase()}.`
                : `${list.length} kuliner khas Surabaya siap kamu jelajahi. Pilih kategori di atas untuk menyaring.`}
            </p>
          </div>
          {active && (
            <Button
              variant=""
              className={card.btnLight}
              onClick={() => choose(null)}
            >
              Tampilkan Semua
            </Button>
          )}
        </div>

        <Row className={`g-4 justify-content-center mx-auto ${home.katalogGrid}`}>
          {shown.map((food) => (
            <Col xs={12} sm={6} lg={4} key={food.id}>
              <FoodCard food={food} onOpen={setSelected} showTags />
            </Col>
          ))}
        </Row>

        {shown.length < list.length && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant=""
              className={`d-inline-flex align-items-center gap-2 ${home.btnMore} ${katalog.loadMore}`}
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
            >
              Tampilkan Lebih Banyak
              <span className={katalog.downArrow} aria-hidden="true">↓</span>
            </Button>
          </div>
        )}
      </section>

      <FoodModal food={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
