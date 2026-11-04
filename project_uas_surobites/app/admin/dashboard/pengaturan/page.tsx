import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import AkunForm from "@/components/admin/pengaturan/AkunForm";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export const metadata: Metadata = {
  title: "Pengaturan",
};

export default function PengaturanPage() {
  return (
    <section className={ui.section} aria-labelledby="sec-pengaturan">
      <SectionHead
        id="sec-pengaturan"
        title="Pengaturan"
        description="Ubah password akun admin."
      />

      <div className={styles.settings}>
        <AkunForm />
      </div>
    </section>
  );
}
