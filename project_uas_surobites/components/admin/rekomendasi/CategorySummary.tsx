import { categories, foods } from "@/data/foods";

export default function CategorySummary() {
  return (
    <div className="category-summary">
      {categories.map((category) => {
        const total = foods.filter((food) => food.categories.includes(category.id)).length;

        return (
          <div className="summary-chip" key={category.id}>
            <span className="summary-chip__icon">{category.icon}</span>
            <div>
              <strong>{total}</strong>
              <small>{category.label}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}
