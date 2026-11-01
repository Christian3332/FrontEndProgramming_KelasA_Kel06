"use client";

import { useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

type SiteContent = {
  heroTitle: string;
  heroDescription: string;
  rekomendasiTitle: string;
  rekomendasiDescription: string;
  contactEmail: string;
  contactPhone: string;
  instagram: string;
  facebook: string;
};

type Props = {
  content: SiteContent;
  defaults: SiteContent;
};

export default function KontenForm({ content, defaults }: Props) {
  const [konten, setKonten] = useState(content);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "danger"; message: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setKonten({ ...konten, [e.target.name]: e.target.value });
  }

  async function saveContent(contentToSave: SiteContent) {
    setSaving(true);
    setNotice(null);

    try {
      const response = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contentToSave),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message ?? "Konten gagal disimpan.");

      setKonten(contentToSave);
      setNotice({ type: "success", message: result.message });
    } catch (error) {
      setNotice({
        type: "danger",
        message: error instanceof Error ? error.message : "Konten gagal disimpan.",
      });
    } finally {
      setSaving(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void saveContent(konten);
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {notice && <Alert variant={notice.type}>{notice.message}</Alert>}
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
                maxLength={120}
                required
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
                maxLength={30}
                required
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
                maxLength={200}
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
                maxLength={200}
                value={konten.facebook}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
        </article>
        </Col>
      </Row>

      <div className={`d-flex flex-wrap justify-content-end ${styles.stickyActions}`}>
        <Button
          type="button"
          variant=""
          className={`${ui.btn} ${ui.btnGhost}`}
          disabled={saving}
          onClick={() => void saveContent(defaults)}
        >
          Kembalikan Default
        </Button>
        <Button type="submit" variant="primary" className={`${ui.btn} ${ui.btnPrimary}`} disabled={saving}>
          {saving && <Spinner animation="border" size="sm" aria-hidden="true" />}
          {saving ? "Menyimpan..." : "Simpan Konten"}
        </Button>
      </div>
    </Form>
  );
}
