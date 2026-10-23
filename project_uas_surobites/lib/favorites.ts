"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "favorites";
const EMPTY: number[] = [];

let cache: number[] = EMPTY;
let cacheRaw: string | null = null;
const listeners = new Set<() => void>();

function readFavorites(): number[] {
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

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, readFavorites, () => EMPTY);

  const toggleFavorite = useCallback((id: number) => {
    const current = readFavorites();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l());
  }, []);

  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, isFavorite, toggleFavorite };
}
