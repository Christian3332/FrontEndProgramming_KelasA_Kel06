import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user-auth";
import { getRatingSummaries } from "@/lib/ratings";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  return Response.json(await getRatingSummaries(user?.id ?? null));
}

export async function POST(request: Request) {
  // proxy gak ngecek /api, jadi login tetap dicek di sini
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "Login dulu untuk memberi rating." }, { status: 401 });
  }

  const data = await request.json().catch(() => null);
  const warungSlug = typeof data?.warungId === "string" ? data.warungId : "";
  const score = data?.score;

  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return Response.json({ message: "Rating harus 1 sampai 5 bintang." }, { status: 400 });
  }

  const warung = await prisma.warung.findUnique({ where: { slug: warungSlug }, select: { id: true } });
  if (!warung) {
    return Response.json({ message: "Warung tidak ditemukan." }, { status: 404 });
  }

  // kalau user udah pernah rating warung ini, nilainya diganti aja
  await prisma.rating.upsert({
    where: { userId_warungId: { userId: user.id, warungId: warung.id } },
    create: { userId: user.id, warungId: warung.id, score },
    update: { score },
  });

  const summaries = await getRatingSummaries(user.id);
  return Response.json(summaries[warungSlug]);
}
