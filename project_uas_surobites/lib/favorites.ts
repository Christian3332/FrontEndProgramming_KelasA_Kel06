"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { Food } from "@/data/foods";

type Store = {
  liked: string[]; // slug makanan yang di-love user ini
  counts: Record<string, number>; // jumlah love terbaru dari server setelah diklik
};

const EMPTY: Store = { liked: [], counts: {} };

// disimpan di luar komponen biar semua tombol hati di halaman barengan datanya
let store: Store = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function setStore(next: Store) {
  store = next;
  listeners.forEach((l) => l());
}

// ambil ulang daftar love dari server, dipanggil juga habis login / logout
export function reloadLikes() {
  loaded = true;
  fetch("/api/likes")
    .then((res) => (res.ok ? res.json() : { liked: [] }))
    .then((data) => setStore({ liked: data.liked ?? [], counts: {} }))
    .catch(() => setStore(EMPTY));
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!loaded) reloadLikes();
  return () => {
    listeners.delete(cb);
  };
}

export function useFavorites() {
  const router = useRouter();
  const { liked, counts } = useSyncExternalStore(subscribe, () => store, () => EMPTY);

  const toggleFavorite = useCallback(async (id: string) => {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foodId: id }),
    });

    // belum login, suruh login dulu terus balik lagi ke halaman ini
    if (res.status === 401) {
      const next = window.location.pathname + window.location.search;
      router.push(`/login?next=${encodeURIComponent(next)}`);
      return;
    }
    if (!res.ok) return;

    const data = await res.json();
    setStore({
      liked: data.liked ? [...store.liked, id] : store.liked.filter((x) => x !== id),
      counts: { ...store.counts, [id]: data.count },
    });
  }, [router]);

  const clearFavorites = useCallback(async () => {
    const res = await fetch("/api/likes", { method: "DELETE" });
    if (res.ok) setStore(EMPTY);
  }, []);

  const isFavorite = (id: string) => liked.includes(id);

  // pakai angka terbaru kalau barusan diklik, kalau belum ya pakai angka dari data makanan
  const likeCount = (food: Food) => counts[food.id] ?? food.favoriteCount ?? 0;

  return { favorites: liked, isFavorite, toggleFavorite, clearFavorites, likeCount };
}
