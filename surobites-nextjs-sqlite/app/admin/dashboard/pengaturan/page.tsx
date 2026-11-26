import type { Metadata } from "next";
import SectionHead from "@/components/admin/SectionHead";
import AkunForm from "@/components/admin/pengaturan/AkunForm";
import { getAdminUsername } from "@/lib/admin-auth";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export const metadata: Metadata = {
  title: "Pengaturan",
};

export default async function PengaturanPage() {
  // layout udah ngecek login, jadi di sini harusnya selalu ada isinya
  const username = (await getAdminUsername()) ?? "";

  return (
    <section className={ui.section} aria-labelledby="sec-pengaturan">
      <SectionHead
        id="sec-pengaturan"
        title="Pengaturan"
        description="Ubah password akun admin."
      />

      <div className={styles.settings}>
        <AkunForm username={username} />
      </div>
    </section>
  );
}
