"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-login.module.css";
import { reloadLikes } from "@/lib/favorites";

type Props = { mode: "login" | "register" };

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const isRegister = mode === "register";

  // halaman tujuan setelah login (dikirim dari redirect), harus path lokal biar gak bisa dibelokin ke situs lain
  const next = params.get("next") ?? "/";
  const target = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (isRegister && name.trim() === "") return setError("Nama wajib diisi.");
    if (email.trim() === "") return setError("Email wajib diisi.");
    if (password === "") return setError("Password wajib diisi.");
    if (isRegister && password.length < 6) return setError("Password minimal 6 karakter.");

    setLoading(true);
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isRegister ? { name, email, password } : { email, password }),
    }).catch(() => null);

    if (!response?.ok) {
      const data = await response?.json().catch(() => null);
      setError(data?.message ?? "Terjadi kesalahan. Coba lagi.");
      setLoading(false);
      return;
    }

    // refresh biar komponen server (navbar dll) ikut baca cookie yang baru
    reloadLikes();
    router.replace(target);
    router.refresh();
  }

  return (
    <div className={`w-100 ${styles.card}`}>
      <div className={`text-center ${styles.cardHeader}`}>
        <Image className={styles.cardLogo} src="/img/Surobites Logo.png" alt="Logo SuroBites" width={64} height={64} />
        <p className={styles.cardBrand}>SuroBites</p>
        <h1 className={styles.cardTitle}>{isRegister ? "Buat Akun Baru" : "Masuk ke Akunmu"}</h1>
        <p className={styles.cardText}>
          {isRegister ? "Daftar dulu biar bisa jelajahi kuliner Surabaya." : "Login untuk lanjut jelajahi kuliner Surabaya."}
        </p>
      </div>

      <Form noValidate onSubmit={handleSubmit}>
        {error && <Alert variant="danger" className={ui.alert}>{error}</Alert>}

        {isRegister && (
          <Form.Group controlId="auth-name" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>Nama</Form.Label>
            <div className={ui.inputIcon}>
              <i className={`fa-solid fa-user position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
              <Form.Control
                className={`${ui.input} ${ui.withIcon}`}
                placeholder="Nama lengkap"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Form.Group>
        )}

        <Form.Group controlId="auth-email" className={`d-flex flex-column ${ui.field}`}>
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

        <Form.Group controlId="auth-password" className={`d-flex flex-column ${ui.field}`}>
          <Form.Label>Password</Form.Label>
          <div className={ui.inputIcon}>
            <i className={`fa-solid fa-lock position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
            <Form.Control
              type={showPassword ? "text" : "password"}
              className={`${ui.input} ${ui.withIcon} ${ui.withToggle}`}
              placeholder={isRegister ? "Minimal 6 karakter" : "Masukkan password"}
              autoComplete={isRegister ? "new-password" : "current-password"}
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

        <Button type="submit" className={`w-100 ${ui.btn} ${ui.btnPrimary} ${styles.submit}`} disabled={loading}>
          {loading && <Spinner animation="border" size="sm" aria-hidden="true" />}
          <span>{isRegister ? "Daftar" : "Login"}</span>
        </Button>
      </Form>

      <p className={`text-center ${styles.cardText} mt-3`}>
        {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
        <Link href={`/${isRegister ? "login" : "register"}?next=${encodeURIComponent(target)}`} className="fw-bold">
          {isRegister ? "Login di sini" : "Daftar di sini"}
        </Link>
      </p>
    </div>
  );
}
