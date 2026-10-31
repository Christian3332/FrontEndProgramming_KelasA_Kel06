import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { Category, Food, Price, TimeSlot, Warung } from "@/data/foods";
import type { Faq } from "@/data/faqs";

const foodInclude = {
  categories: { select: { id: true } },
  timeSlots: { select: { id: true } },
  ingredients: { orderBy: { id: "asc" } },
} satisfies Prisma.FoodInclude;

const warungInclude = {
  foods: { select: { slug: true }, orderBy: { id: "asc" } },
  menus: { orderBy: { id: "asc" } },
} satisfies Prisma.WarungInclude;

type FoodRow = Prisma.FoodGetPayload<{ include: typeof foodInclude }>;
type WarungRow = Prisma.WarungGetPayload<{ include: typeof warungInclude }>;

async function getOrder() {
  const [cats, slots] = await Promise.all([
    prisma.category.findMany({ select: { id: true } }),
    prisma.timeSlot.findMany({ select: { id: true } }),
  ]);
  return { cats: cats.map((c) => c.id), slots: slots.map((s) => s.id) };
}

const sortBy = (ids: string[], order: string[]) =>
  [...ids].sort((a, b) => order.indexOf(a) - order.indexOf(b));

function toFood(r: FoodRow, order: { cats: string[]; slots: string[] }): Food {
  return {
    id: r.slug,
    name: r.name,
    image: r.image,
    shortDescription: r.shortDescription,
    story: r.story,
    ingredients: r.ingredients.map((i) => i.name),
    taste: r.taste,
    categories: sortBy(r.categories.map((c) => c.id), order.cats),
    priceCategory: r.priceCategoryId,
    priceRange: r.priceRange,
    timeCategory: sortBy(r.timeSlots.map((t) => t.id), order.slots),
    featured: r.featured,
  };
}

function toWarung(r: WarungRow): Warung {
  return {
    id: r.slug,
    name: r.name,
    address: r.address,
    openDays: r.openDays,
    openTime: r.openTime,
    closeTime: r.closeTime,
    description: r.description,
    foodIds: r.foods.map((f) => f.slug),
    otherMenu: r.menus.map((m) => m.name),
    image: r.image,
    mapsUrl: r.mapsUrl,
  };
}

export async function getFoods(): Promise<Food[]> {
  const [rows, order] = await Promise.all([
    prisma.food.findMany({ include: foodInclude, orderBy: { id: "asc" } }),
    getOrder(),
  ]);
  return rows.map((r) => toFood(r, order));
}

export async function getFood(slug: string): Promise<Food | null> {
  const [row, order] = await Promise.all([
    prisma.food.findUnique({ where: { slug }, include: foodInclude }),
    getOrder(),
  ]);
  return row ? toFood(row, order) : null;
}

export async function getWarungs(): Promise<Warung[]> {
  const rows = await prisma.warung.findMany({
    include: warungInclude,
    orderBy: { id: "asc" },
  });
  return rows.map(toWarung);
}

export async function getFaqs(): Promise<Faq[]> {
  const rows = await prisma.faq.findMany({ orderBy: { id: "asc" } });
  return rows.map((r) => ({
    id: String(r.id),
    question: r.question,
    answer: r.answer,
  }));
}

export async function getCategories(): Promise<Category[]> {
  return prisma.category.findMany();
}

export async function getPrices(): Promise<Price[]> {
  return prisma.priceCategory.findMany();
}

export async function getTimes(): Promise<TimeSlot[]> {
  return prisma.timeSlot.findMany();
}