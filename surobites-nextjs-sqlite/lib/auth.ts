"use client";

import { useSyncExternalStore } from "react";

const LAST_LOGIN_KEY = "surobites_last_login";
const LAST_LOGIN_EVENT = "surobites:last-login";

export async function login(username: string, password: string) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Login gagal. Silakan coba lagi.");
  }

  localStorage.setItem(LAST_LOGIN_KEY, String(Date.now()));
  window.dispatchEvent(new Event(LAST_LOGIN_EVENT));
}

export async function logout() {
  await fetch("/api/admin/logout", { method: "POST" });
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LAST_LOGIN_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LAST_LOGIN_EVENT, callback);
  };
}

function getLastLogin() {
  return localStorage.getItem(LAST_LOGIN_KEY);
}

export function useLastLogin() {
  return useSyncExternalStore(subscribe, getLastLogin, () => null);
}
