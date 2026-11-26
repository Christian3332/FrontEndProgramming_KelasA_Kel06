"use client";

import { useState } from "react";
import Image from "next/image";
import { foods } from "@/data/foods";
import { getCategory, getPrice, getTime } from "@/lib/helper";
import AdminSearch from "@/components/admin/AdminSearch";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function FoodTable() {
  const [keyword, setKeyword] = useState("");

  const list = foods.filter((food) =>
    food.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
  const emptyText = foods.length === 0 ? "Belum ada data makanan." : "Makanan tidak ditemukan.";

  return (
    <div className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-center justify-content-between ${styles.toolbar}`}>
        <AdminSearch
          value={keyword}
          onChange={setKeyword}
          placeholder="Cari nama makanan..."
          label="Cari makanan"
        />
        <span className={styles.count}>{list.length} makanan</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={`w-100 ${styles.table}`}>
          <thead>
            <tr>
              <th scope="col">Makanan</th>
              <th scope="col">Kategori</th>
              <th scope="col">Harga</th>
              <th scope="col">Waktu</th>
              <th scope="col" className="text-end">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.tableEmpty}>{emptyText}</td>
              </tr>
            ) : (
              list.map((food) => (
                <tr key={food.id}>
                  <td className={styles.cellMain} data-label="Makanan">
                    <div className={`d-flex align-items-center ${styles.cellFood}`}>
                      <Image src={food.image} alt="" width={54} height={54} className={styles.cellImg} />
                      <div>
                        <strong className={styles.cellName}>{food.name}</strong>
                        {food.featured && <span className={styles.featured}>★ Pilihan Beranda</span>}
                        <small className={styles.cellDesc}>{food.shortDescription}</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Kategori">
                    <div className={`d-flex flex-wrap justify-content-end justify-content-md-start ${ui.tagList}`}>
                      {food.categories.map((id) => {
                        const category = getCategory(id);
                        return (
                          <span className={ui.tag} key={id}>
                            {category ? `${category.icon} ${category.label}` : id}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td data-label="Harga">
                    <div>
                      <span className={`${ui.tag} ${ui.tagOrange}`}>{getPrice(food.priceCategory)?.label}</span>
                      <small className={styles.cellSub}>{food.priceRange}</small>
                    </div>
                  </td>
                  <td data-label="Waktu">
                    {food.timeCategory.map((id) => getTime(id)?.label ?? id).join(", ")}
                  </td>
                  <td data-label="Aksi" className="text-end">
                    <div className={`d-flex justify-content-end ${ui.rowActions}`}>
                      <button
                        type="button"
                        className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`}
                        title="Edit"
                        aria-label={`Edit ${food.name}`}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn} ${ui.iconBtnDanger}`}
                        title="Hapus"
                        aria-label={`Hapus ${food.name}`}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
