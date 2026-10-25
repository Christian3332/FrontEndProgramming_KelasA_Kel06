"use client";

import { useState } from "react";

// TODO: ganti dengan FAQ asli dari data.js
const faqs = [
  { q: "Apa itu SuroBites?", 
    a: "SuroBites adalah website yang mengenalkan kuliner khas Surabaya, lengkap dengan deskripsi singkat, rekomendasi berdasarkan selera, serta lokasi warung yang bisa kamu kunjungi." },
  { q: "Apa saja makanan yang tersedia?", 
    a: "Kamu bisa melihat seluruh makanan khas Surabaya di halaman Katalog, mulai dari Rawon Setan, Rujak Cingur, Tahu Tek, Pecel Semanggi, Nasi Cumi, hingga Kare Ayam." },
  { q: "Di mana saya dapat menemukan warung kuliner Surabaya?", 
    a: "Buka halaman Lokasi Warung. Di sana tersedia alamat, jam buka, menu andalan, dan tautan Google Maps untuk setiap warung." },
  { q: "Bagaimana cara mendapatkan rekomendasi kuliner?", 
    a: "Masuk ke halaman Rekomendasi lalu pilih kategori sesuai selera atau kebutuhanmu, misalnya Pedas, Berkuah, Hemat, atau Kuliner Malam." },
  { q: "Bagaimana cara menyimpan makanan favorit?", 
    a: "Klik ikon hati pada card makanan. Semua makanan yang kamu simpan bisa dilihat kapan saja lewat ikon hati di bagian atas halaman." },
  { q: "Apakah daftar favorit saya akan hilang saat halaman di-refresh?", 
    a: "Tidak. Daftar favorit tersimpan di browser yang kamu gunakan, jadi tetap ada meskipun halaman di-refresh atau kamu berpindah halaman." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title">
        Pertanyaan yang Sering Diajukan
      </h2>
      <p className="section-subtitle">
        Masih bingung? Temukan jawaban seputar SuroBites di sini.
      </p>
      <div className="faq-list">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={f.q}>
              <h3 className="faq-heading">
                <button
                  type="button"
                  className="faq-question"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div
                className="faq-answer"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                <div className="faq-answer__inner">
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}