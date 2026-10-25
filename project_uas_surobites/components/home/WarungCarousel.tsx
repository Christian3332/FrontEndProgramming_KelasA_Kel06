"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { warungs } from "@/data/foods";
import styles from "@/app/styles/home.module.css";

export default function WarungCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const list = warungs.slice(0, 5);
  const total = list.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // geser sendiri tiap 4 detik, berhenti kalau mouse atau fokus ada di carousel
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() => setIndex((i) => (i + 1) % total), 4000);
    return () => clearTimeout(timer);
  }, [index, paused, total]);

  return (
    <section id="lokasi" className={styles.warung} aria-labelledby="lokasi-title">
      <h2 id="lokasi-title" className={styles.sectionTitle}>
        WARUNG MAKANAN KHAS SURABAYA
      </h2>
      <div
        className={`w-100 mx-auto ${styles.carousel}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Warung kuliner Surabaya"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <button
          type="button"
          className={`d-flex align-items-center justify-content-center rounded-circle ${styles.carouselBtn} ${styles.prev}`}
          aria-label="Warung sebelumnya"
          aria-controls="warung-carousel-track"
          onClick={prev}
        >
          &#8592;
        </button>
        <div
          className={styles.track}
          id="warung-carousel-track"
          tabIndex={0}
          aria-label="Daftar warung kuliner"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
        >
          {list.map((w, i) => (
            <div
              className={`${styles.slide} ${i === index ? styles.slideActive : ""}`}
              key={w.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${total}`}
              aria-hidden={i !== index}
            >
              <div className={`position-relative ${styles.slideMedia}`}>
                <Image
                  src={w.image}
                  alt={w.name}
                  fill
                  sizes="(min-width: 768px) 680px, 100vw"
                  className={styles.slideImg}
                />
              </div>
              <div className={styles.warungInfo}>
                <h3 className={styles.warungName}>{w.name}</h3>
                <p className={styles.warungAddress}>{w.address}</p>
                <a
                  href={w.mapsUrl}
                  className={`btn ${styles.btnBlue}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kunjungi
                </a>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`d-flex align-items-center justify-content-center rounded-circle ${styles.carouselBtn} ${styles.next}`}
          aria-label="Warung berikutnya"
          aria-controls="warung-carousel-track"
          onClick={next}
        >
          &#8594;
        </button>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Link href="/lokasi" className={`btn d-inline-flex align-items-center gap-2 ${styles.btnMore}`}>
          Lihat Semua Lokasi Warung
          <span className={styles.btnMoreArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
