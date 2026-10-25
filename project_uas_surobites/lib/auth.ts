import { useSyncExternalStore } from "react";
import { admin } from "@/data/admin";

const LOGIN_KEY = "surobites_login";

// fungsi ini yang diganti jadi fetch kalau mau backend
export async function login(username: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const berhasil = username === admin.username && password === admin.password;

  if (berhasil) {
    sessionStorage.setItem(LOGIN_KEY, "true");
    localStorage.setItem("surobites_last_login", String(Date.now()));
  }

  return berhasil;
}

export function isLoggedIn() {
  return sessionStorage.getItem(LOGIN_KEY) === "true";
}

export function logout() {
  sessionStorage.removeItem(LOGIN_KEY);
}

function subscribe() {
  return () => {};
}

// null artinya belum tahu, karena di server belum bisa baca sessionStorage
export function useLoginStatus() {
  return useSyncExternalStore<boolean | null>(subscribe, isLoggedIn, () => null);
}
