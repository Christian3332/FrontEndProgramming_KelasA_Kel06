import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import AkunForm from "@/components/admin/pengaturan/AkunForm";

export const metadata: Metadata = {
  title: "Pengaturan",
};

export default function PengaturanPage() {
  return (
    <section className="admin-section" aria-labelledby="sec-pengaturan">
      <SectionHead
        id="sec-pengaturan"
        title="Pengaturan"
        description="Atur username, nama tampilan, dan password akun admin demo."
      />

      <div className="settings-grid">
        <AkunForm />
      </div>
    </section>
  );
}
