"use client";

import { useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { admin } from "@/data/admin";
import ui from "@/app/styles/admin-ui.module.css";

type PasswordInputProps = {
  name: string;
  autoComplete: string;
};

function PasswordInput({ name, autoComplete }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={ui.inputIcon}>
      <Form.Control
        type={show ? "text" : "password"}
        name={name}
        className={`${ui.input} ${ui.withToggle}`}
        autoComplete={autoComplete}
        required
        minLength={name === "newPassword" ? 8 : undefined}
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
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "danger"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      setNotice({ type: "danger", message: "Konfirmasi password baru tidak sama." });
      return;
    }

    setSaving(true);
    setNotice(null);

    try {
      const response = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.get("currentPassword"),
          newPassword,
          confirmPassword,
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message ?? "Password gagal diubah.");

      form.reset();
      setNotice({ type: "success", message: result.message });
    } catch (error) {
      setNotice({
        type: "danger",
        message: error instanceof Error ? error.message : "Password gagal diubah.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>
            <i className="fa-solid fa-lock"></i> Akun Admin
          </h3>
          <p className={ui.panelSubtitle}>Ubah password login admin</p>
        </div>
      </div>

      {notice && <Alert variant={notice.type}>{notice.message}</Alert>}

      <Form noValidate onSubmit={handleSubmit}>
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
              readOnly
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
              readOnly
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
              Password baru <span className={ui.required}>*</span>
            </Form.Label>
            <PasswordInput name="newPassword" autoComplete="new-password" />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="acc-confirmPassword" className={`d-flex flex-column ${ui.field}`}>
            <Form.Label>
              Konfirmasi password baru <span className={ui.required}>*</span>
            </Form.Label>
            <PasswordInput name="confirmPassword" autoComplete="new-password" />
          </Form.Group>
        </Row>

        <div className={`d-flex justify-content-end ${ui.formActions}`}>
          <Button type="submit" variant="" className={`${ui.btn} ${ui.btnBlue}`} disabled={saving}>
            {saving && <Spinner animation="border" size="sm" aria-hidden="true" />}
            {saving ? "Menyimpan..." : "Simpan Password"}
          </Button>
        </div>
      </Form>
    </article>
  );
}
