import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user-auth";

export const dynamic = "force-dynamic";

// daftar slug makanan yang udah di-love user ini (kosong kalau belum login)
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ liked: [] });

  const likes = await prisma.foodLike.findMany({
    where: { userId: user.id },
    select: { food: { select: { slug: true } } },
  });

  return Response.json({ liked: likes.map((like) => like.food.slug) });
}

// body: { foodId: "slug-makanan" }, kalau udah di-love jadi batal, kalau belum jadi love
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "Login dulu untuk menyukai makanan." }, { status: 401 });
  }

  const data = await request.json().catch(() => null);
  const slug = typeof data?.foodId === "string" ? data.foodId : "";

  const food = await prisma.food.findUnique({ where: { slug }, select: { id: true } });
  if (!food) {
    return Response.json({ message: "Makanan tidak ditemukan." }, { status: 404 });
  }

  const where = { userId_foodId: { userId: user.id, foodId: food.id } };
  const existing = await prisma.foodLike.findUnique({ where });

  if (existing) {
    await prisma.foodLike.delete({ where });
  } else {
    await prisma.foodLike.create({ data: { userId: user.id, foodId: food.id } });
  }

  const count = await prisma.foodLike.count({ where: { foodId: food.id } });
  return Response.json({ liked: !existing, count });
}
