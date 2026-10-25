"use client";

import { useState } from "react";
import { admin } from "@/data/admin";

type PasswordInputProps = {
  id: string;
  name: string;
  autoComplete: string;
};

// tiap kolom password punya tombol mata sendiri, jadi state-nya dipisah per kolom
function PasswordInput({ id, name, autoComplete }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="input-icon input-icon--toggle input-icon--plain">
      <input
        type={show ? "text" : "password"}
        id={id}
        name={name}
        className="form-control"
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="toggle-password"
        aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        onClick={() => setShow(!show)}
      >
        <i className={show ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
      </button>
    </div>
  );
}

export default function AkunForm() {
  return (
    <article className="panel">
      <div className="panel__header">
        <div>
          <h3 className="panel__title">
            <i className="fa-solid fa-lock"></i> Akun Admin
          </h3>
          <p className="panel__subtitle">Ubah username, nama tampilan, atau password login</p>
        </div>
      </div>

      <form noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="acc-username">
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              id="acc-username"
              name="username"
              className="form-control"
              autoComplete="username"
              defaultValue={admin.username}
            />
          </div>
          <div className="form-field">
            <label htmlFor="acc-displayName">Nama tampilan</label>
            <input
              type="text"
              id="acc-displayName"
              name="displayName"
              className="form-control"
              maxLength={40}
              defaultValue={admin.displayName}
            />
          </div>
          <div className="form-field form-field--full">
            <label htmlFor="acc-currentPassword">
              Password saat ini <span className="required">*</span>
            </label>
            <PasswordInput id="acc-currentPassword" name="currentPassword" autoComplete="current-password" />
          </div>
          <div className="form-field">
            <label htmlFor="acc-newPassword">
              Password baru <span className="optional">(opsional)</span>
            </label>
            <PasswordInput id="acc-newPassword" name="newPassword" autoComplete="new-password" />
          </div>
          <div className="form-field">
            <label htmlFor="acc-confirmPassword">Konfirmasi password baru</label>
            <PasswordInput id="acc-confirmPassword" name="confirmPassword" autoComplete="new-password" />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="ui-btn ui-btn--blue">
            Simpan Akun
          </button>
        </div>
      </form>
    </article>
  );
}
