"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginStatus } from "@/lib/auth";

export default function AdminShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const loggedIn = useLoginStatus();

  useEffect(() => {
    if (loggedIn === false) {
      router.replace("/admin/login?pesan=login");
    }
  }, [loggedIn, router]);

  // dashboard belum ditampilkan sebelum pasti sudah login
  if (!loggedIn) {
    return null;
  }

  return (
    <>
      <a className="skip-link" href="#admin-main">
        Langsung ke konten utama
      </a>

      <div className="admin-layout">
        <div className="admin-main-wrap">
          <main id="admin-main" className="admin-content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
