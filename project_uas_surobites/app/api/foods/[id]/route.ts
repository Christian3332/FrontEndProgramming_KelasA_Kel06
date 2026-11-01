import { getFood } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/helper";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const food = await getFood(id);
  if (!food) {
    return Response.json({ message: "Makanan tidak ditemukan." }, { status: 404 });
  }
  return Response.json(food);
}

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  const data = await request.json();
  const name = String(data.name ?? "").trim();
  const slug = createSlug(name);
  const priceRange = String(data.priceRange ?? "").trim();
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const timeCategory = Array.isArray(data.timeCategory) ? data.timeCategory : [];
  const ingredients = Array.isArray(data.ingredients) ? data.ingredients : [];

  if (!name || !slug || !data.priceCategory || !priceRange) {
    return Response.json({ message: "Lengkapi nama, kategori harga, dan rentang harga makanan." }, { status: 400 });
  }

  try {
    const existingFood = await prisma.food.findUnique({ where: { slug } });
    if (existingFood && existingFood.slug !== id) {
      return Response.json({ message: "Nama makanan tersebut sudah digunakan." }, { status: 400 });
    }

    if (data.featured) {
      const featuredCount = await prisma.food.count({
        where: { featured: true, slug: { not: id } },
      });
      if (featuredCount >= 3) {
        return Response.json({ message: "Maksimal hanya 3 makanan yang bisa menjadi Pilihan." }, { status: 400 });
      }
    }

    await prisma.food.update({
      where: { slug: id },
      data: {
        slug,
        name,
        image: String(data.image || "/img/Rawon.jpg"),
        shortDescription: String(data.shortDescription ?? ""),
        story: String(data.story ?? ""),
        taste: String(data.taste ?? ""),
        priceRange,
        featured: Boolean(data.featured),
        priceCategoryId: String(data.priceCategory ?? ""),
        categories: { set: categories.map((categoryId: string) => ({ id: String(categoryId) })) },
        timeSlots: { set: timeCategory.map((timeId: string) => ({ id: String(timeId) })) },
        ingredients: {
          deleteMany: {},
          create: ingredients.map((ingredient: string) => ({ name: String(ingredient).trim() })).filter((ingredient: { name: string }) => ingredient.name),
        },
      },
    });

    return Response.json({ message: "Makanan berhasil diperbarui." });
  } catch {
    return Response.json({ message: "Data makanan gagal diperbarui." }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;

  try {
    await prisma.food.delete({ where: { slug: id } });
    return Response.json({ message: "Makanan berhasil dihapus." });
  } catch {
    return Response.json({ message: "Makanan gagal dihapus." }, { status: 400 });
  }
}
