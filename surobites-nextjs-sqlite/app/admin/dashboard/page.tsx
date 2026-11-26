import { connection } from "next/server";
import { Col, Row } from "react-bootstrap";
import WelcomeCard from "@/components/admin/dashboard/WelcomeCard";
import StatCards from "@/components/admin/dashboard/StatCards";
import CategoryChart from "@/components/admin/dashboard/CategoryChart";
import ActivityPanel from "@/components/admin/dashboard/ActivityPanel";
import FavoritePanel from "@/components/admin/dashboard/FavoritePanel";
import { getCategories, getFaqs, getFoods, getWarungs } from "@/lib/queries";
import ui from "@/app/styles/admin-ui.module.css";

export default async function AdminDashboardPage() {
  // ambil langsung dari database biar angka di dashboard selalu yang terbaru
  await connection();
  const [foods, warungs, faqs, categories] = await Promise.all([
    getFoods(),
    getWarungs(),
    getFaqs(),
    getCategories(),
  ]);

  return (
    <section className={ui.section} aria-labelledby="sec-dashboard">
      <h2 id="sec-dashboard" className="visually-hidden">
        Ringkasan dashboard
      </h2>

      <WelcomeCard />
      <StatCards foods={foods} totalWarung={warungs.length} totalFaq={faqs.length} />

      <Row className="g-3">
        <Col xs={12} xl={7}>
          <CategoryChart foods={foods} categories={categories} />
        </Col>
        <Col xs={12} xl={5}>
          <ActivityPanel />
        </Col>
        <Col xs={12}>
          <FavoritePanel foods={foods} />
        </Col>
      </Row>
    </section>
  );
}
