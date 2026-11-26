"use client";

import { useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import type { Faq } from "@/data/faqs";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

type Props = {
  initialQuestions: Faq[];
  onPublished: () => void; // biar daftar FAQ publik di bawahnya ikut ke-refresh
};

export default function FaqQuestions({ initialQuestions, onPublished }: Props) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [form, setForm] = useState<Faq | null>(null); // pertanyaan yang lagi dijawab
  const [hapus, setHapus] = useState<Faq | null>(null);
  const [error, setError] = useState("");

  async function loadQuestions() {
    const response = await fetch("/api/faqs/questions");
    if (response.ok) setQuestions(await response.json());
  }

  async function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;
    setError("");

    const response = await fetch(`/api/faqs/questions/${form.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: form.question, answer: form.answer }),
    }).catch(() => null);

    if (!response?.ok) {
      const result = await response?.json().catch(() => null);
      setError(result?.message ?? "Jawaban gagal disimpan.");
      return;
    }

    setForm(null);
    await loadQuestions();
    onPublished();
  }

  async function deleteQuestion(id: string) {
    setHapus(null);
    setError("");

    const response = await fetch(`/api/faqs/${id}`, { method: "DELETE" }).catch(() => null);
    if (!response?.ok) {
      setError("Pertanyaan gagal dihapus.");
      return;
    }
    await loadQuestions();
  }

  return (
    <div className={`${ui.panel} mb-4`}>
      <div className={ui.panelHeader}>
        <h3 className={ui.panelTitle}>Pertanyaan dari User ({questions.length})</h3>
        <p className={ui.panelSubtitle}>
          Pertanyaan baru dari pengunjung. Jawab untuk menampilkannya di FAQ Beranda, atau hapus kalau tidak relevan.
        </p>
      </div>

      {error && !form && <Alert variant="danger">{error}</Alert>}

      <div className={`d-flex flex-column ${styles.faqList}`}>
        {questions.length === 0 && <p className={ui.panelEmpty}>Belum ada pertanyaan baru.</p>}

        {questions.map((q) => (
          <div className={`d-flex flex-wrap flex-md-nowrap align-items-md-center ${styles.faqItem}`} key={q.id}>
            <span className={`d-flex align-items-center justify-content-center ${styles.faqNum}`}>
              <i className="fa-regular fa-circle-question"></i>
            </span>
            <div className={styles.faqBody}>
              <h3 className={styles.faqQuestion}>{q.question}</h3>
            </div>
            <Col xs={12} md="auto" className={`d-flex justify-content-end ${ui.rowActions}`}>
              <Button className={`${ui.btn} ${ui.btnSm} ${ui.btnPrimary}`} onClick={() => { setError(""); setForm({ ...q }); }}>
                Jawab
              </Button>
              <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn} ${ui.iconBtnDanger}`} title="Hapus" aria-label={`Hapus ${q.question}`} onClick={() => setHapus(q)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </Col>
          </div>
        ))}
      </div>

      <Modal show={form !== null} onHide={() => setForm(null)} centered>
        <Form onSubmit={publish}>
          <Modal.Header closeButton>
            <Modal.Title>Jawab Pertanyaan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className={ui.field}>
              <Form.Label>Pertanyaan (boleh dirapikan)</Form.Label>
              <Form.Control required value={form?.question ?? ""} onChange={(e) => form && setForm({ ...form, question: e.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Jawaban</Form.Label>
              <Form.Control required as="textarea" rows={4} value={form?.answer ?? ""} onChange={(e) => form && setForm({ ...form, answer: e.target.value })} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setForm(null)}>Batal</Button>
            <Button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>Jawab &amp; Tampilkan</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ConfirmDialog
        open={hapus !== null}
        title="Hapus pertanyaan?"
        message={`Pertanyaan "${hapus?.question}" akan dihapus dan tidak bisa dijawab lagi.`}
        confirmText="Ya, Hapus"
        icon="fa-regular fa-trash-can"
        onConfirm={() => hapus && deleteQuestion(hapus.id)}
        onCancel={() => setHapus(null)}
      />
    </div>
  );
}
