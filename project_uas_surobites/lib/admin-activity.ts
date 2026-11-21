import "server-only";
import { prisma } from "@/lib/prisma";

export type ActivityType = "daftar" | "love" | "rating";

export type UserActivity = {
  id: string;
  type: ActivityType;
  action: string;
  target: string;
  time: string;
  userName: string;
  userEmail: string;
};

export type ActivityStats = {
  totalUser: number;
  todayCount: number;
  activeWeek: number;
  totalInteraction: number;
};

const LIMIT = 150;
const userSelect = { select: { name: true, email: true } };

// jam 00:00 hari ini versi WIB, biar gak ikut jam server
function startOfToday() {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
  return new Date(`${today}T00:00:00+07:00`);
}

// log disusun dari data yang udah ada: akun baru, love makanan, dan rating warung
export async function getUserActivities(): Promise<UserActivity[]> {
  const [users, likes, ratings] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: LIMIT,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    prisma.foodLike.findMany({
      orderBy: { createdAt: "desc" },
      take: LIMIT,
      select: { id: true, createdAt: true, user: userSelect, food: { select: { name: true } } },
    }),
    prisma.rating.findMany({
      orderBy: { updatedAt: "desc" },
      take: LIMIT,
      select: {
        id: true,
        score: true,
        createdAt: true,
        updatedAt: true,
        user: userSelect,
        warung: { select: { name: true } },
      },
    }),
  ]);

  const daftar: UserActivity[] = users.map((user) => ({
    id: `daftar-${user.id}`,
    type: "daftar",
    action: "Mendaftar akun baru",
    target: "",
    time: user.createdAt.toISOString(),
    userName: user.name,
    userEmail: user.email,
  }));

  const love: UserActivity[] = likes.map((like) => ({
    id: `love-${like.id}`,
    type: "love",
    action: "Menyukai makanan",
    target: like.food.name,
    time: like.createdAt.toISOString(),
    userName: like.user.name,
    userEmail: like.user.email,
  }));

  // rating yang diubah cuma kesimpen waktu ubah terakhirnya
  const rating: UserActivity[] = ratings.map((item) => {
    const diubah = item.updatedAt.getTime() - item.createdAt.getTime() > 1000;
    return {
      id: `rating-${item.id}`,
      type: "rating",
      action: diubah ? "Mengubah rating warung" : "Memberi rating warung",
      target: `${item.warung.name} (${item.score} bintang)`,
      time: item.updatedAt.toISOString(),
      userName: item.user.name,
      userEmail: item.user.email,
    };
  });

  return [...daftar, ...love, ...rating]
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, LIMIT);
}

export async function getActivityStats(): Promise<ActivityStats> {
  const today = startOfToday();
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [totalUser, newUsers, newLikes, newRatings, activeWeek, totalLikes, totalRatings] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: today } } }),
    prisma.foodLike.count({ where: { createdAt: { gte: today } } }),
    prisma.rating.count({ where: { updatedAt: { gte: today } } }),
    prisma.user.count({
      where: {
        OR: [
          { createdAt: { gte: lastWeek } },
          { likes: { some: { createdAt: { gte: lastWeek } } } },
          { ratings: { some: { updatedAt: { gte: lastWeek } } } },
        ],
      },
    }),
    prisma.foodLike.count(),
    prisma.rating.count(),
  ]);

  return {
    totalUser,
    todayCount: newUsers + newLikes + newRatings,
    activeWeek,
    totalInteraction: totalLikes + totalRatings,
  };
}
