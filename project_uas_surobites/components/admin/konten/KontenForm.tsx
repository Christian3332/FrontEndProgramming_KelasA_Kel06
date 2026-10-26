"use client";

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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
    <Form noValidate>
      <Row className="g-3">
        <Col xs={12} xl={6}>
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
          <Form.Group controlId="content-heroTitle" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Judul hero <span className={ui.required}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="heroTitle"
              className={ui.input}
              maxLength={80}
              value={konten.heroTitle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="content-heroDescription" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Deskripsi hero <span className={ui.required}>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="heroDescription"
              className={`${ui.input} ${ui.textarea}`}
              rows={4}
              maxLength={400}
              value={konten.heroDescription}
              onChange={handleChange}
            />
          </Form.Group>
        </article>
        </Col>

        <Col xs={12} xl={6}>
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
          <Form.Group controlId="content-rekomendasiTitle" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Judul halaman <span className={ui.required}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="rekomendasiTitle"
              className={ui.input}
              maxLength={80}
              value={konten.rekomendasiTitle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="content-rekomendasiDescription" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Deskripsi halaman <span className={ui.required}>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="rekomendasiDescription"
              className={`${ui.input} ${ui.textarea}`}
              rows={4}
              maxLength={400}
              value={konten.rekomendasiDescription}
              onChange={handleChange}
            />
          </Form.Group>
        </article>
        </Col>

        <Col xs={12}>
        <article className={ui.panel}>
          <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
            <div>
              <h3 className={ui.panelTitle}>
                <i className="fa-solid fa-phone"></i> Kontak &amp; Sosial Media
              </h3>
              <p className={ui.panelSubtitle}>Tampil di footer semua halaman publik</p>
            </div>
          </div>
          <Row className="gx-3">
            <Form.Group as={Col} xs={12} md={6} controlId="content-contactEmail" className={`d-flex flex-column ${ui.field}`}>
              <Form.Label>
                Email <span className={ui.required}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="contactEmail"
                className={ui.input}
                value={konten.contactEmail}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="content-contactPhone" className={`d-flex flex-column ${ui.field}`}>
              <Form.Label>
                Nomor telepon <span className={ui.required}>*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                name="contactPhone"
                className={ui.input}
                value={konten.contactPhone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="content-instagram" className={`d-flex flex-column ${ui.field}`}>
              <Form.Label>Link Instagram</Form.Label>
              <Form.Control
                type="url"
                name="instagram"
                className={ui.input}
                placeholder="https://instagram.com/..."
                value={konten.instagram}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} controlId="content-facebook" className={`d-flex flex-column ${ui.field}`}>
              <Form.Label>Link Facebook</Form.Label>
              <Form.Control
                type="url"
                name="facebook"
                className={ui.input}
                placeholder="https://facebook.com/..."
                value={konten.facebook}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
        </article>
        </Col>
      </Row>

      <div className={`d-flex flex-wrap justify-content-end ${styles.stickyActions}`}>
        <Button variant="" className={`${ui.btn} ${ui.btnGhost}`}>
          Kembalikan Default
        </Button>
        <Button variant="primary" className={`${ui.btn} ${ui.btnPrimary}`}>
          Simpan Konten
        </Button>
      </div>
    </Form>
  );
}
