import { getLowestPrice, getPriceLevel } from "@/lib/helper";
import ui from "@/app/styles/admin-ui.module.css";

type Props = { priceRange: string; label?: string };

// Tag kategori harga buat tabel admin, warnanya ngikut level
export default function PriceTag({ priceRange, label }: Props) {
  const level = getPriceLevel(getLowestPrice(priceRange));

  let color = ui.tagRed;
  if (level === "Murah") {
    color = ui.tagGreen;
  } else if (level === "Sedang") {
    color = ui.tagOrange;
  }

  return (
    <span className={`${ui.tag} ${color}`} title={priceRange}>
      {label ? `${label} · ${level}` : level}
    </span>
  );
}
