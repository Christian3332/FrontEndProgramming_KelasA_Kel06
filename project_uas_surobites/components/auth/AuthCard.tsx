import Image from "next/image";
import Link from "next/link";
import styles from "@/app/styles/admin-login.module.css";

type Props = {
  title: string;
  text: string;
  children: React.ReactNode;
};

// kerangka kartu buat halaman lupa password & reset password (tampilannya disamain sama kartu login)
export default function AuthCard({ title, text, children }: Props) {
  return (
    <div className={`w-100 ${styles.card}`}>
      <div className={`text-center ${styles.cardHeader}`}>
        <Image className={styles.cardLogo} src="/img/Surobites Logo.png" alt="Logo SuroBites" width={64} height={64} />
        <p className={styles.cardBrand}>SuroBites</p>
        <h1 className={styles.cardTitle}>{title}</h1>
        <p className={styles.cardText}>{text}</p>
      </div>

      {children}

      <Link href="/login" className={styles.backLink}>
        <i className="fa-solid fa-arrow-left me-2"></i>
        Kembali ke halaman login
      </Link>
    </div>
  );
}
