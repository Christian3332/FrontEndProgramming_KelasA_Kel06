import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/admin/SectionHead";
import CategorySummary from "@/components/admin/rekomendasi/CategorySummary";
import RecoList from "@/components/admin/rekomendasi/RecoList";

export const metadata: Metadata = {
  title: "Kelola Rekomendasi",
};

export default function KelolaRekomendasiPage() {
  return (
    <section className="admin-section" aria-labelledby="sec-rekomendasi">
      <SectionHead
        id="sec-rekomendasi"
        title="Kelola Rekomendasi"
        description="Centang kategori untuk setiap makanan. Satu makanan boleh memiliki beberapa kategori, dan hasilnya langsung dipakai halaman Rekomendasi."
      >
        <Link href="/rekomendasi" target="_blank" rel="noopener" className="ui-btn ui-btn--outline">
          Lihat Halaman ↗
        </Link>
      </SectionHead>

      <CategorySummary />
      <RecoList />
    </section>
  );
}
