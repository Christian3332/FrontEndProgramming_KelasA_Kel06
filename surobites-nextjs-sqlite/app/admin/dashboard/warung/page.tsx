import type { Metadata } from "next";
import WarungAdmin from "@/components/admin/warung/WarungAdmin";

export const metadata: Metadata = {
  title: "Kelola Warung",
};

export default async function KelolaWarungPage({
  searchParams,
}: {
  searchParams: Promise<{ aksi?: string }>;
}) {
  const { aksi } = await searchParams;
  return <WarungAdmin initialAdd={aksi === "tambah"} />;
}
