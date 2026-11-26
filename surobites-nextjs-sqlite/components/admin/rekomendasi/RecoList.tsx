"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Alert, Button } from "react-bootstrap";
import type { Category, Food } from "@/data/foods";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

type Props = {
  initialFoods: Food[];
  categories: Category[];
};

export default function RecoList({ initialFoods, categories }: Props) {
  const router = useRouter();
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  // salinan data asli, dipakai buat ngecek mana yang berubah pas disimpan
  const [originalFoods, setOriginalFoods] = useState<Food[]>(initialFoods);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadFoods() {
    const response = await fetch("/api/foods");
    if (!response.ok) return;
    const data: Food[] = await response.json();
    setFoods(data);
    setOriginalFoods(data);
  }

  function changeCategory(foodId: string, categoryId: string, checked: boolean) {
    setError("");
    setFoods((current) => current.map((food) => {
      if (food.id !== foodId) return food;
      const categories = checked
        ? [...food.categories, categoryId]
        : food.categories.filter((id) => id !== categoryId);
      return { ...food, categories };
    }));
  }

  function changeFeatured(foodId: string, checked: boolean) {
    if (checked && foods.filter((food) => food.featured).length >= 3) {
      setError("Maksimal hanya 3 makanan yang bisa menjadi Pilihan.");
      return;
    }

    setError("");
    setFoods((current) => current.map((food) =>
      food.id === foodId ? { ...food, featured: checked } : food,
    ));
  }

  async function saveChanges() {
    setSaving(true);
    setError("");

    const changedFoods = foods.filter((food) => {
      const original = originalFoods.find((item) => item.id === food.id);
      return original && (
        original.featured !== food.featured ||
        [...original.categories].sort().join(",") !== [...food.categories].sort().join(",")
      );
    }).sort((a, b) => Number(a.featured) - Number(b.featured));

    for (const food of changedFoods) {
      const response = await fetch(`/api/foods/${food.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(food),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message ?? "Perubahan gagal disimpan.");
        await loadFoods();
        setSaving(false);
        return;
      }
    }

    await loadFoods();
    router.refresh();
    setSaving(false);
  }

  function cancelChanges() {
    setFoods(originalFoods);
    setError("");
  }

  return (
    <div className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>Kategori per makanan</h3>
          <p className={ui.panelSubtitle}>
            Tombol ★ Pilihan menandai makanan untuk &quot;Rekomendasi Pilihan&quot; di
            Beranda (maksimal 3 pertama yang tampil)
          </p>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex flex-column">
        {foods.length === 0 &&<p className={ui.panelEmpty}>Belum ada data makanan.</p>}

        {foods.map((food) => (
          <div className={`d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between ${styles.recoRow}`} key={food.id}>
            <div className={`d-flex align-items-center ${styles.recoFood}`}>
              <Image src={food.image} alt="" width={48} height={48} className={styles.recoImg} />
              <div>
                <strong className={styles.recoName}>{food.name}</strong>
                <small className={styles.recoMeta}>{food.categories.length} kategori</small>
              </div>
            </div>

            <div className={`d-flex flex-wrap justify-content-lg-end ${styles.checkGroup}`}>
              {categories.map((category) => (
                <label className={styles.checkChip} key={category.id}>
                  <input
                    type="checkbox"
                    checked={food.categories.includes(category.id)}
                    onChange={(event) => changeCategory(food.id, category.id, event.target.checked)}
                  />
                  <span>
                    {category.icon} {category.label}
                  </span>
                </label>
              ))}
              <label className={`${styles.checkChip} ${styles.checkStar}`}>
                <input
                  type="checkbox"
                  checked={food.featured}
                  onChange={(event) => changeFeatured(food.id, event.target.checked)}
                />
                <span>★ Pilihan</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className={`d-flex flex-wrap align-items-center justify-content-end ${ui.panelFooter}`}>
        <Button variant="" className={`${ui.btn} ${ui.btnGhost}`} onClick={cancelChanges} disabled={saving}>
          Batalkan
        </Button>
        <Button variant="primary" className={`${ui.btn} ${ui.btnPrimary}`} onClick={saveChanges} disabled={saving}>
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
}
