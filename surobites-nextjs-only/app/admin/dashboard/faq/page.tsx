import type { Metadata } from "next";
import { Button, Col } from "react-bootstrap";
import { faqs } from "@/data/faqs";
import SectionHead from "@/components/admin/SectionHead";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

export const metadata: Metadata = {
  title: "Kelola FAQ",
};

export default function KelolaFaqPage() {
  return (
    <section className={ui.section} aria-labelledby="sec-faq">
      <SectionHead
        id="sec-faq"
        title="Kelola FAQ"
        description="Pertanyaan dan jawaban ini tampil sebagai accordion di Beranda. Gunakan tombol panah untuk mengatur urutan."
      >
        <Button variant="primary" className={`${ui.btn} ${ui.btnPrimary}`}>
          + Tambah FAQ
        </Button>
      </SectionHead>

      <div className={ui.panel}>
        <div className={`d-flex flex-column ${styles.faqList}`}>
          {faqs.length === 0 && <p className={ui.panelEmpty}>Belum ada data FAQ.</p>}

          {faqs.map((faq, index) => (
            <div className={`d-flex flex-wrap flex-md-nowrap align-items-md-center ${styles.faqItem}`} key={faq.id}>
              <span className={`d-flex align-items-center justify-content-center ${styles.faqNum}`}>{index + 1}</span>
              <div className={styles.faqBody}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
              <Col xs={12} md="auto" className={`d-flex justify-content-end ${ui.rowActions}`}>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Naikkan" aria-label="Naikkan">
                  <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Turunkan" aria-label="Turunkan">
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Edit" aria-label="Edit">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn} ${ui.iconBtnDanger}`} title="Hapus" aria-label="Hapus">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </Col>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
