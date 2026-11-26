"use client";

import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { faqs } from "@/data/faqs";
import styles from "@/app/styles/home.module.css";

export default function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.sectionTitle}>
        Pertanyaan yang Sering Diajukan
      </h2>
      <p className={styles.subtitle}>
        Masih bingung? Temukan jawaban seputar SuroBites di sini.
      </p>
      <Accordion
        activeKey={open}
        onSelect={(key) => setOpen(typeof key === "string" ? key : null)}
        className={`d-flex flex-column mx-auto ${styles.faqList}`}
      >
        {faqs.map((f) => (
          <Accordion.Item
            eventKey={f.id}
            key={f.id}
            className={`${styles.faqItem} ${open === f.id ? styles.faqOpen : ""}`}
          >
            <Accordion.Header as="h3" className={styles.faqHeading}>
              {f.question}
              <span className={styles.faqIcon} aria-hidden="true"></span>
            </Accordion.Header>
            <Accordion.Body className={styles.faqAnswer}>{f.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}
