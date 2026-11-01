import { getFoods } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/helper";
import { isAdminAuthenticated } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getFoods());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

  const data = await request.json();
  const name = String(data.name ?? "").trim();
  const slug = createSlug(name);

  if (!name || !slug || !data.priceCategory || !data.priceRange) {
    return Response.json({ message: "Lengkapi nama dan kategori harga makanan." }, { status: 400 });
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
