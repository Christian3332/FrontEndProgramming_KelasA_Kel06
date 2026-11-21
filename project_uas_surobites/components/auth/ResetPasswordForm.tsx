"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-login.module.css";
import AuthCard from "@/components/auth/AuthCard";

type Props = { token: string };

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 6) return setError("Password minimal 6 karakter.");
    if (password !== confirm) return setError("Konfirmasi password tidak sama.");

    setLoading(true);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    }).catch(() => null);

    if (!response?.ok) {
      const data = await response?.json().catch(() => null);
      setError(data?.message ?? "Terjadi kesalahan. Coba lagi.");
      setLoading(false);
      return;
    }

    // balik ke login, di sana muncul pesan kalau password sudah diganti
    router.replace("/login?reset=1");
  }

  return (
    <AuthCard title="Buat Password Baru" text="Masukkan password baru untuk akun SuroBites kamu.">
      <Form noValidate onSubmit={handleSubmit}>
        {error && <Alert variant="danger" className={ui.alert}>{error}</Alert>}

        <Form.Group controlId="reset-password" className={`d-flex flex-column ${ui.field}`}>
          <Form.Label>Password Baru</Form.Label>
          <div className={ui.inputIcon}>
            <i className={`fa-solid fa-lock position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
            <Form.Control
              type={showPassword ? "text" : "password"}
              className={`${ui.input} ${ui.withIcon} ${ui.withToggle}`}
              placeholder="Minimal 6 karakter"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center ${ui.toggle}`}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
            </button>
          </div>
        </Form.Group>

        <Form.Group controlId="reset-confirm" className={`d-flex flex-column ${ui.field}`}>
          <Form.Label>Konfirmasi Password</Form.Label>
          <div className={ui.inputIcon}>
            <i className={`fa-solid fa-lock position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
            <Form.Control
              type={showPassword ? "text" : "password"}
              className={`${ui.input} ${ui.withIcon}`}
              placeholder="Ulangi password baru"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </Form.Group>

        <Button type="submit" className={`w-100 ${ui.btn} ${ui.btnPrimary} ${styles.submit}`} disabled={loading}>
          {loading && <Spinner animation="border" size="sm" aria-hidden="true" />}
          <span>Simpan Password Baru</span>
        </Button>
      </Form>
    </AuthCard>
  );
}
