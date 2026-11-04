import { getWarungs } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/helper";
import { isAdminAuthenticated } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getWarungs());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

  const data = await request.json();
  const name = String(data.name ?? "").trim();
  const slug = createSlug(name);
  const foodIds = Array.isArray(data.foodIds) ? data.foodIds : [];

  if (!name || !slug || !String(data.address ?? "").trim() || !String(data.openDays ?? "").trim() || !data.openTime || !data.closeTime) {
    return Response.json({ message: "Isi nama, alamat, hari buka, dan jam operasional warung." }, { status: 400 });
  }

  try {
    const existingWarung = await prisma.warung.findUnique({ where: { slug } });
    if (existingWarung) {
      return Response.json({ message: "Nama warung tersebut sudah digunakan." }, { status: 409 });
    }

    await prisma.warung.create({
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
        foods: { connect: foodIds.map((id: string) => ({ slug: String(id) })) },
      },
    });

    return Response.json({ message: "Warung berhasil ditambahkan." }, { status: 201 });
  } catch {
    return Response.json({ message: "Warung gagal ditambahkan. Periksa nama dan menu yang dipilih." }, { status: 400 });
  }
}
