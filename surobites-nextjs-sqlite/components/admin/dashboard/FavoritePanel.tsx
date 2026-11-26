import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import type { Food } from "@/data/foods";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function FavoritePanel({ foods }: { foods: Food[] }) {
  // 6 makanan yang paling sering difavoritkan
  const favoriteFoods = foods
    .filter((food) => (food.favoriteCount ?? 0) > 0)
    .sort((a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0))
    .slice(0, 6);

  return (
    <article className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>Makanan favorit pengunjung</h3>
          <p className={ui.panelSubtitle}>Paling sering disimpan lewat ikon hati</p>
        </div>
        <Link href="/favorit" target="_blank" rel="noopener" className={ui.panelLink}>
          Lihat halaman favorit ↗
        </Link>
      </div>

      {favoriteFoods.length === 0 ? (
        <p className={ui.panelEmpty}>Belum ada makanan yang difavoritkan pengunjung.</p>
      ) : (
        <Row xs={2} sm={3} md={4} xl={6} className="g-3">
          {favoriteFoods.map((food) => (
            <Col key={food.id}>
              <div className={`h-100 ${styles.miniFood}`}>
                <Image
                  src={food.image}
                  alt={food.name}
                  width={200}
                  height={125}
                  className={`w-100 h-auto ${styles.miniImg}`}
                />
                <span className={`d-flex align-items-center ${styles.miniName}`}>
                  {food.name}
                  <small className="ms-auto">{food.favoriteCount}</small>
                </span>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </article>
  );
}
