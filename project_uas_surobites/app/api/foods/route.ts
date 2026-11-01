import { getFoods } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/helper";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getFoods());
}

export async function POST(request: Request) {
  const data = await request.json();
  const name = String(data.name ?? "").trim();
  const slug = createSlug(name);
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const timeCategory = Array.isArray(data.timeCategory) ? data.timeCategory : [];
  const ingredients = Array.isArray(data.ingredients) ? data.ingredients : [];

  if (!name || !slug || !data.priceCategory || !String(data.priceRange ?? "").trim()) {
    return Response.json({ message: "Lengkapi nama, kategori harga, dan rentang harga makanan." }, { status: 400 });
  }

  try {
    if (data.featured) {
      const featuredCount = await prisma.food.count({ where: { featured: true } });
      if (featuredCount >= 3) {
        return Response.json({ message: "Maksimal hanya 3 makanan yang bisa menjadi Pilihan." }, { status: 400 });
      }
    }

    await prisma.food.create({
      data: {
        slug,
        name,
        image: String(data.image || "/img/Rawon.jpg"),
        shortDescription: String(data.shortDescription ?? ""),
        story: String(data.story ?? ""),
        taste: String(data.taste ?? ""),
        priceRange: String(data.priceRange),
        featured: Boolean(data.featured),
        priceCategoryId: String(data.priceCategory),
        categories: { connect: categories.map((id: string) => ({ id: String(id) })) },
        timeSlots: { connect: timeCategory.map((id: string) => ({ id: String(id) })) },
        ingredients: { create: ingredients.map((name: string) => ({ name: String(name).trim() })).filter((ingredient: { name: string }) => ingredient.name) },
      },
    });

    return Response.json({ message: "Makanan berhasil ditambahkan." }, { status: 201 });
  } catch {
    return Response.json({ message: "Makanan dengan nama tersebut sudah ada." }, { status: 400 });
  }
}
