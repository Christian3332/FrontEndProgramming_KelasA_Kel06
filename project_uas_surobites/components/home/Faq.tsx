"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title">
        Pertanyaan yang Sering Diajukan
      </h2>
      <p className="section-subtitle">
        Masih bingung? Temukan jawaban seputar SuroBites di sini.
      </p>
      <div className="faq-list">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={f.id}>
              <h3 className="faq-heading">
                <button
                  type="button"
                  className="faq-question"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.question}
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div
                className="faq-answer"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                <div className="faq-answer__inner">
                  <p>{f.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}