"use client";

import { useState } from "react";
import Image from "next/image";
import { Form } from "react-bootstrap";
import ui from "@/app/styles/admin-ui.module.css";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ label, value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const result = await response.json();

    if (response.ok) {
      onChange(result.url);
    } else {
      setError(result.message ?? "Gambar gagal diunggah.");
    }

    setUploading(false);
    // dikosongin biar file yang sama bisa dipilih lagi
    event.target.value = "";
  }

  return (
    <Form.Group className={ui.field}>
      <Form.Label>{label}</Form.Label>
      <div className={`d-flex align-items-center ${ui.uploadBox}`}>
        {value && (
          // unoptimized biar file yang baru diupload langsung kebaca
          <Image src={value} alt="Preview gambar" width={96} height={96} unoptimized className={ui.uploadPreview} />
        )}
        <div className="flex-grow-1">
          <Form.Control type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} disabled={uploading} />
          <div className={ui.uploadHint}>
            {uploading ? "Mengunggah gambar..." : "Format JPG, PNG, atau WEBP. Maksimal 2 MB."}
          </div>
          {error && <p className={ui.fieldError}>{error}</p>}
        </div>
      </div>
    </Form.Group>
  );
}
