"use client";

import { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import ImageUpload from "@/components/admin/ImageUpload";
import styles from "@/app/styles/header.module.css";

export type ProfileUser = { id: number; name: string; email: string; image: string | null };

type Props = {
  user: ProfileUser;
  onClose: () => void;
  onSaved: (user: ProfileUser) => void;
};

export default function EditProfileModal({ user, onClose, onSaved }: Props) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // password lama cuma wajib kalau mau ganti password
    if (newPassword && !currentPassword) return setError("Isi password lama untuk mengganti password.");

    setSaving(true);
    const response = await fetch("/api/auth/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, image, currentPassword, newPassword }),
    }).catch(() => null);
    const data = await response?.json().catch(() => null);
    setSaving(false);

    if (!response?.ok) {
      setError(data?.message ?? "Profil gagal disimpan.");
      return;
    }
    onSaved(data);
  }

  return (
    <Modal show onHide={onClose} centered>
      <Form onSubmit={save}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profil</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <ImageUpload label="Foto profil" value={image} onChange={setImage} />
          {image && (
            <Button variant="link" size="sm" className={styles.removePhoto} onClick={() => setImage("")}>
              Hapus foto
            </Button>
          )}

          <Form.Group className="mb-3" controlId="profile-name">
            <Form.Label>Nama</Form.Label>
            <Form.Control required value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profile-email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <fieldset className={styles.passwordBox}>
            <legend className={styles.passwordTitle}>Ganti password (opsional)</legend>
            <Form.Group className="mb-2" controlId="profile-current-password">
              <Form.Label>Password lama</Form.Label>
              <Form.Control
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="profile-new-password">
              <Form.Label>Password baru</Form.Label>
              <Form.Control
                type="password"
                autoComplete="new-password"
                placeholder="Kosongkan kalau tidak diganti"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </fieldset>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Batal</Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving && <Spinner animation="border" size="sm" aria-hidden="true" />} Simpan
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
