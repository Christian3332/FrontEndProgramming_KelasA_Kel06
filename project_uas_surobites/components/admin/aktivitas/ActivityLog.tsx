"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import type { ActivityType, UserActivity } from "@/lib/admin-activity";
import AdminSearch from "@/components/admin/AdminSearch";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

type Props = {
  activities: UserActivity[];
  updatedAt: string;
};

type Filter = "semua" | ActivityType;

const filters: { value: Filter; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "daftar", label: "Daftar akun" },
  { value: "love", label: "Love makanan" },
  { value: "rating", label: "Rating warung" },
];

const tagClass: Record<ActivityType, string> = {
  daftar: ui.tag,
  love: `${ui.tag} ${ui.tagRed}`,
  rating: `${ui.tag} ${ui.tagOrange}`,
};

const icons: Record<ActivityType, string> = {
  daftar: "fa-solid fa-user-plus",
  love: "fa-solid fa-heart",
  rating: "fa-solid fa-star",
};

const PER_PAGE = 20;
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

// jamnya dihitung manual ke WIB biar hasil di server dan browser sama
function formatWaktu(iso: string) {
  const date = new Date(new Date(iso).getTime() + 7 * 60 * 60 * 1000);
  const jam = `${String(date.getUTCHours()).padStart(2, "0")}.${String(date.getUTCMinutes()).padStart(2, "0")} WIB`;
  const tanggal = `${date.getUTCDate()} ${BULAN[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  return { jam, tanggal };
}

export default function ActivityLog({ activities, updatedAt }: Props) {
  const router = useRouter();
  const [refreshing, startRefresh] = useTransition();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState<Filter>("semua");
  const [visible, setVisible] = useState(PER_PAGE);

  // ambil data terbaru dari server tiap 30 detik
  useEffect(() => {
    const timer = window.setInterval(() => router.refresh(), 30000);
    return () => window.clearInterval(timer);
  }, [router]);

  function refresh() {
    startRefresh(() => router.refresh());
  }

  function changeFilter(value: Filter) {
    setFilter(value);
    setVisible(PER_PAGE);
  }

  function changeKeyword(value: string) {
    setKeyword(value);
    setVisible(PER_PAGE);
  }

  const search = keyword.toLowerCase().trim();
  const filtered = activities.filter((item) => {
    const text = `${item.userName} ${item.userEmail} ${item.action} ${item.target}`.toLowerCase();
    return (filter === "semua" || item.type === filter) && text.includes(search);
  });
  const shown = filtered.slice(0, visible);
  const emptyText = activities.length === 0 ? "Belum ada aktivitas user." : "Aktivitas tidak ditemukan.";
  const lastUpdate = formatWaktu(updatedAt);

  function countOf(value: Filter) {
    return value === "semua" ? activities.length : activities.filter((item) => item.type === value).length;
  }

  return (
    <div className={ui.panel}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>Riwayat aktivitas</h3>
          <p className={ui.panelSubtitle}>
            {activities.length} aktivitas terbaru · diperbarui {lastUpdate.jam}
          </p>
        </div>
        <Button variant="" className={`${ui.btn} ${ui.btnSm} ${ui.btnGhost}`} onClick={refresh} disabled={refreshing}>
          <i className={`fa-solid fa-rotate-right ${refreshing ? "fa-spin" : ""}`}></i>
          {refreshing ? "Memuat..." : "Muat ulang"}
        </Button>
      </div>

      <div className={`d-flex flex-wrap align-items-center justify-content-between ${styles.toolbar}`}>
        <AdminSearch
          value={keyword}
          onChange={changeKeyword}
          placeholder="Cari nama, email, atau aktivitas..."
          label="Cari aktivitas user"
        />
        <span className={styles.count}>{filtered.length} aktivitas</span>
      </div>

      <div className={`d-flex flex-wrap gap-2 ${styles.toolbar}`} role="group" aria-label="Filter jenis aktivitas">
        {filters.map((item) => (
          <Button
            key={item.value}
            variant=""
            className={`${ui.btn} ${ui.btnSm} ${filter === item.value ? ui.btnBlue : ui.btnGhost}`}
            aria-pressed={filter === item.value}
            onClick={() => changeFilter(item.value)}
          >
            {item.label} ({countOf(item.value)})
          </Button>
        ))}
      </div>

      <div className={styles.tableWrap}>
        <table className={`w-100 ${styles.table}`}>
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Aktivitas</th>
              <th scope="col">Detail</th>
              <th scope="col">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 ? (
              <tr><td colSpan={4} className={styles.tableEmpty}>{emptyText}</td></tr>
            ) : shown.map((item) => {
              const waktu = formatWaktu(item.time);

              return (
                <tr key={item.id}>
                  <td className={styles.cellMain} data-label="User">
                    <div className={`d-flex align-items-center ${styles.cellFood}`}>
                      <span className={`d-inline-flex align-items-center justify-content-center ${styles.avatar}`} aria-hidden="true">
                        {item.userName.charAt(0)}
                      </span>
                      <div>
                        <strong className={styles.cellName}>{item.userName}</strong>
                        <small className={styles.cellSub}>{item.userEmail}</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Aktivitas">
                    <span className={tagClass[item.type]}>
                      <i className={icons[item.type]}></i> {item.action}
                    </span>
                  </td>
                  <td data-label="Detail">{item.target || "-"}</td>
                  <td data-label="Waktu">
                    <div className={styles.cellTime}>
                      <strong>{waktu.jam}</strong>
                      <small className={styles.cellSub}>{waktu.tanggal}</small>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length > visible && (
        <div className={`d-flex justify-content-center ${ui.panelFooter}`}>
          <Button variant="" className={`${ui.btn} ${ui.btnOutline}`} onClick={() => setVisible(visible + PER_PAGE)}>
            Tampilkan lebih banyak
          </Button>
        </div>
      )}
    </div>
  );
}
