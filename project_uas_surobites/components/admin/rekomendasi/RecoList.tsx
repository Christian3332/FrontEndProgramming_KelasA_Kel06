import Image from "next/image";
import { categories, foods } from "@/data/foods";

export default function RecoList() {
  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <h3 className="panel__title">Kategori per makanan</h3>
          <p className="panel__subtitle">
            Tombol ★ Pilihan menandai makanan untuk &quot;Rekomendasi Pilihan&quot; di
            Beranda (maksimal 3 pertama yang tampil)
          </p>
        </div>
      </div>

      <div className="reco-list">
        {foods.length === 0 && <p className="panel-empty">Belum ada data makanan.</p>}

        {foods.map((food) => (
          <div className="reco-row" key={food.id}>
            <div className="reco-row__food">
              <Image src={food.image} alt="" width={48} height={48} />
              <div>
                <strong>{food.name}</strong>
                <small>{food.categories.length} kategori</small>
              </div>
            </div>

            <div className="check-group">
              {categories.map((category) => (
                <label className="check-chip" key={category.id}>
                  <input type="checkbox" defaultChecked={food.categories.includes(category.id)} />
                  <span>
                    {category.icon} {category.label}
                  </span>
                </label>
              ))}
              <label className="check-chip check-chip--star">
                <input type="checkbox" defaultChecked={food.featured} />
                <span>★ Pilihan</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="panel__footer">
        <button type="button" className="ui-btn ui-btn--ghost">
          Batalkan
        </button>
        <button type="button" className="ui-btn ui-btn--primary">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
