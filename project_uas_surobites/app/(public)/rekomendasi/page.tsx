import { Suspense } from "react";
import type { Metadata } from "next";
import RekomendasiContent from "./RekomendasiContent";

export const metadata: Metadata = {
  title: "Rekomendasi Kuliner | SuroBites",
  description:
    "Rekomendasi kuliner khas Surabaya berdasarkan selera: pedas, berkuah, gurih, segar, hemat, dan kuliner malam.",
};

export default function RekomendasiPage() {
  return (
    <Suspense>
      <RekomendasiContent />
    </Suspense>
  );
}
