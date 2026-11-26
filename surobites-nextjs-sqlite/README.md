# SuroBites - versi Next.js + SQLite

Snapshot dari commit `72a0f5a` (5 Nov 2026), commit terakhir sebelum database diganti ke PostgreSQL di commit `1a2c62f`.

- Database SQLite lewat Prisma 7 dan `@prisma/adapter-better-sqlite3`, file database `dev.db` di folder ini.
- Schema di `prisma/schema.prisma`, 10 migration di `prisma/migrations`, data awal dari `prisma/seed.ts`.
- Semua data (makanan, warung, kategori, FAQ, konten, user, rating, love) dibaca dan ditulis lewat route API di `app/api`.
- Gambar hasil upload disimpan ke `public/uploads`.

## Menjalankan

1. Buat file `.env` dari contoh, lalu isi `ADMIN_SESSION_SECRET` dengan teks acak minimal 32 karakter.

   ```bash
   copy .env.example .env
   ```

   (di Git Bash / macOS / Linux: `cp .env.example .env`)

2. Install dependency. `postinstall` otomatis menjalankan `prisma generate`, jadi `.env` harus sudah ada.

   ```bash
   npm install
   ```

3. Buat database `dev.db` dari migration.

   ```bash
   npx prisma migrate deploy
   ```

   Bisa juga `npm run db:migrate` (mode development, interaktif).

4. Isi data awal dan akun admin (diambil dari `ADMIN_USERNAME` dan `ADMIN_PASSWORD` di `.env`).

   ```bash
   npm run db:seed
   ```

5. Jalankan.

   ```bash
   npm run dev
   ```

Buka http://localhost:3000

- Tamu hanya bisa membuka beranda, login, dan register (diatur `proxy.ts`). Daftar akun dulu di `/register` untuk membuka halaman lain.
- Panel admin di `/admin/login`, akun sesuai `.env` (contoh: `admin` / `admin123`).
- Melihat isi database: `npm run db:studio`.
- Reset database: hapus `dev.db`, lalu ulangi langkah 3 dan 4.

## Catatan

- Next.js 16.4.2 di lockfile punya kerentanan keamanan yang sudah diketahui. Kalau `npm run dev` atau `npm run build` berhenti dengan pesan "Your version of Next.js is affected by a known security vulnerability", jalankan ulang perintah yang sama.
- Saat `npm run build` muncul log `getCurrentUser gagal: Dynamic server usage ... /register`. Itu perilaku asli kode di commit ini (try/catch saat prerender), build tetap sukses dan halaman tetap jalan.
- File yang beda dari commit asli: `next.config.ts` (ditambah `turbopack.root` dari commit `1a2c62f`), `.gitignore` (ditambah `!.env.example`), serta file baru `.env.example` dan README ini.
