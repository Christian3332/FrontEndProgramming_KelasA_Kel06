"use client";

import { useLastLogin } from "@/lib/auth";

export default function ActivityPanel() {
  const lastLogin = useLastLogin();

  return (
    <article className="panel">
      <div className="panel__header">
        <div>
          <h3 className="panel__title">Aktivitas terakhir</h3>
          <p className="panel__subtitle">Riwayat perubahan oleh admin</p>
        </div>
      </div>

      <ul className="activity-list">
        {lastLogin ? (
          <li>
            <span className="activity-dot activity-dot--login">
              <i className="fa-solid fa-key"></i>
            </span>
            <div>
              <p>Login ke dashboard admin</p>
              <time>{new Date(Number(lastLogin)).toLocaleString("id-ID")}</time>
            </div>
          </li>
        ) : (
          <li className="panel-empty">Belum ada aktivitas.</li>
        )}
      </ul>
    </article>
  );
}
