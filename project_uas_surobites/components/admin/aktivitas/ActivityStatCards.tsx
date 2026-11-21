import { Col, Row } from "react-bootstrap";
import type { ActivityStats } from "@/lib/admin-activity";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function ActivityStatCards({ stats }: { stats: ActivityStats }) {
  const cards = [
    {
      label: "Total user",
      value: stats.totalUser,
      icon: "fa-solid fa-users",
      iconClass: "",
      hint: "Akun pengunjung terdaftar",
    },
    {
      label: "Aktivitas hari ini",
      value: stats.todayCount,
      icon: "fa-solid fa-bolt",
      iconClass: styles.statIconOrange,
      hint: "Sejak jam 00.00 WIB",
    },
    {
      label: "User aktif",
      value: stats.activeWeek,
      icon: "fa-solid fa-user-check",
      iconClass: "",
      hint: "Dalam 7 hari terakhir",
    },
    {
      label: "Love & rating",
      value: stats.totalInteraction,
      icon: "fa-solid fa-heart",
      iconClass: styles.statIconRed,
      hint: "Total semua interaksi",
    },
  ];

  return (
    <Row xs={2} xl={4} className={`g-3 ${styles.statGrid}`}>
      {cards.map((card) => (
        <Col key={card.label}>
          <div className={`d-flex flex-column h-100 ${styles.statCard}`}>
            <span className={`d-flex align-items-center justify-content-between ${styles.statTop}`}>
              <span className={styles.statLabel}>{card.label}</span>
              <span className={`d-flex align-items-center justify-content-center ${styles.statIcon} ${card.iconClass}`}>
                <i className={card.icon}></i>
              </span>
            </span>
            <strong className={styles.statValue}>{card.value}</strong>
            <span className={styles.statHint}>{card.hint}</span>
          </div>
        </Col>
      ))}
    </Row>
  );
}
