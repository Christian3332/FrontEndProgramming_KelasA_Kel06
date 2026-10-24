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

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggleFavorite = useCallback((id: string) => {
    const current = read();
    write(
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }, []);

  const clearFavorites = useCallback(() => write([]), []);
  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
