"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { admin } from "@/data/admin";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

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
      return;
    }
  }

  return (
    <div className="login-card">
      <div className="login-card__header">
        <Image
          className="login-card__logo"
          src="/img/Surobites Logo.png"
          alt="Logo SuroBites"
          width={64}
          height={64}
        />
        <p className="login-card__brand">SuroBites Admin</p>
        <h1>Masuk ke Dashboard</h1>
        <p>Silakan login untuk mengelola konten website.</p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="login-username">Username</label>
          <div className="input-icon">
            <i className="fa-solid fa-user"></i>
            <input
              id="login-username"
              name="username"
              type="text"
              className={`form-control ${usernameError ? "is-invalid" : ""}`}
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
          <p className="field-error" id="login-username-error" aria-live="polite">
            {usernameError}
          </p>
        </div>

        <div className="form-field">
          <label htmlFor="login-password">Password</label>
          <div className="input-icon input-icon--toggle">
            <i className="fa-solid fa-lock"></i>
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
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
              className="toggle-password"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
            </button>
          </div>
          <p className="field-error" id="login-password-error" aria-live="polite">
            {passwordError}
          </p>
        </div>

        <button type="submit" className="ui-btn ui-btn--primary ui-btn--block login-submit">
          <span>Login</span>
        </button>
      </form>

      <div className="demo-account">
        <strong>Akun demo</strong>
        <span>
          Username: <code>{admin.username}</code> &middot; Password: <code>{admin.password}</code>
        </span>
      </div>

      <Link href="/" className="back-link">← Kembali ke website</Link>
    </div>
  );
}
