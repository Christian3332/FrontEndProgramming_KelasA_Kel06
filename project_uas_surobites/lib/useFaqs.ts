"use client";

import { useEffect, useState } from "react";
import { faqs as faqsAwal } from "@/data/faqs";
import type { Faq } from "@/data/faqs";

export function useFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>(faqsAwal);

  useEffect(() => {
    fetch("/api/faqs")
      .then((response) => {
        if (!response.ok) throw new Error("Data FAQ gagal dimuat.");
        return response.json();
      })
      .then((data: Faq[]) => setFaqs(data))
      .catch(() => setFaqs(faqsAwal));
  }, []);

  return faqs;
}
