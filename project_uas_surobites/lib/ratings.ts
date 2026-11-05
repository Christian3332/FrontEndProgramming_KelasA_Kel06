import "server-only";
import { prisma } from "@/lib/prisma";

export type RatingSummary = {
  average: number; // rata-rata, 1 angka di belakang koma
  count: number; // jumlah user yang ngasih rating
  myScore: number | null; // rating dari user yang lagi login (null kalau belum pernah / belum login)
};

// ringkasan rating semua warung, key-nya slug warung
export async function getRatingSummaries(userId: number | null) {
  const [warungs, groups, mine] = await Promise.all([
    prisma.warung.findMany({ select: { id: true, slug: true } }),
    prisma.rating.groupBy({ by: ["warungId"], _avg: { score: true }, _count: { score: true } }),
    userId ? prisma.rating.findMany({ where: { userId }, select: { warungId: true, score: true } }) : [],
  ]);

  const result: Record<string, RatingSummary> = {};
  for (const warung of warungs) {
    const group = groups.find((g) => g.warungId === warung.id);
    result[warung.slug] = {
      average: Math.round((group?._avg.score ?? 0) * 10) / 10,
      count: group?._count.score ?? 0,
      myScore: mine.find((r) => r.warungId === warung.id)?.score ?? null,
    };
  }
  return result;
}
