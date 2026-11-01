import { Col, Row } from "react-bootstrap";
import { categories } from "@/data/foods";
import { getFoods } from "@/lib/queries";
import styles from "@/app/styles/admin-dashboard.module.css";

export default async function CategorySummary() {
  const foods = await getFoods();

  return (
    <Row xs={2} md={3} xl={6} className={`g-2 ${styles.summaryGrid}`}>
      {categories.map((category) => {
        const total = foods.filter((food) => food.categories.includes(category.id)).length;

        return (
          <Col key={category.id}>
            <div className={`d-flex align-items-center h-100 ${styles.summaryChip}`}>
              <span className={`d-flex align-items-center justify-content-center ${styles.summaryIcon}`}>{category.icon}</span>
              <div>
                <strong className={styles.summaryValue}>{total}</strong>
                <small className={styles.summaryLabel}>{category.label}</small>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
