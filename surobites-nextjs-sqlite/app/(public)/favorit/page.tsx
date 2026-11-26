import type { Metadata } from "next";
import FavoritContent from "./FavoritContent";

export const metadata: Metadata = {
  title: "Favorit Saya | SuroBites",
  description:
    "Daftar makanan khas Surabaya favorit yang kamu simpan di SuroBites.",
};

export default function FavoritPage() {
  return <FavoritContent />;
}