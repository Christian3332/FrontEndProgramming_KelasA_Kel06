import type { Metadata } from "next";
import { connection } from "next/server";
import SectionHead from "@/components/admin/SectionHead";
import FoodTable from "@/components/admin/makanan/FoodTable";
import { getCategories, getFoods } from "@/lib/queries";
import ui from "@/app/styles/admin-ui.module.css";

export const metadata: Metadata = {
  title: "Kelola Makanan",
};

export default async function KelolaMakananPage({
  searchParams,
}: {
  searchParams: Promise<{ aksi?: string }>;
}) {
  await connection();
  const { aksi } = await searchParams;
  const [foods, categories] = await Promise.all([getFoods(), getCategories()]);

  return (
    <section className={ui.section} aria-labelledby="sec-makanan">
      <SectionHead
        id="sec-makanan"
        title="Kelola Makanan"
        description="Data makanan ini dipakai oleh halaman Katalog, Rekomendasi, Favorit, dan fitur pencarian."
      />

      <FoodTable initialFoods={foods} initialCategories={categories} initialAdd={aksi === "tambah"} />
    </section>
  );
}
