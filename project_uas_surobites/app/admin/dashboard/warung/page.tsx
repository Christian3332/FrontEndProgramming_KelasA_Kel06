import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import WarungTable from "@/components/admin/warung/WarungTable";

export const metadata: Metadata = {
  title: "Kelola Warung",
};

export default function KelolaWarungPage() {
  return (
    <section className="admin-section" aria-labelledby="sec-warung">
      <SectionHead
        id="sec-warung"
        title="Kelola Warung"
        description="Data warung ini tampil di carousel Beranda dan halaman Lokasi Warung."
      >
        <button type="button" className="ui-btn ui-btn--primary">
          + Tambah Warung
        </button>
      </SectionHead>

      <WarungTable />
    </section>
  );
}
