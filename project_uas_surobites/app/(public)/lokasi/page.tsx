import type { Metadata } from "next";
import LokasiContent from "./LokasiContent";

export const metadata: Metadata = {
  title: "Lokasi Warung | SuroBites",
  description:
    "Lokasi warung kuliner khas Surabaya lengkap dengan alamat, jam buka, menu, dan Google Maps.",
};

export default function LokasiPage() {
  return <LokasiContent />;
}