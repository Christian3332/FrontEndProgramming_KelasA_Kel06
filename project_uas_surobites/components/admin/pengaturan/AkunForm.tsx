"use client";

import { useState } from "react";
import { admin } from "@/data/admin";
import ui from "@/app/styles/admin-ui.module.css";

type PasswordInputProps = {
  id: string;
  name: string;
  autoComplete: string;
};

// tiap kolom password punya tombol mata sendiri, jadi state-nya dipisah per kolom
function PasswordInput({ id, name, autoComplete }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={ui.inputIcon}>
      <input
        type={show ? "text" : "password"}
        id={id}
        name={name}
        className={`form-control ${ui.input} ${ui.withToggle}`}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className={`d-flex align-items-center justify-content-center ${ui.toggle}`}
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
    <article className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>
            <i className="fa-solid fa-lock"></i> Akun Admin
          </h3>
          <p className={ui.panelSubtitle}>Ubah username, nama tampilan, atau password login</p>
        </div>
      </div>

      <form noValidate>
        <div className="row gx-3">
          <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
            <label htmlFor="acc-username">
              Username <span className={ui.required}>*</span>
            </label>
            <input
              type="text"
              id="acc-username"
              name="username"
              className={`form-control ${ui.input}`}
              autoComplete="username"
              defaultValue={admin.username}
            />
          </div>
          <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
            <label htmlFor="acc-displayName">Nama tampilan</label>
            <input
              type="text"
              id="acc-displayName"
              name="displayName"
              className={`form-control ${ui.input}`}
              maxLength={40}
              defaultValue={admin.displayName}
            />
          </div>
          <div className={`col-12 d-flex flex-column ${ui.field}`}>
            <label htmlFor="acc-currentPassword">
              Password saat ini <span className={ui.required}>*</span>
            </label>
            <PasswordInput id="acc-currentPassword" name="currentPassword" autoComplete="current-password" />
          </div>
          <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
            <label htmlFor="acc-newPassword">
              Password baru <span className={ui.optional}>(opsional)</span>
            </label>
            <PasswordInput id="acc-newPassword" name="newPassword" autoComplete="new-password" />
          </div>
          <div className={`col-12 col-md-6 d-flex flex-column ${ui.field}`}>
            <label htmlFor="acc-confirmPassword">Konfirmasi password baru</label>
            <PasswordInput id="acc-confirmPassword" name="confirmPassword" autoComplete="new-password" />
          </div>
        </div>

        <div className={`d-flex justify-content-end ${ui.formActions}`}>
          <button type="button" className={`btn ${ui.btn} ${ui.btnBlue}`}>
            Simpan Akun
          </button>
        </div>
      </form>
    </article>
  );
}
