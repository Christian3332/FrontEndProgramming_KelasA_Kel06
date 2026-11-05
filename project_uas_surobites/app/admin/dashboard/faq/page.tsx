import type { Metadata } from "next";
import { connection } from "next/server";
import FaqAdmin from "@/components/admin/faq/FaqAdmin";
import { getFaqs, getPendingQuestions } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Kelola FAQ",
};

export default async function KelolaFaqPage() {
  await connection();
  const [faqs, questions] = await Promise.all([getFaqs(), getPendingQuestions()]);

  return <FaqAdmin initialFaqs={faqs} initialQuestions={questions} />;
}
