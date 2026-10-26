"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Button, Carousel } from "react-bootstrap";
import { warungs } from "@/data/foods";
import LinkButton from "@/components/ui/LinkButton";
import styles from "@/app/styles/home.module.css";

const noop = () => () => {};

function getReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function WarungCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useSyncExternalStore(noop, getReduceMotion, () => true);
  const list = warungs.slice(0, 5);
  const total = list.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // geser sendiri tiap 4 detik, berhenti kalau mouse atau fokus ada di carousel
  const autoPlay = !paused && !reduceMotion && total > 1;

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
        <Carousel
          id="warung-carousel-track"
          className={styles.track}
          activeIndex={index}
          onSelect={(i) => setIndex(i)}
          interval={autoPlay ? 4000 : null}
          pause={false}
          controls={false}
          indicators={false}
          fade
          tabIndex={0}
          aria-label="Daftar warung kuliner"
        >
          {list.map((w, i) => (
            <Carousel.Item
              key={w.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${total}`}
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
                <Button
                  href={w.mapsUrl}
                  variant=""
                  className={styles.btnBlue}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kunjungi
                </Button>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
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
        <LinkButton href="/lokasi" variant="" className={`d-inline-flex align-items-center gap-2 ${styles.btnMore}`}>
          Lihat Semua Lokasi Warung
          <span className={styles.btnMoreArrow} aria-hidden="true">
            →
          </span>
        </LinkButton>
      </div>
    </section>
  );
}
