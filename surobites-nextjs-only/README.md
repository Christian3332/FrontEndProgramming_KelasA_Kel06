# SuroBites - versi Next.js (tanpa database)

Snapshot dari commit `e6ff690` (28 Okt 2026), kondisi terakhir sebelum Prisma dipasang di commit `1eb2bf9`.

- Data makanan, warung, kategori, dan FAQ diambil dari `data/foods.ts` dan `data/faqs.ts`.
- Favorit disimpan di `localStorage` browser (`lib/favorites.ts`).
- Login admin masih dummy: dicocokkan dengan `data/admin.ts`, status login disimpan di `sessionStorage` (`lib/auth.ts`).
- Panel admin hanya menampilkan data. Tombol tambah/edit/hapus belum punya logic, sesuai histori.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Login admin di http://localhost:3000/admin/login dengan username `admin` dan password `admin123`.

Versi produksi lokal:

```bash
npm run build
npm start
```

## Catatan

- Next.js 16.4.2 di lockfile punya kerentanan keamanan yang sudah diketahui. Kalau `npm run dev` atau `npm run build` berhenti dengan pesan "Your version of Next.js is affected by a known security vulnerability", jalankan ulang perintah yang sama.
- Satu-satunya file yang beda dari commit asli adalah `next.config.ts` (ditambah `turbopack.root`, diambil dari commit `1a2c62f`) supaya Next.js tidak salah membaca `package-lock.json` milik folder induk.
