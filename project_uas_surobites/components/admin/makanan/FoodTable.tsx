"use client";

import { useState } from "react";
import Image from "next/image";
import { foods } from "@/data/foods";
import { getCategory, getPrice, getTime } from "@/lib/helper";
import AdminSearch from "@/components/admin/AdminSearch";

export default function FoodTable() {
  const [keyword, setKeyword] = useState("");

  const list = foods.filter((food) =>
    food.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
  const emptyText = foods.length === 0 ? "Belum ada data makanan." : "Makanan tidak ditemukan.";

  return (
    <div className="panel">
      <div className="table-toolbar">
        <AdminSearch
          value={keyword}
          onChange={setKeyword}
          placeholder="Cari nama makanan..."
          label="Cari makanan"
        />
        <span className="table-count">{list.length} makanan</span>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
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
                <td colSpan={5} className="table-empty">{emptyText}</td>
              </tr>
            ) : (
              list.map((food) => (
                <tr key={food.id}>
                  <td className="cell-main" data-label="Makanan">
                    <div className="cell-food">
                      <Image src={food.image} alt="" width={48} height={48} />
                      <div>
                        <strong>{food.name}</strong>
                        {food.featured && <span className="featured-flag">★ Pilihan Beranda</span>}
                        <small>{food.shortDescription}</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Kategori">
                    <div className="tag-list">
                      {food.categories.map((id) => {
                        const category = getCategory(id);
                        return (
                          <span className="tag" key={id}>
                            {category ? `${category.icon} ${category.label}` : id}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td data-label="Harga">
                    <div>
                      <span className="tag tag--orange">{getPrice(food.priceCategory)?.label}</span>
                      <small className="cell-sub">{food.priceRange}</small>
                    </div>
                  </td>
                  <td data-label="Waktu">
                    {food.timeCategory.map((id) => getTime(id)?.label ?? id).join(", ")}
                  </td>
                  <td data-label="Aksi" className="text-end">
                    <div className="row-actions">
                      <button type="button" className="icon-btn" title="Edit" aria-label={`Edit ${food.name}`}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        className="icon-btn icon-btn--danger"
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
