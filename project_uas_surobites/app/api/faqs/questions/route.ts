import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user-auth";

// user kirim pertanyaan baru, disimpan sebagai pending sampai dijawab admin
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "Login dulu untuk mengirim pertanyaan." }, { status: 401 });
  }

  const data = await request.json().catch(() => null);
  const question = typeof data?.question === "string" ? data.question.trim() : "";

  if (question.length < 10) {
    return Response.json({ message: "Pertanyaan minimal 10 karakter." }, { status: 400 });
  }
  if (question.length > 300) {
    return Response.json({ message: "Pertanyaan maksimal 300 karakter." }, { status: 400 });
  }

  await prisma.faq.create({ data: { question, status: "pending" } });

  return Response.json(
    { message: "Pertanyaan terkirim! Admin akan menjawabnya secepatnya." },
    { status: 201 },
  );
}
