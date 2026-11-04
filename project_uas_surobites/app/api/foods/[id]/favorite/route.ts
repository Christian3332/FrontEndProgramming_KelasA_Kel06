import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

// body: { action: "add" | "remove" }
export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  const { action } = await request.json().catch(() => ({}));

  if (action !== "add" && action !== "remove") {
    return Response.json({ message: "Action harus add atau remove." }, { status: 400 });
  }

  // pakai updateMany biar bisa kasih syarat > 0, jadi jumlahnya ga bakal minus
  const result = await prisma.food.updateMany({
    where: action === "add" ? { slug: id } : { slug: id, favoriteCount: { gt: 0 } },
    data: { favoriteCount: action === "add" ? { increment: 1 } : { decrement: 1 } },
  });

  if (result.count === 0 && action === "add") {
    return Response.json({ message: "Makanan tidak ditemukan." }, { status: 404 });
  }

  return Response.json({ message: "Jumlah favorit diperbarui." });
}
