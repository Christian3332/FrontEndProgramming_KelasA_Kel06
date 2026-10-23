import { Suspense } from "react";
import type { Metadata } from "next";
import KatalogContent from "./KatalogContent";

export const metadata: Metadata = {
  title: "Katalog | SuroBites",
  description:
    "Katalog makanan khas Surabaya lengkap dengan deskripsi singkat dan fitur favorit.",
};

export default function KatalogPage() {
  return (
    <Suspense>
      <KatalogContent />
    </Suspense>
  );
}
