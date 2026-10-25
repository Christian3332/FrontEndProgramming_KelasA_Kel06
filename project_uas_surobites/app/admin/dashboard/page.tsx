import WelcomeCard from "@/components/admin/dashboard/WelcomeCard";
import StatCards from "@/components/admin/dashboard/StatCards";
import CategoryChart from "@/components/admin/dashboard/CategoryChart";
import ActivityPanel from "@/components/admin/dashboard/ActivityPanel";
import FavoritePanel from "@/components/admin/dashboard/FavoritePanel";
import ui from "@/app/styles/admin-ui.module.css";

export default function AdminDashboardPage() {
  return (
    <section className={ui.section} aria-labelledby="sec-dashboard">
      <h2 id="sec-dashboard" className="visually-hidden">
        Ringkasan dashboard
      </h2>

      <WelcomeCard />
      <StatCards />

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <CategoryChart />
        </div>
        <div className="col-12 col-xl-5">
          <ActivityPanel />
        </div>
        <div className="col-12">
          <FavoritePanel />
        </div>
      </div>
    </section>
  );
}
