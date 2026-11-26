"use client";

import { useEffect, useState } from "react";
import { categories as categoriesAwal } from "@/data/foods";
import type { Category } from "@/data/foods";

// FoodCard bisa muncul banyak sekaligus, jadi request yang lagi jalan dipakai bareng
// biar gak fetch berkali-kali. Habis selesai dikosongin lagi biar data tetap baru.
let pending: Promise<Category[]> | null = null;

function loadCategories() {
  if (!pending) {
    pending = fetch("/api/categories")
      .then((response) => {
        if (!response.ok) throw new Error("Data kategori gagal dimuat.");
        return response.json();
      })
      .catch(() => categoriesAwal)
      .finally(() => {
        pending = null;
      });
  }
  return pending;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(categoriesAwal);

  useEffect(() => {
    loadCategories().then(setCategories);
  }, []);

  return categories;
}
