import { getFood } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

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

  try {
    await prisma.food.update({
      where: { slug: id },
      data: {
        name: String(data.name ?? "").trim(),
        image: String(data.image || "/img/Rawon.jpg"),
        shortDescription: String(data.shortDescription ?? ""),
        story: String(data.story ?? ""),
        taste: String(data.taste ?? ""),
        priceRange: String(data.priceRange ?? ""),
        featured: Boolean(data.featured),
        priceCategoryId: String(data.priceCategory ?? ""),
        categories: { set: (data.categories ?? []).map((categoryId: string) => ({ id: categoryId })) },
        timeSlots: { set: (data.timeCategory ?? []).map((timeId: string) => ({ id: timeId })) },
        ingredients: {
          deleteMany: {},
          create: (data.ingredients ?? []).map((name: string) => ({ name })),
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
