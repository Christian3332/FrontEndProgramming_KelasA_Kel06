import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import type { Food } from "@/data/foods";
import styles from "@/app/styles/admin-dashboard.module.css";

type Props = {
  foods: Food[];
  totalWarung: number;
  totalFaq: number;
};

export default function StatCards({ foods, totalWarung, totalFaq }: Props) {
  // total klik favorit dari semua pengunjung, bukan cuma browser admin
  const totalFavorite = foods.reduce((sum, food) => sum + (food.favoriteCount ?? 0), 0);

  const stats = [
    {
      label: "Jumlah makanan",
      value: foods.length,
      icon: "fa-solid fa-bowl-food",
      iconClass: "",
      hint: "Tampil di Katalog & Rekomendasi",
      href: "/admin/dashboard/makanan",
    },
    {
      label: "Jumlah warung",
      value: totalWarung,
      icon: "fa-solid fa-location-dot",
      iconClass: styles.statIconOrange,
      hint: "Tampil di Lokasi Warung",
      href: "/admin/dashboard/warung",
    },
    {
      label: "Jumlah FAQ",
      value: totalFaq,
      icon: "fa-regular fa-comments",
      iconClass: "",
      hint: "Tampil di Beranda",
      href: "/admin/dashboard/faq",
    },
    {
      label: "Total favorit",
      value: totalFavorite,
      icon: "fa-solid fa-heart",
      iconClass: styles.statIconRed,
      hint: "Dari semua pengunjung",
      href: "/favorit",
    },
  ];

  return (
    <Row xs={2} xl={4} className={`g-3 ${styles.statGrid}`}>
      {stats.map((stat) => (
        <Col key={stat.label}>
          <Link href={stat.href} className={`d-flex flex-column h-100 ${styles.statCard}`}>
            <span className={`d-flex align-items-center justify-content-between ${styles.statTop}`}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={`d-flex align-items-center justify-content-center ${styles.statIcon} ${stat.iconClass}`}>
                <i className={stat.icon}></i>
              </span>
            </span>
            <strong className={styles.statValue}>{stat.value}</strong>
            <span className={styles.statHint}>{stat.hint}</span>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
