import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { put } from "@vercel/blob";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCurrentUser } from "@/lib/user-auth";

// cuma terima gambar biasa, maks 2 MB
const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_SIZE = 2 * 1024 * 1024;

export async function POST(request: Request) {
  // admin (gambar konten) atau user yang login (foto profil) boleh upload
  if (!(await isAdminAuthenticated()) && !(await getCurrentUser())) {
    return Response.json({ message: "Silakan login terlebih dahulu." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ message: "Pilih file gambar terlebih dahulu." }, { status: 400 });
  }

  const ext = allowedTypes[file.type];
  if (!ext) {
    return Response.json({ message: "Format gambar harus JPG, PNG, atau WEBP." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return Response.json({ message: "Ukuran gambar maksimal 2 MB." }, { status: 400 });
  }

  // nama file dibuat acak biar gak bentrok sama file lain
  const fileName = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;

  // di vercel folder public gak bisa ditulis, jadi gambar disimpan ke vercel blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`uploads/${fileName}`, file, { access: "public", contentType: file.type });
      return Response.json({ url: blob.url }, { status: 201 });
    } catch {
      return Response.json({ message: "Gambar gagal diunggah." }, { status: 500 });
    }
  }

  // kalau token blob belum diisi (lokal), simpan ke public/uploads seperti biasa
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));

  return Response.json({ url: `/uploads/${fileName}` }, { status: 201 });
}
