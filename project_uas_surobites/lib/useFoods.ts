"use client";

import { useEffect, useState } from "react";
import { foods as foodsAwal } from "@/data/foods";
import type { Food } from "@/data/foods";

export function useFoods() {
  const [foods, setFoods] = useState<Food[]>(foodsAwal);

  useEffect(() => {
    fetch("/api/foods")
      .then((response) => {
        if (!response.ok) throw new Error("Data makanan gagal dimuat.");
        return response.json();
      })
      .then((data: Food[]) => setFoods(data))
      .catch(() => setFoods(foodsAwal));
  }, []);

  return foods;
}
