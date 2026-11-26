import type { Metadata } from "next";
import { Button } from "react-bootstrap";
import SectionHead from "@/components/admin/SectionHead";
import WarungTable from "@/components/admin/warung/WarungTable";
import ui from "@/app/styles/admin-ui.module.css";

export const metadata: Metadata = {
  title: "Kelola Warung",
};

export default function KelolaWarungPage() {
  return (
    <section className={ui.section} aria-labelledby="sec-warung">
      <SectionHead
        id="sec-warung"
        title="Kelola Warung"
        description="Data warung ini tampil di carousel Beranda dan halaman Lokasi Warung."
      >
        <Button variant="primary" className={`${ui.btn} ${ui.btnPrimary}`}>
          + Tambah Warung
        </Button>
      </SectionHead>

      <WarungTable />
    </section>
  );
}
