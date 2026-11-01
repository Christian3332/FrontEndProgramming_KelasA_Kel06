import type { Metadata } from "next";
import WarungAdmin from "@/components/admin/warung/WarungAdmin";

export const metadata: Metadata = {
  title: "Kelola Warung",
};

export default function KelolaWarungPage() {
  return <WarungAdmin />;
}
