import { prisma } from "@/lib/prisma";
import { getFaqs } from "@/lib/queries";

export async function GET() {
  return Response.json(await getFaqs());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { question?: string; answer?: string };
  const question = body.question?.trim();
  const answer = body.answer?.trim();

  if (!question || !answer) {
    return Response.json(
      { message: "Pertanyaan dan jawaban wajib diisi." },
      { status: 400 },
    );
  }

  const faq = await prisma.faq.create({ data: { question, answer } });
  return Response.json(faq, { status: 201 });
}