import { getWarungs } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/helper";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getWarungs());
}

export async function POST(request: Request) {
  const data = await request.json();
  const name = String(data.name ?? "").trim();
  const slug = createSlug(name);
  const foodIds = Array.isArray(data.foodIds) ? data.foodIds : [];
  const otherMenu = Array.isArray(data.otherMenu) ? data.otherMenu : [];

  if (!name || !slug || !String(data.address ?? "").trim()) {
    return Response.json({ message: "Isi nama dan alamat warung." }, { status: 400 });
  }

  try {
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
        menus: { create: otherMenu.map((menu: string) => ({ name: String(menu).trim() })).filter((menu: { name: string }) => menu.name) },
      },
    });

    return Response.json({ message: "Warung berhasil ditambahkan." }, { status: 201 });
  } catch {
    return Response.json({ message: "Warung gagal ditambahkan. Periksa nama dan menu yang dipilih." }, { status: 400 });
  }
}
