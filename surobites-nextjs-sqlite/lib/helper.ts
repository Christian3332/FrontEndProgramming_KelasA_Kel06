// Membersihkan teks
export function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

// Mencari data pakai kata kunci
export function searchItems<T>(
  items: T[],
  query: string,
  getSearchText: (item: T) => string,
): T[] {
  const keyword = normalizeText(query);

  if (!keyword) return items;

  return items.filter((item) =>
    normalizeText(getSearchText(item)).includes(keyword),
  );
}

// Ubah angka ke format rupiah
export function formatRupiah(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Ambil harga terendah dari teks, mis. "Rp15.000 – Rp25.000" jadi 15000
export function getLowestPrice(priceRange: string): number {
  const angka = priceRange.match(/\d[\d.]*/);
  return angka ? Number(angka[0].replace(/\./g, "")) : 0;
}

// Kategori harga menu buat halaman kelola warung
export function getPriceLevel(price: number): string {
  if (price < 15000) {
    return "Murah";
  } else if (price <= 30000) {
    return "Sedang";
  } else {
    return "Mahal";
  }
}

// Id kategori di database masih hemat/sedang/premium, jadi disesuaikan dari kondisi di atas
export function getPriceCategoryId(priceRange: string): string {
  const level = getPriceLevel(getLowestPrice(priceRange));
  if (level === "Murah") {
    return "hemat";
  } else if (level === "Sedang") {
    return "sedang";
  } else {
    return "premium";
  }
}

// Ubah teks jadi slug
export function createSlug(text: string): string {
  return normalizeText(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

import { categories, foods, prices, times, warungs } from "@/data/foods";
import type { Food, Warung } from "@/data/foods";

// Ambil data berdasarkan id
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getPrice = (id: string) => prices.find((p) => p.id === id);
export const getTime = (id: string) => times.find((t) => t.id === id);
export const findFood = (id: string) => foods.find((f) => f.id === id);
export const findWarung = (id: string) => warungs.find((w) => w.id === id);

export function categoryNames(food: Food): string[] {
  return food.categories.map((id) => getCategory(id)?.label ?? id);
}

export function searchFoods(keyword: string): Food[] {
  const key = normalizeText(keyword);
  const results = foods.filter((food) => {
    const text = [
      food.name,
      food.shortDescription,
      food.taste,
      food.ingredients.join(" "),
      categoryNames(food).join(" "),
    ].join(" ");
    return normalizeText(text).includes(key);
  });
  return results.sort(
    (a, b) =>
      Number(!normalizeText(a.name).includes(key)) -
      Number(!normalizeText(b.name).includes(key)),
  );
}

export function isWarungOpen(w: Warung): boolean {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = w.openTime.split(":").map(Number);
  const [ch, cm] = w.closeTime.split(":").map(Number);
  const open = oh * 60 + om;
  const close = ch * 60 + cm;
  return close > open
    ? current >= open && current < close
    : current >= open || current < close;
}

export const formatTime = (t: string) => t.replace(":", ".");