"use client";

import { useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import type { Faq } from "@/data/faqs";
import SectionHead from "@/components/admin/SectionHead";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FaqQuestions from "@/components/admin/faq/FaqQuestions";
import { refreshAdminCounts } from "@/components/admin/useAdminCounts";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

type Props = { initialFaqs: Faq[]; initialQuestions: Faq[] };

const faqKosong: Faq = { id: "", question: "", answer: "" };

export default function FaqAdmin({ initialFaqs, initialQuestions }: Props) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [form, setForm] = useState<Faq>(faqKosong);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  // faq yang lagi ditanyain mau dihapus atau nggak
  const [hapus, setHapus] = useState<Faq | null>(null);

  async function loadFaqs() {
    const response = await fetch("/api/faqs");
    if (response.ok) setFaqs(await response.json());
  }

  function startAdd() {
    setForm(faqKosong);
    setError("");
    setOpen(true);
  }

  function startEdit(faq: Faq) {
    setForm({ ...faq });
    setError("");
    setOpen(true);
  }

  async function saveFaq(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(form.id ? `/api/faqs/${form.id}` : "/api/faqs", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: form.question, answer: form.answer }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message ?? "FAQ gagal disimpan.");
        return;
      }

      setOpen(false);
      await loadFaqs();
      refreshAdminCounts();
    } catch {
      setError("FAQ gagal disimpan. Periksa koneksi lalu coba lagi.");
    }
  }

  async function moveFaq(id: string, direction: "up" | "down") {
    setError("");
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      if (!response.ok) {
        const result = await response.json();
        setError(result.message ?? "Urutan FAQ gagal diubah.");
        return;
      }
      await loadFaqs();
    } catch {
      setError("Urutan FAQ gagal diubah. Periksa koneksi lalu coba lagi.");
    }
  }

  async function deleteFaq(id: string) {
    setHapus(null);
    setError("");

    try {
      const response = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const result = await response.json();
        setError(result.message ?? "FAQ gagal dihapus.");
        return;
      }
      await loadFaqs();
      refreshAdminCounts();
    } catch {
      setError("FAQ gagal dihapus. Periksa koneksi lalu coba lagi.");
    }
  }

  return (
    <section className={ui.section} aria-labelledby="sec-faq">
      <SectionHead
        id="sec-faq"
        title="Kelola FAQ"
        description="Pertanyaan dan jawaban ini tampil sebagai accordion di Beranda. Gunakan tombol panah untuk mengatur urutan."
      >
        <Button variant="primary" className={`${ui.btn} ${ui.btnPrimary}`} onClick={startAdd}>
          + Tambah FAQ
        </Button>
      </SectionHead>

      <FaqQuestions
        initialQuestions={initialQuestions}
        onPublished={() => {
          loadFaqs();
          refreshAdminCounts();
        }}
      />

      <div className={ui.panel}>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className={`d-flex flex-column ${styles.faqList}`}>
          {faqs.length === 0 && <p className={ui.panelEmpty}>Belum ada data FAQ.</p>}

          {faqs.map((faq, index) => (
            <div className={`d-flex flex-wrap flex-md-nowrap align-items-md-center ${styles.faqItem}`} key={faq.id}>
              <span className={`d-flex align-items-center justify-content-center ${styles.faqNum}`}>{index + 1}</span>
              <div className={styles.faqBody}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
              <Col xs={12} md="auto" className={`d-flex justify-content-end ${ui.rowActions}`}>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Naikkan" aria-label={`Naikkan ${faq.question}`} disabled={index === 0} onClick={() => moveFaq(faq.id, "up")}>
                  <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Turunkan" aria-label={`Turunkan ${faq.question}`} disabled={index === faqs.length - 1} onClick={() => moveFaq(faq.id, "down")}>
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Edit" aria-label={`Edit ${faq.question}`} onClick={() => startEdit(faq)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn} ${ui.iconBtnDanger}`} title="Hapus" aria-label={`Hapus ${faq.question}`} onClick={() => setHapus(faq)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </Col>
            </div>
          ))}
        </div>
      </div>

      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Form onSubmit={saveFaq}>
          <Modal.Header closeButton>
            <Modal.Title>{form.id ? "Edit FAQ" : "Tambah FAQ"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className={ui.field}>
              <Form.Label>Pertanyaan</Form.Label>
              <Form.Control required value={form.question} onChange={(event) => setForm({ ...form, question: event.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Jawaban</Form.Label>
              <Form.Control required as="textarea" rows={4} value={form.answer} onChange={(event) => setForm({ ...form, answer: event.target.value })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>Simpan</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ConfirmDialog
        open={hapus !== null}
        title="Hapus FAQ?"
        message={`Pertanyaan "${hapus?.question}" tidak akan tampil lagi di Beranda.`}
        confirmText="Ya, Hapus"
        icon="fa-regular fa-trash-can"
        onConfirm={() => hapus && deleteFaq(hapus.id)}
        onCancel={() => setHapus(null)}
      />
    </section>
  );
}
