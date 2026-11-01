import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/helper";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  const data = await request.json();
  const name = String(data.name ?? "").trim();
  const slug = createSlug(name);
  const foodIds = Array.isArray(data.foodIds) ? data.foodIds : [];
  const otherMenu = Array.isArray(data.otherMenu) ? data.otherMenu : [];

  if (!name || !slug || !String(data.address ?? "").trim()) {
    return Response.json({ message: "Isi nama dan alamat warung." }, { status: 400 });
  }

  try {
    const warung = await prisma.warung.findUnique({ where: { slug: id } });
    if (!warung) {
      return Response.json({ message: "Warung tidak ditemukan." }, { status: 404 });
    }

    const slugDipakai = await prisma.warung.findUnique({ where: { slug } });
    if (slugDipakai && slugDipakai.id !== warung.id) {
      return Response.json({ message: "Nama warung tersebut sudah digunakan." }, { status: 400 });
    }

    await prisma.warung.update({
      where: { slug: id },
      data: {
        slug,
        name,
        address: String(data.address).trim(),
        openDays: String(data.openDays ?? ""),
        openTime: String(data.openTime ?? ""),
        closeTime: String(data.closeTime ?? ""),
        description: String(data.description ?? ""),
        image: String(data.image || "/img/Warung.png"),
        mapsUrl: String(data.mapsUrl ?? ""),
        foods: { set: foodIds.map((foodId: string) => ({ slug: String(foodId) })) },
        menus: {
          deleteMany: {},
          create: otherMenu.map((menu: string) => ({ name: String(menu).trim() })).filter((menu: { name: string }) => menu.name),
        },
      },
    });

    return Response.json({ message: "Warung berhasil diperbarui." });
  } catch {
    return Response.json({ message: "Warung gagal diperbarui." }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;

  try {
    const warung = await prisma.warung.findUnique({ where: { slug: id } });
    if (!warung) {
      return Response.json({ message: "Warung tidak ditemukan." }, { status: 404 });
    }

    await prisma.warung.delete({ where: { slug: id } });
    return Response.json({ message: "Warung berhasil dihapus." });
  } catch {
    return Response.json({ message: "Warung gagal dihapus." }, { status: 400 });
  }
}
