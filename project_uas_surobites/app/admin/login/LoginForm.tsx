"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { admin } from "@/data/admin";
import { isLoggedIn, login } from "@/lib/auth";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-login.module.css";

type FormAlert = {
  type: "info" | "error" | "success";
  message: string;
};

const alertClass = {
  info: ui.alertInfo,
  error: "",
  success: ui.alertSuccess,
};

const pesanInfo: Record<string, string> = {
  login: "Silakan login terlebih dahulu untuk membuka dashboard.",
  logout: "Kamu berhasil logout. Sampai jumpa lagi!",
};

export default function LoginForm() {
  const router = useRouter();
  const pesan = useSearchParams().get("pesan");
  const passwordRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formAlert, setFormAlert] = useState<FormAlert | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const info = pesan ? pesanInfo[pesan] : undefined;
  const shownAlert: FormAlert | null =
    formAlert ?? (info ? { type: "info", message: info } : null);

  let buttonText = "Login";
  if (loading) buttonText = "Memeriksa akun...";
  if (success) buttonText = "Berhasil, mengalihkan...";

  function shakeCard() {
    setShaking(true);
    setTimeout(() => setShaking(false), 450);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormAlert(null);

    let valid = true;

    if (username.trim() === "") {
      setUsernameError("Username wajib diisi.");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (password === "") {
      setPasswordError("Password wajib diisi.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      shakeCard();
      return;
    }

    setLoading(true);
    const berhasil = await login(username.trim(), password);

    if (berhasil) {
      setSuccess(true);
      setFormAlert({ type: "success", message: "Login berhasil, mengalihkan ke dashboard..." });
      setTimeout(() => router.push("/admin/dashboard"), 900);
    } else {
      setLoading(false);
      setFormAlert({ type: "error", message: "Username atau password salah. Silakan coba lagi." });
      setPassword("");
      passwordRef.current?.focus();
      shakeCard();
    }
  }

  return (
    <div className={`w-100 ${styles.card} ${shaking ? styles.shaking : ""}`}>
      <div className={`text-center ${styles.cardHeader}`}>
        <Image
          className={styles.cardLogo}
          src="/img/Surobites Logo.png"
          alt="Logo SuroBites"
          width={64}
          height={64}
        />
        <p className={styles.cardBrand}>SuroBites Admin</p>
        <h1 className={styles.cardTitle}>Masuk ke Dashboard</h1>
        <p className={styles.cardText}>Silakan login untuk mengelola konten website.</p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        {shownAlert && (
          <div className={`d-flex align-items-center ${ui.alert} ${alertClass[shownAlert.type]}`} role="alert">
            {shownAlert.message}
          </div>
        )}

        <div className={`d-flex flex-column ${ui.field}`}>
          <label htmlFor="login-username">Username</label>
          <div className={ui.inputIcon}>
            <i className={`fa-solid fa-user position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
            <input
              id="login-username"
              name="username"
              type="text"
              className={`form-control ${ui.input} ${ui.withIcon} ${usernameError ? ui.invalid : ""}`}
              placeholder="Masukkan username"
              autoComplete="username"
              aria-describedby="login-username-error"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
            />
          </div>
          <p className={ui.fieldError} id="login-username-error" aria-live="polite">
            {usernameError}
          </p>
        </div>

        <div className={`d-flex flex-column ${ui.field}`}>
          <label htmlFor="login-password">Password</label>
          <div className={ui.inputIcon}>
            <i className={`fa-solid fa-lock position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
            <input
              ref={passwordRef}
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`form-control ${ui.input} ${ui.withIcon} ${ui.withToggle} ${passwordError ? ui.invalid : ""}`}
              placeholder="Masukkan password"
              autoComplete="current-password"
              aria-describedby="login-password-error"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
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
          <p className={ui.fieldError} id="login-password-error" aria-live="polite">
            {passwordError}
          </p>
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-100 ${ui.btn} ${ui.btnPrimary} ${styles.submit}`}
          disabled={loading}
        >
          {loading && <span className={ui.spinner}></span>}
          <span>{buttonText}</span>
        </button>
      </form>

      <div className={`d-flex flex-column ${styles.demo}`}>
        <strong>Akun demo</strong>
        <span>
          Username: <code>{admin.username}</code> &middot; Password: <code>{admin.password}</code>
        </span>
      </div>

      <Link href="/" className={styles.backLink}>← Kembali ke website</Link>
    </div>
  );
}
