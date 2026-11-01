import type { Metadata } from "next";
import { connection } from "next/server";
import FaqAdmin from "@/components/admin/faq/FaqAdmin";
import { getFaqs } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Kelola FAQ",
};

export default async function KelolaFaqPage() {
  await connection();
  const faqs = await getFaqs();

  return <FaqAdmin initialFaqs={faqs} />;
}
