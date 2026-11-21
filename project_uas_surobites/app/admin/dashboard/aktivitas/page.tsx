import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import SectionHead from "@/components/admin/SectionHead";
import ActivityStatCards from "@/components/admin/aktivitas/ActivityStatCards";
import ActivityLog from "@/components/admin/aktivitas/ActivityLog";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getActivityStats, getUserActivities } from "@/lib/admin-activity";
import ui from "@/app/styles/admin-ui.module.css";

export const metadata: Metadata = {
  title: "Log Aktivitas",
};

export default async function LogAktivitasPage() {
  await connection();
  // isinya data user (nama + email), jadi dicek lagi di sini selain di layout
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login?pesan=login");
  }

  const [activities, stats] = await Promise.all([getUserActivities(), getActivityStats()]);

  return (
    <section className={ui.section} aria-labelledby="sec-aktivitas">
      <SectionHead
        id="sec-aktivitas"
        title="Log Aktivitas User"
        description="Pantau aktivitas pengunjung yang punya akun: daftar akun, menyukai makanan, dan memberi rating warung. Data dimuat ulang otomatis tiap 30 detik."
      />

      <ActivityStatCards stats={stats} />
      <ActivityLog activities={activities} updatedAt={new Date().toISOString()} />
    </section>
  );
}
