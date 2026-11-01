import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  const id = Number((await params).id);
  const body = await request.json();

  if (!Number.isInteger(id) || id < 1) {
    return Response.json({ message: "FAQ tidak ditemukan." }, { status: 404 });
  }

  if (body.direction === "up" || body.direction === "down") {
    const faqs = await prisma.faq.findMany({
      orderBy: [{ position: "asc" }, { id: "asc" }],
    });
    const index = faqs.findIndex((faq) => faq.id === id);
    const nextIndex = body.direction === "up" ? index - 1 : index + 1;

    if (index < 0) {
      return Response.json({ message: "FAQ tidak ditemukan." }, { status: 404 });
    }

    if (nextIndex < 0 || nextIndex >= faqs.length) {
      return Response.json({ message: "FAQ sudah berada di posisi tersebut." }, { status: 400 });
    }

    const currentFaq = faqs[index];
    const nextFaq = faqs[nextIndex];
    await prisma.$transaction([
      prisma.faq.update({ where: { id: currentFaq.id }, data: { position: nextFaq.position } }),
      prisma.faq.update({ where: { id: nextFaq.id }, data: { position: currentFaq.position } }),
    ]);
    return Response.json({ message: "Urutan FAQ berhasil diubah." });
  }

  const question = body.question === undefined ? undefined : String(body.question).trim();
  const answer = body.answer === undefined ? undefined : String(body.answer).trim();

  if ((question !== undefined && !question) || (answer !== undefined && !answer) || (question === undefined && answer === undefined)) {
    return Response.json({ message: "Pertanyaan dan jawaban tidak boleh kosong." }, { status: 400 });
  }

  try {
    const faq = await prisma.faq.update({
      where: { id },
      data: {
        ...(question !== undefined && { question }),
        ...(answer !== undefined && { answer }),
      },
    });
    return Response.json(faq);
  } catch {
    return Response.json({ message: "FAQ tidak ditemukan." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const id = Number((await params).id);
  try {
    await prisma.faq.delete({ where: { id } });
    return Response.json({ message: "FAQ dihapus." });
  } catch {
    return Response.json({ message: "FAQ tidak ditemukan." }, { status: 404 });
  }
}
