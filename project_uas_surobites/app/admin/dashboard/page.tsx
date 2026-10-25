import WelcomeCard from "@/components/admin/dashboard/WelcomeCard";
import StatCards from "@/components/admin/dashboard/StatCards";
import CategoryChart from "@/components/admin/dashboard/CategoryChart";
import ActivityPanel from "@/components/admin/dashboard/ActivityPanel";
import FavoritePanel from "@/components/admin/dashboard/FavoritePanel";

export default function AdminDashboardPage() {
  return (
    <section className="admin-section" aria-labelledby="sec-dashboard">
      <h2 id="sec-dashboard" className="visually-hidden">
        Ringkasan dashboard
      </h2>

      <WelcomeCard />
      <StatCards />

      <div className="dashboard-grid">
        <CategoryChart />
        <ActivityPanel />
        <FavoritePanel />
      </div>
    </section>
  );
}
