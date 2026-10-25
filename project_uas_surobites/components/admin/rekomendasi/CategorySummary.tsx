import { categories, foods } from "@/data/foods";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function CategorySummary() {
  return (
    <div className={`row row-cols-2 row-cols-md-3 row-cols-xl-6 g-2 ${styles.summaryGrid}`}>
      {categories.map((category) => {
        const total = foods.filter((food) => food.categories.includes(category.id)).length;

        return (
          <div className="col" key={category.id}>
            <div className={`d-flex align-items-center h-100 ${styles.summaryChip}`}>
              <span className={`d-flex align-items-center justify-content-center ${styles.summaryIcon}`}>{category.icon}</span>
              <div>
                <strong className={styles.summaryValue}>{total}</strong>
                <small className={styles.summaryLabel}>{category.label}</small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
