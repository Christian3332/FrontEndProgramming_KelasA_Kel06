import Link from "next/link";
import { categories, foods } from "@/data/foods";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function CategoryChart() {
  return (
    <article className={`h-100 ${ui.panel}`}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>Kuliner per kategori</h3>
          <p className={ui.panelSubtitle}>Jumlah makanan di tiap kategori rekomendasi</p>
        </div>
        <Link href="/admin/dashboard/rekomendasi" className={ui.panelLink}>
          Atur kategori →
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className={ui.panelEmpty}>Belum ada data kategori.</p>
      ) : (
        <ul className={`list-unstyled m-0 d-flex flex-column ${styles.barList}`}>
          {categories.map((category) => {
            const total = foods.filter((food) => food.categories.includes(category.id)).length;
            // dicek dulu biar tidak dibagi 0 waktu data makanan masih kosong
            const percent = foods.length > 0 ? Math.round((total / foods.length) * 100) : 0;

            return (
              <li
                className={`d-flex align-items-center ${styles.barRow}`}
                key={category.id}
                data-tooltip={`${total} dari ${foods.length} makanan (${percent}%)`}
              >
                <span className={styles.barLabel}>
                  {category.icon} {category.label}
                </span>
                <span className={styles.barTrack}>
                  <span
                    className={`w-100 ${styles.barFill}`}
                    style={{ transform: `scaleX(${percent / 100})` }}
                  ></span>
                </span>
                <span className={styles.barValue}>{total}</span>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
