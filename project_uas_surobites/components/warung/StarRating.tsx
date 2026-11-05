"use client";

import { useState } from "react";
import type { RatingSummary } from "@/lib/ratings";
import styles from "@/app/styles/lokasi.module.css";

type Props = {
  warungId: string;
  summary?: RatingSummary;
  onRated: (warungId: string, summary: RatingSummary) => void;
};

export default function StarRating({ warungId, summary, onRated }: Props) {
  const [hover, setHover] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const myScore = summary?.myScore ?? 0;
  // pas kursor di atas bintang, tampilin preview nilai yang mau dikasih
  const shown = hover || myScore;

  async function rate(score: number) {
    setSaving(true);
    setError("");

    const response = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ warungId, score }),
    }).catch(() => null);

    const data = await response?.json().catch(() => null);
    if (response?.ok) {
      onRated(warungId, data);
    } else {
      setError(data?.message ?? "Rating gagal disimpan.");
    }
    setSaving(false);
  }

  return (
    <div className={styles.rating}>
      <p className={styles.ratingAvg}>
        <i className="fa-solid fa-star" aria-hidden="true"></i>
        {summary && summary.count > 0
          ? ` ${summary.average.toFixed(1)} (${summary.count} penilai)`
          : " Belum ada rating"}
      </p>

      <div className="d-flex align-items-center flex-wrap gap-1" onMouseLeave={() => setHover(0)}>
        <span className={styles.ratingLabel}>{myScore ? "Rating kamu:" : "Beri rating:"}</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${styles.starBtn} ${star <= shown ? styles.starOn : ""}`}
            aria-label={`Beri ${star} bintang`}
            aria-pressed={star === myScore}
            disabled={saving}
            onMouseEnter={() => setHover(star)}
            onClick={() => rate(star)}
          >
            <i className={star <= shown ? "fa-solid fa-star" : "fa-regular fa-star"} aria-hidden="true"></i>
          </button>
        ))}
      </div>

      {error && <p className={styles.ratingError}>{error}</p>}
    </div>
  );
}
