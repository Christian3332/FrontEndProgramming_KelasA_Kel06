import Link from "next/link";
import { categories, foods } from "@/data/foods";

export default function CategoryChart() {
  return (
    <article className="panel">
      <div className="panel__header">
        <div>
          <h3 className="panel__title">Kuliner per kategori</h3>
          <p className="panel__subtitle">Jumlah makanan di tiap kategori rekomendasi</p>
        </div>
        <Link href="/admin/dashboard/rekomendasi" className="panel__link">
          Atur kategori →
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className="panel-empty">Belum ada data kategori.</p>
      ) : (
        <ul className="bar-list">
          {categories.map((category) => {
            const total = foods.filter((food) => food.categories.includes(category.id)).length;
            // dicek dulu biar tidak dibagi 0 waktu data makanan masih kosong
            const percent = foods.length > 0 ? Math.round((total / foods.length) * 100) : 0;

            return (
              <li
                className="bar-row"
                key={category.id}
                data-tooltip={`${total} dari ${foods.length} makanan (${percent}%)`}
              >
                <span className="bar-row__label">
                  {category.icon} {category.label}
                </span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: `${percent}%` }}></span>
                </span>
                <span className="bar-row__value">{total}</span>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
