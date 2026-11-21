"use client";

import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-login.module.css";
import AuthCard from "@/components/auth/AuthCard";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (email.trim() === "") return setError("Email wajib diisi.");

    setLoading(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    const data = await response?.json().catch(() => null);
    setLoading(false);

    if (!response?.ok) return setError(data?.message ?? "Terjadi kesalahan. Coba lagi.");
    setSuccess(data?.message ?? "Link reset password sudah dikirim ke email kamu.");
  }

  return (
    <AuthCard title="Lupa Password?" text="Masukkan email akunmu, nanti kami kirim link untuk membuat password baru.">
      <Form noValidate onSubmit={handleSubmit}>
        {error && <Alert variant="danger" className={ui.alert}>{error}</Alert>}
        {success && <Alert variant="success" className={`${ui.alert} ${ui.alertSuccess}`}>{success}</Alert>}

        <Form.Group controlId="forgot-email" className={`d-flex flex-column ${ui.field}`}>
          <Form.Label>Email</Form.Label>
          <div className={ui.inputIcon}>
            <i className={`fa-solid fa-envelope position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
            <Form.Control
              type="email"
              className={`${ui.input} ${ui.withIcon}`}
              placeholder="nama@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Form.Group>

        <Button type="submit" className={`w-100 ${ui.btn} ${ui.btnPrimary} ${styles.submit}`} disabled={loading}>
          {loading && <Spinner animation="border" size="sm" aria-hidden="true" />}
          <span>{success ? "Kirim Ulang Link" : "Kirim Link Reset"}</span>
        </Button>
      </Form>
    </AuthCard>
  );
}
