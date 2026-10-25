import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import FoodTable from "@/components/admin/makanan/FoodTable";

export const metadata: Metadata = {
  title: "Kelola Makanan",
};

export default function KelolaMakananPage() {
  return (
    <section className="admin-section" aria-labelledby="sec-makanan">
      <SectionHead
        id="sec-makanan"
        title="Kelola Makanan"
        description="Data makanan ini dipakai oleh halaman Katalog, Rekomendasi, Favorit, dan fitur pencarian."
      >
        <button type="button" className="ui-btn ui-btn--primary">
          + Tambah Makanan
        </button>
      </SectionHead>

      <FoodTable />
    </section>
  );
}
