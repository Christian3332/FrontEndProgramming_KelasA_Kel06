"use client";

import { useEffect, useState } from "react";
import { warungs as warungsAwal } from "@/data/foods";
import type { Warung } from "@/data/foods";

export function useWarungs() {
  const [warungs, setWarungs] = useState<Warung[]>(warungsAwal);

  useEffect(() => {
    fetch("/api/warungs")
      .then((response) => {
        if (!response.ok) throw new Error("Data warung gagal dimuat.");
        return response.json();
      })
      .then((data: Warung[]) => setWarungs(data))
      .catch(() => setWarungs(warungsAwal));
  }, []);

  return warungs;
}
