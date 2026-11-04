"use client";

import { useEffect, useState } from "react";

const COUNTS_EVENT = "admin-counts-refresh";

type Counts = {
  foods: number;
  warungs: number;
  faqs: number;
};

async function hitung(url: string) {
  const response = await fetch(url);
  if (!response.ok) return 0;
  const data: unknown[] = await response.json();
  return data.length;
}

// panggil ini habis tambah/edit/hapus data biar angka di sidebar ikut update
export function refreshAdminCounts() {
  window.dispatchEvent(new Event(COUNTS_EVENT));
}

export function useAdminCounts() {
  const [counts, setCounts] = useState<Counts>({ foods: 0, warungs: 0, faqs: 0 });

  useEffect(() => {
    async function load() {
      const [foods, warungs, faqs] = await Promise.all([
        hitung("/api/foods"),
        hitung("/api/warungs"),
        hitung("/api/faqs"),
      ]);
      setCounts({ foods, warungs, faqs });
    }

    // kalau fetch gagal, angka lama dibiarkan aja
    const refresh = () => {
      load().catch(() => {});
    };

    refresh();
    window.addEventListener(COUNTS_EVENT, refresh);
    return () => window.removeEventListener(COUNTS_EVENT, refresh);
  }, []);

  return counts;
}
