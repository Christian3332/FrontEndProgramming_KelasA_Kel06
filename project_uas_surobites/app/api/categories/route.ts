import { prisma } from "@/lib/prisma";
import { getCategories } from "@/lib/queries";
import { createSlug } from "@/lib/helper";
import { isAdminAuthenticated } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getCategories());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

  const body = await request.json();
  const label = String(body.label ?? "").trim();
  const id = createSlug(label);

  if (!label || !id) {
    return Response.json({ message: "Nama kategori wajib diisi." }, { status: 400 });
  }

  // id kategori diambil dari nama, jadi nama yang sama gak boleh dobel
  const exists = await prisma.category.findUnique({ where: { id } });
  if (exists) {
    return Response.json({ message: "Kategori dengan nama tersebut sudah ada." }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: {
      id,
      label,
      icon: String(body.icon ?? "").trim() || "🍽️",
      description: String(body.description ?? "").trim(),
    },
  });

  return Response.json(category, { status: 201 });
}
