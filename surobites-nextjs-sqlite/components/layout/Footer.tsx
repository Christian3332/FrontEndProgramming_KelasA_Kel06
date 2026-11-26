import Link from "next/link";
import Image from 'next/image';
import { Col, Container, Row } from "react-bootstrap";
import styles from "@/app/styles/footer.module.css";

type Props = {
    content: {
        contactEmail: string;
        contactPhone: string;
        instagram: string;
        facebook: string;
    };
};

export function Footer({ content }: Props) {
    return (
        <footer className={`mt-auto px-3 pt-4 ${styles.footer}`}>
            <Container className="p-0 d-flex flex-column flex-md-row justify-content-md-between align-items-md-start gap-4">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                    <Image src="/img/Surobites Logo.png" alt="" width={30} height={30} />
                    <h2 className={`m-0 ${styles.brand}`}>SuroBites</h2>
                </div>

                <Row xs={3} md="auto" className="g-2 gx-sm-4 gx-md-5">
                    <Col className="text-start">
                        <h4 className={styles.title}>Information</h4>
                        <ul className="list-unstyled m-0">
                            <li className={styles.item}><Link href="/#faq">FAQ</Link></li>
                            <li className={styles.item}><Link href="/#faq">Tentang SuroBites</Link></li>
                        </ul>
                    </Col>

                    <Col className="text-center text-md-start">
                        <h4 className={styles.title}>Quick Links</h4>
                        <ul className="list-unstyled m-0">
                            <li className={styles.item}>
                                <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
                            </li>
                            <li className={styles.item}>
                                <a href={`tel:${content.contactPhone.replace(/[^\d+]/g, "")}`}>{content.contactPhone}</a>
                            </li>
                        </ul>
                    </Col>

                    <Col className="text-end text-md-start" >
                        <h4 className={styles.title}>Follow us</h4>
                        <ul className="list-unstyled m-0">
                            <li className={styles.item}>
                                {content.instagram ? <a href={content.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> : <span>Instagram</span>}
                            </li>
                            <li className={styles.item}>
                                {content.facebook ? <a href={content.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> : <span>Facebook</span>}
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            <div className={`text-center mt-4 py-3 ${styles.bottom}`}>
                <p className="m-0">&copy; 2026 | SuroBites.com</p>
            </div>
        </footer>
    );
}
