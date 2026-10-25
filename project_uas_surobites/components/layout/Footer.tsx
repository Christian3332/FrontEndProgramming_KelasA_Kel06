import Link from "next/link";
import Image from 'next/image';
import styles from "@/app/styles/footer.module.css";

export function Footer() {
    return (
        <footer className={`mt-auto px-3 pt-4 ${styles.footer}`}>
            <div className="container p-0 d-flex flex-column flex-md-row justify-content-md-between align-items-md-start gap-4">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                    <Image src="/img/Surobites Logo.png" alt="" width={30} height={30} />
                    <h2 className={`m-0 ${styles.brand}`}>SuroBites</h2>
                </div>

                <div className={`row row-cols-3 row-cols-md-auto g-2 gx-sm-4 gx-md-5 ${styles.links}`}>
                    <div className="col text-start">
                        <h4 className={styles.title}>Information</h4>
                        <ul className="list-unstyled m-0">
                            <li className={styles.item}><Link href="/#faq">FAQ</Link></li>
                            <li className={styles.item}><Link href="/#faq">Tentang SuroBites</Link></li>
                        </ul>
                    </div>

                    <div className="col text-center text-md-start">
                        <h4 className={styles.title}>Quick Links</h4>
                        <ul className="list-unstyled m-0">
                            <li className={styles.item}>
                                <a href="mailto:SuroBites@gmail.com">
                                    SuroBites@gmail.com
                                </a>
                            </li>
                            <li className={styles.item}><a href="tel:0888777999">0888777999</a></li>
                        </ul>
                    </div>

                    <div className="col text-end text-md-start" >
                        <h4 className={styles.title}>Follow us</h4>
                        <ul className="list-unstyled m-0">
                            <li className={styles.item}><a href="#">Instagram</a></li>
                            <li className={styles.item}><a href="#">Facebook</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={`text-center mt-4 py-3 ${styles.bottom}`}>
                <p className="m-0">&copy; 2026 | SuroBites.com</p>
            </div>
        </footer>
    );
}