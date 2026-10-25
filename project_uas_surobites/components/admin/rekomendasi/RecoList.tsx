import Image from "next/image";
import { categories, foods } from "@/data/foods";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function RecoList() {
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

      <div className="d-flex flex-column">
        {foods.length === 0 && <p className={ui.panelEmpty}>Belum ada data makanan.</p>}

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
                  <input type="checkbox" defaultChecked={food.categories.includes(category.id)} />
                  <span>
                    {category.icon} {category.label}
                  </span>
                </label>
              ))}
              <label className={`${styles.checkChip} ${styles.checkStar}`}>
                <input type="checkbox" defaultChecked={food.featured} />
                <span>★ Pilihan</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className={`d-flex flex-wrap align-items-center justify-content-end ${ui.panelFooter}`}>
        <button type="button" className={`btn ${ui.btn} ${ui.btnGhost}`}>
          Batalkan
        </button>
        <button type="button" className={`btn btn-primary ${ui.btn} ${ui.btnPrimary}`}>
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
