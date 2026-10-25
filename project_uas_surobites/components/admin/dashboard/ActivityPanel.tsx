"use client";

import { useLastLogin } from "@/lib/auth";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export default function ActivityPanel() {
  const lastLogin = useLastLogin();

  return (
    <article className={`h-100 ${ui.panel}`}>
      <div className={`d-flex flex-wrap align-items-start justify-content-between ${ui.panelHeader}`}>
        <div>
          <h3 className={ui.panelTitle}>Aktivitas terakhir</h3>
          <p className={ui.panelSubtitle}>Riwayat perubahan oleh admin</p>
        </div>
      </div>

      <ul className="list-unstyled m-0 d-flex flex-column">
        {lastLogin ? (
          <li className={`d-flex ${styles.activityItem}`}>
            <span className={`d-flex align-items-center justify-content-center ${styles.activityDot}`}>
              <i className="fa-solid fa-key"></i>
            </span>
            <div>
              <p className={styles.activityText}>Login ke dashboard admin</p>
              <time className={styles.activityTime}>
                {new Date(Number(lastLogin)).toLocaleString("id-ID")}
              </time>
            </div>
          </li>
        ) : (
          <li className={ui.panelEmpty}>Belum ada aktivitas.</li>
        )}
      </ul>
    </article>
  );
}
