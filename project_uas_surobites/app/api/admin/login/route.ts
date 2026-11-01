import { authenticateAdmin, createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown };

  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Data login tidak valid.");
    }
    body = parsed as { username?: unknown; password?: unknown };
  } catch {
    return Response.json({ message: "Data login tidak valid." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password || username.length > 100 || password.length > 1024) {
    return Response.json({ message: "Username atau password tidak valid." }, { status: 400 });
  }

  try {
    const adminId = await authenticateAdmin(username, password);

    if (!adminId) {
      return Response.json({ message: "Username atau password salah." }, { status: 401 });
    }

    await createAdminSession(adminId);
    return Response.json({ message: "Login berhasil." });
  } catch {
    return Response.json({ message: "Login belum dapat diproses. Periksa konfigurasi server." }, { status: 500 });
  }
}
