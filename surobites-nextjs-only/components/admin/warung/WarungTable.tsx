"use client";

import { useState } from "react";
import Image from "next/image";
import { warungs } from "@/data/foods";
import { findFood, formatTime, isWarungOpen } from "@/lib/helper";
import AdminSearch from "@/components/admin/AdminSearch";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function WarungTable() {
  const [keyword, setKeyword] = useState("");

  const list = warungs.filter((warung) =>
    warung.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
  const emptyText = warungs.length === 0 ? "Belum ada data warung." : "Warung tidak ditemukan.";

  return (
    <div className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-center justify-content-between ${styles.toolbar}`}>
        <AdminSearch
          value={keyword}
          onChange={setKeyword}
          placeholder="Cari nama warung..."
          label="Cari warung"
        />
        <span className={styles.count}>{list.length} warung</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={`w-100 ${styles.table}`}>
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
                <td colSpan={5} className={styles.tableEmpty}>{emptyText}</td>
              </tr>
            ) : (
              list.map((warung) => (
                <tr key={warung.id}>
                  <td className={styles.cellMain} data-label="Warung">
                    <div className={`d-flex align-items-center ${styles.cellFood}`}>
                      <Image src={warung.image} alt="" width={54} height={54} className={styles.cellImg} />
                      <div>
                        <strong className={styles.cellName}>{warung.name}</strong>
                        <small className={styles.cellDesc}>{warung.address}</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Jam Buka">
                    <div className={styles.cellTime}>
                      <strong>
                        {formatTime(warung.openTime)} – {formatTime(warung.closeTime)}
                      </strong>
                      <small className={styles.cellSub}>{warung.openDays}</small>
                    </div>
                  </td>
                  <td data-label="Menu">
                    <div className={`d-flex flex-wrap justify-content-end justify-content-md-start ${ui.tagList}`}>
                      {warung.foodIds.map((id) => (
                        <span className={`${ui.tag} ${ui.tagGray}`} key={id}>
                          {findFood(id)?.name ?? id}
                        </span>
                      ))}
                      {warung.otherMenu.map((item) => (
                        <span className={`${ui.tag} ${ui.tagGray}`} key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td data-label="Status">
                    {isWarungOpen(warung) ? (
                      <span className={`${ui.tag} ${ui.tagGreen}`}>● Buka</span>
                    ) : (
                      <span className={`${ui.tag} ${ui.tagGray}`}>● Tutup</span>
                    )}
                  </td>
                  <td data-label="Aksi" className="text-end">
                    <div className={`d-flex justify-content-end ${ui.rowActions}`}>
                      <button
                        type="button"
                        className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`}
                        title="Edit"
                        aria-label={`Edit ${warung.name}`}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn} ${ui.iconBtnDanger}`}
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
