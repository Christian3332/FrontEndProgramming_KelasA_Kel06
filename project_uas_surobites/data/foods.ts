export type Category = {
  id: string;
  label: string;
  icon: string;
  description: string;
};
export type Price = { id: string; label: string; hint: string };
export type TimeSlot = { id: string; label: string; icon: string };

export type Food = {
  id: string;
  name: string;
  image: string;
  shortDescription: string;
  story: string;
  ingredients: string[];
  taste: string;
  categories: string[];
  priceCategory: string;
  priceRange: string;
  timeCategory: string[];
  featured: boolean;
};

export type Warung = {
  id: string;
  name: string;
  address: string;
  openDays: string;
  openTime: string;
  closeTime: string;
  description: string;
  foodIds: string[];
  otherMenu: string[];
  image: string;
  mapsUrl: string;
};

export const categories: Category[] = [
  /* salin dari data.js */
];
export const prices: Price[] = [
  /* salin */
];
export const times: TimeSlot[] = [
  /* salin */
];
export const foods: Food[] = [
  /* salin */
];
export const warungs: Warung[] = [
  /* salin */
];
