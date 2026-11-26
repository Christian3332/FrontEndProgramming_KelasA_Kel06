import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/helper";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Context) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();
  const name = String(data.name ?? "").trim();
  const slug = createSlug(name);
  const foodIds = Array.isArray(data.foodIds) ? data.foodIds : [];

  if (!name || !slug || !String(data.address ?? "").trim() || !String(data.openDays ?? "").trim() || !data.openTime || !data.closeTime) {
    return Response.json({ message: "Isi nama, alamat, hari buka, dan jam operasional warung." }, { status: 400 });
  }

  try {
    const warung = await prisma.warung.findUnique({ where: { slug: id } });
    if (!warung) {
      return Response.json({ message: "Warung tidak ditemukan." }, { status: 404 });
    }

    const slugDipakai = await prisma.warung.findUnique({ where: { slug } });
    if (slugDipakai && slugDipakai.id !== warung.id) {
      return Response.json({ message: "Nama warung tersebut sudah digunakan." }, { status: 409 });
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
      },
    });

    return Response.json({ message: "Warung berhasil diperbarui." });
  } catch {
    return Response.json({ message: "Warung gagal diperbarui." }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

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
