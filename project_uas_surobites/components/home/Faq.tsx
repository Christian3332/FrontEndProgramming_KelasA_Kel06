"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import styles from "@/app/styles/home.module.css";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.sectionTitle}>
        Pertanyaan yang Sering Diajukan
      </h2>
      <p className={styles.subtitle}>
        Masih bingung? Temukan jawaban seputar SuroBites di sini.
      </p>
      <div className={`d-flex flex-column mx-auto ${styles.faqList}`}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ""}`} key={f.id}>
              <h3 className={styles.faqHeading}>
                <button
                  type="button"
                  className={`d-flex align-items-center justify-content-between w-100 ${styles.faqQuestion}`}
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.question}
                  <span className={styles.faqIcon} aria-hidden="true"></span>
                </button>
              </h3>
              <div
                className={styles.faqAnswer}
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                <div className={styles.faqAnswerInner}>
                  <p className={styles.faqAnswerText}>{f.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
