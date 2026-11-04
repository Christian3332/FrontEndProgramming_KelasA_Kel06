export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "faq-apa-itu-surobites",
    question: "Apa itu SuroBites?",
    answer: "SuroBites adalah website yang mengenalkan kuliner khas Surabaya, lengkap dengan deskripsi singkat, rekomendasi berdasarkan selera, serta lokasi warung yang bisa kamu kunjungi."
  },
  {
    id: "faq-makanan-tersedia",
    question: "Apa saja makanan yang tersedia?",
    answer: "Kamu bisa melihat seluruh makanan khas Surabaya di halaman Katalog, mulai dari Rawon Setan, Rujak Cingur, Tahu Tek, Pecel Semanggi, Nasi Cumi, hingga Kare Ayam."
  },
  {
    id: "faq-lokasi-warung",
    question: "Di mana saya dapat menemukan warung kuliner Surabaya?",
    answer: "Buka halaman Lokasi Warung. Di sana tersedia alamat, jam buka, menu andalan, dan tautan Google Maps untuk setiap warung."
  },
  {
    id: "faq-cara-rekomendasi",
    question: "Bagaimana cara mendapatkan rekomendasi kuliner?",
    answer: "Masuk ke halaman Rekomendasi lalu pilih kategori sesuai selera atau kebutuhanmu, misalnya Pedas, Berkuah, Hemat, atau Kuliner Malam."
  },
  {
    id: "faq-simpan-favorit",
    question: "Bagaimana cara menyimpan makanan favorit?",
    answer: "Klik ikon hati pada card makanan. Semua makanan yang kamu simpan bisa dilihat kapan saja lewat ikon hati di bagian atas halaman."
  },
  {
    id: "faq-favorit-tersimpan",
    question: "Apakah daftar favorit saya akan hilang saat halaman di-refresh?",
    answer: "Tidak. Daftar favorit tersimpan di browser yang kamu gunakan, jadi tetap ada meskipun halaman di-refresh atau kamu berpindah halaman."
  }
];
