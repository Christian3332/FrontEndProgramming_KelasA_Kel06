"use client";

import Image from "next/image";

export default function WelcomeCard() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="welcome-card">
      <div className="welcome-card__text">
        <p className="welcome-card__eyebrow">{today}</p>
        <h2>
          Halo, <span>Admin</span>!
        </h2>
        <p>
          Kelola konten kuliner Surabaya agar pengunjung SuroBites selalu
          mendapat informasi terbaru.
        </p>
        <div className="welcome-card__actions">
          <button type="button" className="ui-btn ui-btn--primary">
            + Tambah Makanan
          </button>
          <button type="button" className="ui-btn ui-btn--light">
            + Tambah Warung
          </button>
        </div>
      </div>
      <span className="welcome-card__art" aria-hidden="true">
        <Image src="/img/Surobites Logo.png" alt="" width={120} height={120} />
      </span>
    </div>
  );
}
