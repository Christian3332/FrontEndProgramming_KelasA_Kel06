"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import SectionHead from "@/components/admin/SectionHead";
import WarungTable from "@/components/admin/warung/WarungTable";
import ui from "@/app/styles/admin-ui.module.css";

export default function WarungAdmin({ initialAdd = false }: { initialAdd?: boolean }) {
  const router = useRouter();
  const [addRequest, setAddRequest] = useState(initialAdd ? 1 : 0);

  useEffect(() => {
    if (initialAdd) router.replace("/admin/dashboard/warung", { scroll: false });
  }, [initialAdd, router]);

  return (
    <section className={ui.section} aria-labelledby="sec-warung">
      <SectionHead
        id="sec-warung"
        title="Kelola Warung"
        description="Data warung ini tampil di carousel Beranda dan halaman Lokasi Warung."
      >
        <Button variant="primary" className={`${ui.btn} ${ui.btnPrimary}`} onClick={() => setAddRequest(addRequest + 1)}>
          + Tambah Warung
        </Button>
      </SectionHead>

      <WarungTable addRequest={addRequest} />
    </section>
  );
}
