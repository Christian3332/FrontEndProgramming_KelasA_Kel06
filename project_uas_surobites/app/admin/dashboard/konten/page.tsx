import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import KontenForm from "@/components/admin/konten/KontenForm";

export const metadata: Metadata = {
  title: "Kelola Konten",
};

export default function KelolaKontenPage() {
  return (
    <section className="admin-section" aria-labelledby="sec-konten">
      <SectionHead
        id="sec-konten"
        title="Kelola Konten"
        description="Ubah teks utama website tanpa menyentuh kode. Perubahan langsung tampil di halaman publik."
      />

      <KontenForm />
    </section>
  );
}
