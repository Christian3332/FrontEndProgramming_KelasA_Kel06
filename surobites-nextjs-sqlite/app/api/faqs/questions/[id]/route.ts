import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type Context = { params: Promise<{ id: string }> };

// admin jawab pertanyaan user -> langsung tampil di FAQ publik
// body: { answer: "...", question?: "..." } (question boleh dirapikan dulu sama admin)
export async function PATCH(request: Request, { params }: Context) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }

  const id = Number((await params).id);
  const body = await request.json().catch(() => null);
  const answer = String(body?.answer ?? "").trim();
  const question = body?.question === undefined ? undefined : String(body.question).trim();

  if (!answer || question === "") {
    return Response.json({ message: "Pertanyaan dan jawaban wajib diisi." }, { status: 400 });
  }

  const faq = Number.isInteger(id)
    ? await prisma.faq.findFirst({ where: { id, status: "pending" } })
    : null;
  if (!faq) {
    return Response.json({ message: "Pertanyaan tidak ditemukan." }, { status: 404 });
  }

  // taruh di urutan paling bawah FAQ publik
  const last = await prisma.faq.findFirst({
    where: { status: "published" },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  await prisma.faq.update({
    where: { id },
    data: {
      answer,
      ...(question && { question }),
      status: "published",
      position: (last?.position ?? -1) + 1,
    },
  });

  return Response.json({ message: "Pertanyaan dijawab dan ditampilkan di FAQ." });
}
