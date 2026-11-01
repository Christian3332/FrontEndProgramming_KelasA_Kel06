import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getSiteContent } from "@/lib/site-content";
import RekomendasiContent from "./RekomendasiContent";

export const metadata: Metadata = {
  title: "Rekomendasi Kuliner | SuroBites",
  description:
    "Rekomendasi kuliner khas Surabaya berdasarkan selera: pedas, berkuah, gurih, segar, hemat, dan kuliner malam.",
};

export default async function RekomendasiPage() {
  await connection();
  const content = await getSiteContent();

  return (
    <Suspense>
      <RekomendasiContent content={content} />
    </Suspense>
  );
}
