import { getCurrentUser } from "@/lib/user-auth";

export const dynamic = "force-dynamic";

// dipakai navbar buat tau user siapa yang lagi login
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "Belum login." }, { status: 401 });
  }
  return Response.json(user);
}
