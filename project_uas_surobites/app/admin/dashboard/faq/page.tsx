import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import SectionHead from "@/components/admin/SectionHead";

export const metadata: Metadata = {
  title: "Kelola FAQ",
};

export default function KelolaFaqPage() {
  return (
    <section className="admin-section" aria-labelledby="sec-faq">
      <SectionHead
        id="sec-faq"
        title="Kelola FAQ"
        description="Pertanyaan dan jawaban ini tampil sebagai accordion di Beranda. Gunakan tombol panah untuk mengatur urutan."
      >
        <button type="button" className="ui-btn ui-btn--primary">
          + Tambah FAQ
        </button>
      </SectionHead>

      <div className="panel">
        <div className="faq-admin-list">
          {faqs.length === 0 && <p className="panel-empty">Belum ada data FAQ.</p>}

          {faqs.map((faq, index) => (
            <div className="faq-admin-item" key={faq.id}>
              <span className="faq-admin-item__num">{index + 1}</span>
              <div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
              <div className="row-actions">
                <button type="button" className="icon-btn" title="Naikkan" aria-label="Naikkan">
                  <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button type="button" className="icon-btn" title="Turunkan" aria-label="Turunkan">
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <button type="button" className="icon-btn" title="Edit" aria-label="Edit">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button type="button" className="icon-btn icon-btn--danger" title="Hapus" aria-label="Hapus">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
