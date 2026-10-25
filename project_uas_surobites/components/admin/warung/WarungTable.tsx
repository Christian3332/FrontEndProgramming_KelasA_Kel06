"use client";

import { useState } from "react";
import Image from "next/image";
import { warungs } from "@/data/foods";
import { findFood, formatTime, isWarungOpen } from "@/lib/helper";
import AdminSearch from "@/components/admin/AdminSearch";

export default function WarungTable() {
  const [keyword, setKeyword] = useState("");

  const list = warungs.filter((warung) =>
    warung.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
  const emptyText = warungs.length === 0 ? "Belum ada data warung." : "Warung tidak ditemukan.";

  return (
    <div className="panel">
      <div className="table-toolbar">
        <AdminSearch
          value={keyword}
          onChange={setKeyword}
          placeholder="Cari nama warung..."
          label="Cari warung"
        />
        <span className="table-count">{list.length} warung</span>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Warung</th>
              <th scope="col">Jam Buka</th>
              <th scope="col">Menu</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} className="table-empty">{emptyText}</td>
              </tr>
            ) : (
              list.map((warung) => (
                <tr key={warung.id}>
                  <td className="cell-main" data-label="Warung">
                    <div className="cell-food">
                      <Image src={warung.image} alt="" width={48} height={48} />
                      <div>
                        <strong>{warung.name}</strong>
                        <small>{warung.address}</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Jam Buka">
                    <div className="cell-time">
                      <strong>
                        {formatTime(warung.openTime)} – {formatTime(warung.closeTime)}
                      </strong>
                      <small className="cell-sub">{warung.openDays}</small>
                    </div>
                  </td>
                  <td data-label="Menu">
                    <div className="tag-list">
                      {warung.foodIds.map((id) => (
                        <span className="tag tag--gray" key={id}>
                          {findFood(id)?.name ?? id}
                        </span>
                      ))}
                      {warung.otherMenu.map((item) => (
                        <span className="tag tag--gray" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td data-label="Status">
                    {isWarungOpen(warung) ? (
                      <span className="tag tag--green">● Buka</span>
                    ) : (
                      <span className="tag tag--gray">● Tutup</span>
                    )}
                  </td>
                  <td data-label="Aksi" className="text-end">
                    <div className="row-actions">
                      <button type="button" className="icon-btn" title="Edit" aria-label={`Edit ${warung.name}`}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        className="icon-btn icon-btn--danger"
                        title="Hapus"
                        aria-label={`Hapus ${warung.name}`}
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
