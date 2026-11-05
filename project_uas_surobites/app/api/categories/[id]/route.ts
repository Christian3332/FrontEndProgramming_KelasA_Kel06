import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

  const { id } = await params;

  // relasi ke makanan ikut kelepas otomatis, makanannya sendiri gak kehapus
  try {
    await prisma.category.delete({ where: { id } });
    return Response.json({ message: "Kategori dihapus." });
  } catch {
    return Response.json({ message: "Kategori tidak ditemukan." }, { status: 404 });
  }
}
