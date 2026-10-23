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
export type Category = {
  id: string;
  label: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  { id: "nasi", label: "Nasi", icon: "🍚" },
  { id: "mie", label: "Mie", icon: "🍜" },
  { id: "pedas", label: "Pedas", icon: "🌶️" },
  { id: "minuman", label: "Minuman", icon: "🥤" },
];

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}