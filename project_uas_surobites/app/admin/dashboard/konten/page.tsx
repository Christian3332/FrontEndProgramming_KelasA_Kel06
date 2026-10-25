import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import KontenForm from "@/components/admin/konten/KontenForm";
import ui from "@/app/styles/admin-ui.module.css";

export const metadata: Metadata = {
  title: "Kelola Konten",
};

export default function KelolaKontenPage() {
  return (
    <section className={ui.section} aria-labelledby="sec-konten">
      <SectionHead
        id="sec-konten"
        title="Kelola Konten"
        description="Ubah teks utama website tanpa menyentuh kode. Perubahan langsung tampil di halaman publik."
      />

      <KontenForm />
    </section>
  );
}
