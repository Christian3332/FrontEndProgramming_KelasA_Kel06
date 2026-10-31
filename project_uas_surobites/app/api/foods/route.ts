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

  if (!name || !slug || !data.priceCategory || !data.priceRange) {
    return Response.json({ message: "Lengkapi nama dan kategori harga makanan." }, { status: 400 });
  }

  try {
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
        categories: { connect: (data.categories ?? []).map((id: string) => ({ id })) },
        timeSlots: { connect: (data.timeCategory ?? []).map((id: string) => ({ id })) },
        ingredients: { create: (data.ingredients ?? []).map((name: string) => ({ name })) },
      },
    });

    return Response.json({ message: "Makanan berhasil ditambahkan." }, { status: 201 });
  } catch {
    return Response.json({ message: "Makanan dengan nama tersebut sudah ada." }, { status: 400 });
  }
}
