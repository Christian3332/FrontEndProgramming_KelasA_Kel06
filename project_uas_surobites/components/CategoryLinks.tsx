import Link from "next/link";
import { categories, foods } from "@/data/foods";

export default function CategoryLinks() {
  return (
    <section
      id="kategori"
      className="kategori-section"
      aria-labelledby="kategori-title"
    >
      <h2 id="kategori-title" className="section-title">
        Mau Makan Apa Hari Ini?
      </h2>
      <p className="section-subtitle">
        Pilih sesuai selera, nanti SuroBites carikan kuliner Surabaya yang
        paling cocok untukmu.
      </p>
      <div className="kategori-grid">
        {categories.map((c) => {
          const total = foods.filter((f) => f.categories.includes(c.id)).length;
          return (
            <Link
              href={`/rekomendasi?kategori=${c.id}`}
              className="kategori-card"
              key={c.id}
            >
              <span className="kategori-card__icon" aria-hidden="true">
                {c.icon}
              </span>
              <span className="kategori-card__label">{c.label}</span>
              <span className="kategori-card__desc">{c.description}</span>
              <span className="kategori-card__count">{total} kuliner</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}