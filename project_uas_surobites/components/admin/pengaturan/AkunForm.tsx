"use client";

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { admin } from "@/data/admin";
import ui from "@/app/styles/admin-ui.module.css";

type PasswordInputProps = {
  name: string;
  autoComplete: string;
};

// tiap kolom password punya tombol mata sendiri, jadi state-nya dipisah per kolom
function PasswordInput({ name, autoComplete }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={ui.inputIcon}>
      <Form.Control
        type={show ? "text" : "password"}
        name={name}
        className={`${ui.input} ${ui.withToggle}`}
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

      <Form noValidate>
        <Row className="gx-3">
          <Form.Group as={Col} xs={12} md={6} controlId="acc-username" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Username <span className={ui.required}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              className={ui.input}
              autoComplete="username"
              defaultValue={admin.username}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="acc-displayName" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>Nama tampilan</Form.Label>
            <Form.Control
              type="text"
              name="displayName"
              className={ui.input}
              maxLength={40}
              defaultValue={admin.displayName}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} controlId="acc-currentPassword" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Password saat ini <span className={ui.required}>*</span>
            </Form.Label>
            <PasswordInput name="currentPassword" autoComplete="current-password" />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="acc-newPassword" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Password baru <span className={ui.optional}>(opsional)</span>
            </Form.Label>
            <PasswordInput name="newPassword" autoComplete="new-password" />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="acc-confirmPassword" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>Konfirmasi password baru</Form.Label>
            <PasswordInput name="confirmPassword" autoComplete="new-password" />
          </Form.Group>
        </Row>

        <div className={`d-flex justify-content-end ${ui.formActions}`}>
          <Button variant="" className={`${ui.btn} ${ui.btnBlue}`}>
            Simpan Akun
          </Button>
        </div>
      </Form>
    </article>
  );
}
