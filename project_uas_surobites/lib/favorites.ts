"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "surobites_favorites";
const EMPTY: string[] = [];

let cache: string[] = EMPTY;
let cacheRaw: string | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  const raw = localStorage.getItem(KEY);
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      cache = raw ? JSON.parse(raw) : EMPTY;
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function write(list: string[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l());
}

// kirim ke server biar jumlah favorit tiap makanan ikut ke-update.
// kalau gagal ya udah, yang di localStorage tetap jalan
function syncCount(id: string, action: "add" | "remove") {
  fetch(`/api/foods/${encodeURIComponent(id)}/favorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  }).catch(() => {});
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggleFavorite = useCallback((id: string) => {
    const current = read();
    const sudahFavorit = current.includes(id);
    write(sudahFavorit ? current.filter((x) => x !== id) : [...current, id]);
    syncCount(id, sudahFavorit ? "remove" : "add");
  }, []);

  const clearFavorites = useCallback(() => {
    read().forEach((id) => syncCount(id, "remove"));
    write([]);
  }, []);
  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
