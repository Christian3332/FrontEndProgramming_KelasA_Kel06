"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert, Button, Form } from "react-bootstrap";
import styles from "@/app/styles/home.module.css";

export default function FaqQuestionForm() {
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [needLogin, setNeedLogin] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setResult(null);
    setNeedLogin(false);

    const response = await fetch("/api/faqs/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    }).catch(() => null);
    const data = await response?.json().catch(() => null);

    setSending(false);

    // belum login: pertanyaannya gak dihapus, jadi habis login tinggal kirim lagi
    if (response?.status === 401) setNeedLogin(true);
    if (response?.ok) setQuestion("");
    setResult({
      ok: Boolean(response?.ok),
      text: data?.message ?? "Pertanyaan gagal dikirim. Coba lagi.",
    });
  }

  return (
    <div className={`mx-auto ${styles.faqAsk}`}>
      <h3 className={styles.faqAskTitle}>Punya pertanyaan lain?</h3>
      <p className={styles.faqAskNote}>
        Tulis pertanyaanmu di sini. Kalau sudah dijawab admin, pertanyaanmu akan muncul di daftar FAQ.
      </p>

      {result && (
        <Alert variant={result.ok ? "success" : "danger"}>
          {result.text}{" "}
          {needLogin && <Link href="/login?next=/%23faq" className="fw-bold">Login sekarang</Link>}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={300}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Contoh: Apakah semua warung di SuroBites halal?"
          aria-label="Pertanyaan kamu"
          required
        />
        <div className="d-flex align-items-center justify-content-between mt-2">
          <small className={styles.faqAskNote}>{question.length}/300</small>
          <Button type="submit" variant="" className={styles.btnBlue} disabled={sending || question.trim().length < 10}>
            {sending ? "Mengirim..." : "Kirim Pertanyaan"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
