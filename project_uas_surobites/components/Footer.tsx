import Link from "next/link";
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Image src="/img/Surobites Logo.png" alt="" width={30} height={30} />
                    <h2>SuroBites</h2>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h4>Information</h4>
                        <ul>
                            <li><Link href="/#faq">FAQ</Link></li>
                            <li><Link href="/#faq">Tentang SuroBites</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>
                                <a href="mailto:SuroBites@gmail.com">
                                    SuroBites@gmail.com
                                </a>
                            </li>
                            <li><a href="tel:0888777999">0888777999</a></li>
                        </ul>
                    </div>

                    <div className="footer-column footer-column-social" >
                        <h4>Follow us</h4>
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Facebook</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 | SuroBites.com</p>
            </div>
        </footer>
    );
}