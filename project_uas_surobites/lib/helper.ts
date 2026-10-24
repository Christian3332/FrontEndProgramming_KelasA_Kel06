// Function membersihkan text
export function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

// Function mencari data menggunakan kata kunci
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

// Function angka menjadi format rupiah
export function formatRupiah(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Function Mengubah format nama
export function createSlug(text: string): string {
  return normalizeText(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Function mengambil kategori makanan
import { categories, foods, prices, times, warungs } from "@/data/foods";
import type { Food, Warung } from "@/data/foods";

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