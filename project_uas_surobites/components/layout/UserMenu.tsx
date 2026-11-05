"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dropdown } from "react-bootstrap";
import styles from "@/app/styles/header.module.css";

type User = { id: number; name: string; email: string; image: string | null };

export default function UserMenu({ className = "" }: { className?: string }) {
  const router = useRouter();
  // undefined = masih dicek, null = belum login
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => (response.ok ? response.json() : null))
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.replace("/");
    router.refresh();
  }

  // biar navbar gak kedip-kedip pas data user belum kebaca
  if (user === undefined) return <span className={`${styles.avatar} ${styles.avatarLoading} ${className}`} aria-hidden="true" />;

  if (!user) {
    return (
      <Link href="/login" className={`${styles.loginBtn} ${className}`}>
        Masuk
      </Link>
    );
  }

  return (
    <Dropdown align="end" className={className}>
      <Dropdown.Toggle as="button" type="button" bsPrefix={styles.avatar} aria-label={`Menu akun ${user.name}`}>
        {user.image ? (
          // unoptimized biar foto yang baru diupload langsung kebaca
          <Image src={user.image} alt="" width={42} height={42} unoptimized className={styles.avatarImg} />
        ) : (
          user.name.trim().charAt(0).toUpperCase()
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.userMenu}>
        <Dropdown.Header className={styles.userInfo}>
          <strong>{user.name}</strong>
          <small>{user.email}</small>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={logout} className={styles.logoutItem}>
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
