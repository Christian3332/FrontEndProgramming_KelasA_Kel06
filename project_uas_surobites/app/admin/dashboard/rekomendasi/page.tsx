import type { Metadata } from "next";
import { Button } from "react-bootstrap";
import SectionHead from "@/components/admin/SectionHead";
import CategorySummary from "@/components/admin/rekomendasi/CategorySummary";
import RecoList from "@/components/admin/rekomendasi/RecoList";
import ui from "@/app/styles/admin-ui.module.css";

export const metadata: Metadata = {
  title: "Kelola Rekomendasi",
};

export default function KelolaRekomendasiPage() {
  return (
    <section className={ui.section} aria-labelledby="sec-rekomendasi">
      <SectionHead
        id="sec-rekomendasi"
        title="Kelola Rekomendasi"
        description="Centang kategori untuk setiap makanan. Satu makanan boleh memiliki beberapa kategori, dan hasilnya langsung dipakai halaman Rekomendasi."
      >
        <Button href="/rekomendasi" target="_blank" rel="noopener" variant="" className={`${ui.btn} ${ui.btnOutline}`}>
          Lihat Halaman ↗
        </Button>
      </SectionHead>

      <CategorySummary />
      <RecoList />
    </section>
  );
}
