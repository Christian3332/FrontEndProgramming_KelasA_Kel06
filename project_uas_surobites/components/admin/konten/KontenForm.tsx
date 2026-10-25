"use client";

import { useState } from "react";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

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
      <div className="row g-3">
        <div className="col-12 col-xl-6">
        <article className={`h-100 ${ui.panel}`}>
          <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
            <div>
              <h3 className={ui.panelTitle}>
                <i className="fa-solid fa-house"></i> Hero Beranda
              </h3>
              <p className={ui.panelSubtitle}>Judul &amp; deskripsi di bagian paling atas Beranda</p>
            </div>
          </div>
          <div className={`d-flex flex-column justify-content-center ${styles.heroPreview}`}>
            <span className={styles.previewLabel}>Pratinjau</span>
            <h4 className={styles.previewTitle}>{konten.heroTitle}</h4>
            <p className={styles.previewText}>{konten.heroDescription}</p>
          </div>
          <div className={`d-flex flex-column ${ui.field}`}>
            <label htmlFor="content-heroTitle">
              Judul hero <span className={ui.required}>*</span>
            </label>
            <input
              type="text"
              id="content-heroTitle"
              name="heroTitle"
              className={`form-control ${ui.input}`}
              maxLength={80}
              value={konten.heroTitle}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column ${ui.field}`}>
            <label htmlFor="content-heroDescription">
              Deskripsi hero <span className={ui.required}>*</span>
            </label>
            <textarea
              id="content-heroDescription"
              name="heroDescription"
              className={`form-control ${ui.input} ${ui.textarea}`}
              rows={4}
              maxLength={400}
              value={konten.heroDescription}
              onChange={handleChange}
            ></textarea>
          </div>
        </article>
        </div>

        <div className="col-12 col-xl-6">
        <article className={`h-100 ${ui.panel}`}>
          <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
            <div>
              <h3 className={ui.panelTitle}>
                <i className="fa-solid fa-star"></i> Hero Rekomendasi
              </h3>
              <p className={ui.panelSubtitle}>Judul &amp; deskripsi di halaman Rekomendasi</p>
            </div>
          </div>
          <div className={`d-flex flex-column justify-content-center ${styles.heroPreview}`}>
            <span className={styles.previewLabel}>Pratinjau</span>
            <h4 className={styles.previewTitle}>{konten.rekomendasiTitle}</h4>
            <p className={styles.previewText}>{konten.rekomendasiDescription}</p>
          </div>
          <div className={`d-flex flex-column ${ui.field}`}>
            <label htmlFor="content-rekomendasiTitle">
              Judul halaman <span className={ui.required}>*</span>
            </label>
            <input
              type="text"
              id="content-rekomendasiTitle"
              name="rekomendasiTitle"
              className={`form-control ${ui.input}`}
              maxLength={80}
              value={konten.rekomendasiTitle}
              onChange={handleChange}
            />
          </div>
          <div className={`d-flex flex-column ${ui.field}`}>
            <label htmlFor="content-rekomendasiDescription">
              Deskripsi halaman <span className={ui.required}>*</span>
            </label>
            <textarea
              id="content-rekomendasiDescription"
              name="rekomendasiDescription"
              className={`form-control ${ui.input} ${ui.textarea}`}
              rows={4}
              maxLength={400}
              value={konten.rekomendasiDescription}
              onChange={handleChange}
            ></textarea>
          </div>
        </article>
        </div>

        <div className="col-12">
        <article className={ui.panel}>
          <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
            <div>
              <h3 className={ui.panelTitle}>
                <i className="fa-solid fa-phone"></i> Kontak &amp; Sosial Media
              </h3>
              <p className={ui.panelSubtitle}>Tampil di footer semua halaman publik</p>
            </div>
          </div>
          <div className="row gx-3">
            <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
              <label htmlFor="content-contactEmail">
                Email <span className={ui.required}>*</span>
              </label>
              <input
                type="email"
                id="content-contactEmail"
                name="contactEmail"
                className={`form-control ${ui.input}`}
                value={konten.contactEmail}
                onChange={handleChange}
              />
            </div>
            <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
              <label htmlFor="content-contactPhone">
                Nomor telepon <span className={ui.required}>*</span>
              </label>
              <input
                type="tel"
                id="content-contactPhone"
                name="contactPhone"
                className={`form-control ${ui.input}`}
                value={konten.contactPhone}
                onChange={handleChange}
              />
            </div>
            <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
              <label htmlFor="content-instagram">Link Instagram</label>
              <input
                type="url"
                id="content-instagram"
                name="instagram"
                className={`form-control ${ui.input}`}
                placeholder="https://instagram.com/..."
                value={konten.instagram}
                onChange={handleChange}
              />
            </div>
            <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
              <label htmlFor="content-facebook">Link Facebook</label>
              <input
                type="url"
                id="content-facebook"
                name="facebook"
                className={`form-control ${ui.input}`}
                placeholder="https://facebook.com/..."
                value={konten.facebook}
                onChange={handleChange}
              />
            </div>
          </div>
        </article>
        </div>
      </div>

      <div className={`d-flex flex-wrap justify-content-end ${styles.stickyActions}`}>
        <button type="button" className={`btn ${ui.btn} ${ui.btnGhost}`}>
          Kembalikan Default
        </button>
        <button type="button" className={`btn btn-primary ${ui.btn} ${ui.btnPrimary}`}>
          Simpan Konten
        </button>
      </div>
    </form>
  );
}
