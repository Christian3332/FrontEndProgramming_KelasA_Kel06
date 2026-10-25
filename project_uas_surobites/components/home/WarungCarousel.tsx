"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { warungs } from "@/data/foods";

export default function WarungCarousel() {
  const [index, setIndex] = useState(0);
  const list = warungs.slice(0, 5);
  const total = list.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section id="lokasi" className="warung-section" aria-labelledby="lokasi-title">
      <div className="section-title">
        <h2 id="lokasi-title">WARUNG MAKANAN KHAS SURABAYA</h2>
      </div>
      <div
        className="carousel-container"
        role="region"
        aria-roledescription="carousel"
        aria-label="Warung kuliner Surabaya"
      >
        <button
          type="button"
          className="carousel-btn prev-btn"
          aria-label="Warung sebelumnya"
          aria-controls="warung-carousel-track"
          onClick={prev}
        >
          &#8592;
        </button>
        <div
          className="carousel-track"
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
              className={`carousel-slide ${i === index ? "is-active" : ""}`}
              key={w.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${total}`}
              aria-hidden={i !== index}
            >
              <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
                <Image
                  src={w.image}
                  alt={w.name}
                  fill
                  sizes="(min-width: 768px) 680px, 100vw"
                />
              </div>
              <div className="warung-info">
                <h3>{w.name}</h3>
                <p>{w.address}</p>
                <a
                  href={w.mapsUrl}
                  className="btn-blue"
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
          className="carousel-btn next-btn"
          aria-label="Warung berikutnya"
          aria-controls="warung-carousel-track"
          onClick={next}
        >
          &#8594;
        </button>
      </div>
      <div className="section-cta">
        <Link href="/lokasi" className="btn-more">
          Lihat Semua Lokasi Warung
          <span className="btn-more__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}