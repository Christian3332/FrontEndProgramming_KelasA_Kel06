import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import FoodTable from "@/components/admin/makanan/FoodTable";
import ui from "@/app/styles/admin-ui.module.css";

export const metadata: Metadata = {
  title: "Kelola Makanan",
};

export default function KelolaMakananPage() {
  return (
    <section className={ui.section} aria-labelledby="sec-makanan">
      <SectionHead
        id="sec-makanan"
        title="Kelola Makanan"
        description="Data makanan ini dipakai oleh halaman Katalog, Rekomendasi, Favorit, dan fitur pencarian."
      />

      <FoodTable />
    </section>
  );
}
