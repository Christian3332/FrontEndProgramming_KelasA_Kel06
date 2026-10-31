import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  const id = Number((await params).id);
  const body = (await request.json()) as { question?: string; answer?: string };

  try {
    const faq = await prisma.faq.update({
      where: { id },
      data: {
        ...(body.question?.trim() && { question: body.question.trim() }),
        ...(body.answer?.trim() && { answer: body.answer.trim() }),
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