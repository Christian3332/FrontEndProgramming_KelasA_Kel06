"use client";

import { categories, foods } from "@/data/foods";

type Props = { active: string | null; onChange: (id: string | null) => void };

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="row g-3" role="group" aria-label="Kategori rekomendasi">
      {categories.map((c) => {
        const total = foods.filter((f) => f.categories.includes(c.id)).length;
        const isActive = c.id === active;
        return (
          <div className="col-6 col-md-4 col-lg-2" key={c.id}>
            <button
              type="button"
              className={`btn w-100 h-100 ${isActive ? "btn-primary" : "btn-outline-primary"}`}
              aria-pressed={isActive}
              onClick={() => onChange(isActive ? null : c.id)}
            >
              <span className="d-block fs-3">{c.icon}</span>
              <strong className="d-block">{c.label}</strong>
              <small className="d-block">{c.description}</small>
              <small className="d-block">{total} kuliner</small>
            </button>
          </div>
        );
      })}
    </div>
  );
}
