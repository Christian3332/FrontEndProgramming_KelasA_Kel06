// Mengisi database dari data statis. Jalankan: npx prisma db seed
import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { categories, prices, times, foods, warungs } from "../data/foods";
import { faqs } from "../data/faqs";
import { admin } from "../data/admin";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  await prisma.ingredient.deleteMany();
  await prisma.warungMenu.deleteMany();
  await prisma.food.deleteMany();
  await prisma.warung.deleteMany();
  await prisma.category.deleteMany();
  await prisma.priceCategory.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.admin.deleteMany();

  await prisma.category.createMany({ data: categories });
  await prisma.priceCategory.createMany({ data: prices });
  await prisma.timeSlot.createMany({ data: times });

  for (const f of foods) {
    await prisma.food.create({
      data: {
        slug: f.id,
        name: f.name,
        image: f.image,
        shortDescription: f.shortDescription,
        story: f.story,
        taste: f.taste,
        priceRange: f.priceRange,
        featured: f.featured,
        priceCategoryId: f.priceCategory,
        categories: { connect: f.categories.map((id) => ({ id })) },
        timeSlots: { connect: f.timeCategory.map((id) => ({ id })) },
        ingredients: { create: f.ingredients.map((name) => ({ name })) },
      },
    });
  }

  for (const w of warungs) {
    await prisma.warung.create({
      data: {
        slug: w.id,
        name: w.name,
        address: w.address,
        openDays: w.openDays,
        openTime: w.openTime,
        closeTime: w.closeTime,
        description: w.description,
        image: w.image,
        mapsUrl: w.mapsUrl,
        foods: { connect: w.foodIds.map((slug) => ({ slug })) },
        menus: { create: w.otherMenu.map((name) => ({ name })) },
      },
    });
  }

  for (const q of faqs) {
    await prisma.faq.create({ data: { question: q.question, answer: q.answer } });
  }

  await prisma.admin.create({
    data: { username: admin.username, passwordHash: hashPassword(admin.password) },
  });

  console.log("Seeding selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());