"use client";

import { useState } from "react";

const kontenAwal = {
  heroTitle: "JELAJAHI CITA RASA LEGENDARIS SURABAYA",
  heroDescription:
    "Nikmati Kelezatan Kuliner Warisan Kota Pahlawan. Dari pekatnya kuah Rawon daging hingga segarnya bumbu petis Rujak Cingur dan Lontong Balap. Temukan sejarah, bahan rahasia, dan rekomendasi warung asli di satu tempat.",
  rekomendasiTitle: "Temukan Kuliner yang Cocok Untukmu",
  rekomendasiDescription:
    "Bingung mau makan apa? Pilih kategori sesuai selera dan kebutuhanmu, lalu temukan rekomendasi makanan khas Surabaya yang paling pas.",
  contactEmail: "SuroBites@gmail.com",
  contactPhone: "0888777999",
  instagram: "",
  facebook: "",
};

export default function KontenForm() {
  const [konten, setKonten] = useState(kontenAwal);

  // satu fungsi untuk semua input, yang diubah sesuai atribut name-nya
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setKonten({ ...konten, [e.target.name]: e.target.value });
  }

  return (
    <form noValidate>
      <div className="content-grid">
        <article className="panel">
          <div className="panel__header">
            <div>
              <h3 className="panel__title">
                <i className="fa-solid fa-house"></i> Hero Beranda
              </h3>
              <p className="panel__subtitle">Judul &amp; deskripsi di bagian paling atas Beranda</p>
            </div>
          </div>
          <div className="hero-preview">
            <span className="hero-preview__label">Pratinjau</span>
            <h4>{konten.heroTitle}</h4>
            <p>{konten.heroDescription}</p>
          </div>
          <div className="form-field">
            <label htmlFor="content-heroTitle">
              Judul hero <span className="required">*</span>
            </label>
            <input
              type="text"
              id="content-heroTitle"
              name="heroTitle"
              className="form-control"
              maxLength={80}
              value={konten.heroTitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="content-heroDescription">
              Deskripsi hero <span className="required">*</span>
            </label>
            <textarea
              id="content-heroDescription"
              name="heroDescription"
              className="form-control"
              rows={4}
              maxLength={400}
              value={konten.heroDescription}
              onChange={handleChange}
            ></textarea>
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <h3 className="panel__title">
                <i className="fa-solid fa-star"></i> Hero Rekomendasi
              </h3>
              <p className="panel__subtitle">Judul &amp; deskripsi di halaman Rekomendasi</p>
            </div>
          </div>
          <div className="hero-preview">
            <span className="hero-preview__label">Pratinjau</span>
            <h4>{konten.rekomendasiTitle}</h4>
            <p>{konten.rekomendasiDescription}</p>
          </div>
          <div className="form-field">
            <label htmlFor="content-rekomendasiTitle">
              Judul halaman <span className="required">*</span>
            </label>
            <input
              type="text"
              id="content-rekomendasiTitle"
              name="rekomendasiTitle"
              className="form-control"
              maxLength={80}
              value={konten.rekomendasiTitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="content-rekomendasiDescription">
              Deskripsi halaman <span className="required">*</span>
            </label>
            <textarea
              id="content-rekomendasiDescription"
              name="rekomendasiDescription"
              className="form-control"
              rows={4}
              maxLength={400}
              value={konten.rekomendasiDescription}
              onChange={handleChange}
            ></textarea>
          </div>
        </article>

        <article className="panel panel--wide">
          <div className="panel__header">
            <div>
              <h3 className="panel__title">
                <i className="fa-solid fa-phone"></i> Kontak &amp; Sosial Media
              </h3>
              <p className="panel__subtitle">Tampil di footer semua halaman publik</p>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="content-contactEmail">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="content-contactEmail"
                name="contactEmail"
                className="form-control"
                value={konten.contactEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="content-contactPhone">
                Nomor telepon <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="content-contactPhone"
                name="contactPhone"
                className="form-control"
                value={konten.contactPhone}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="content-instagram">Link Instagram</label>
              <input
                type="url"
                id="content-instagram"
                name="instagram"
                className="form-control"
                placeholder="https://instagram.com/..."
                value={konten.instagram}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="content-facebook">Link Facebook</label>
              <input
                type="url"
                id="content-facebook"
                name="facebook"
                className="form-control"
                placeholder="https://facebook.com/..."
                value={konten.facebook}
                onChange={handleChange}
              />
            </div>
          </div>
        </article>
      </div>

      <div className="sticky-actions">
        <button type="button" className="ui-btn ui-btn--ghost">
          Kembalikan Default
        </button>
        <button type="button" className="ui-btn ui-btn--primary">
          Simpan Konten
        </button>
      </div>
    </form>
  );
}
