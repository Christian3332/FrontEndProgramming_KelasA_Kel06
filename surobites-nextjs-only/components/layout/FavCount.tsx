"use client";

import { Badge } from "react-bootstrap";
import { foods } from "@/data/foods";
import { useFavorites } from "@/lib/favorites";
import styles from "@/app/styles/header.module.css";

export default function FavCount() {
  const { favorites } = useFavorites();
  const total = foods.filter((f) => favorites.includes(f.id)).length;
  if (total === 0) return null;

  return (
    <Badge
      pill
      bg=""
      className={`position-absolute ${styles.count}`}
      aria-label={`${total} favorit`}
    >
      {total}
    </Badge>
  );
}
