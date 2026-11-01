import { prisma } from "@/lib/prisma";
import { getFaqs } from "@/lib/queries";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getFaqs());
}

export async function POST(request: Request) {
  const body = await request.json();
  const question = String(body.question ?? "").trim();
  const answer = String(body.answer ?? "").trim();

  if (!question || !answer) {
    return Response.json(
      { message: "Pertanyaan dan jawaban wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const lastFaq = await prisma.faq.findFirst({
      orderBy: { position: "desc" },
      select: { position: true },
    });
    const faq = await prisma.faq.create({
      data: { question, answer, position: (lastFaq?.position ?? -1) + 1 },
    });
    return Response.json(faq, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "FAQ gagal ditambahkan." }, { status: 400 });
  }
}
